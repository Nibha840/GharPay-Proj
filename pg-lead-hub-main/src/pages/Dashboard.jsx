import { useEffect, useMemo } from 'react';
import { useCrm } from '@/context/CrmContext';
import StatCard from '@/components/dashboard/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import StatusBadge from '@/components/leads/StatusBadge';
import { Users, CalendarCheck, Home, TrendingUp, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { PIPELINE_STAGES } from '@/constants/crm';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#f97316', '#14b8a6', '#22c55e', '#10b981', '#ef4444'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg">
      {payload.map((entry, i) => (
        <p key={i} className="text-xs font-medium" style={{ color: entry.color || entry.fill }}>
          {entry.name}: <span className="font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { dashboardStats, fetchDashboard, fetchLeads, fetchVisits, leads, visits } = useCrm();

  useEffect(() => {
    fetchDashboard();
    fetchLeads();
    fetchVisits();
  }, [fetchDashboard, fetchLeads, fetchVisits]);

  const stats = dashboardStats;
  const pipelineData = stats
    ? PIPELINE_STAGES.map((s, i) => ({ name: s.label, value: stats.leadsByStage[s.key] || 0, color: COLORS[i] }))
    : [];
  const agentData = stats?.agentPerformance.map(a => ({ name: a.agent.name.split(' ')[0], leads: a.leadsCount, bookings: a.bookings, visits: a.visits })) || [];

  const recentLeads = useMemo(() => {
    const arr = [...(leads || [])];
    arr.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return arr.slice(0, 5);
  }, [leads]);

  const upcomingVisits = useMemo(() => {
    const arr = [...(visits || [])];
    arr.sort((a, b) => {
      const aKey = `${a.date || ''} ${a.time || ''}`;
      const bKey = `${b.date || ''} ${b.time || ''}`;
      return aKey.localeCompare(bKey);
    });
    return arr.slice(0, 5);
  }, [visits]);

  const topAgents = useMemo(() => {
    const arr = [...(stats?.agentPerformance || [])];
    arr.sort((a, b) => (b.bookings - a.bookings) || (b.visits - a.visits) || (b.leadsCount - a.leadsCount));
    return arr.slice(0, 6);
  }, [stats]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          High-level view of leads, visits and agent performance.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Leads" value={stats?.totalLeads ?? '—'} icon={Users} variant="primary" />
        <StatCard title="Visits Scheduled" value={stats?.visitsScheduled ?? '—'} icon={CalendarCheck} variant="accent" />
        <StatCard title="Bookings" value={stats?.bookingsConfirmed ?? '—'} icon={Home} variant="warning" />
        <StatCard title="Follow-ups" value={leads.filter(l => l.needsFollowUp).length} icon={TrendingUp} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pipeline Distribution */}
        <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-800">
              Pipeline Distribution
            </CardTitle>
            <p className="text-xs text-slate-500">Leads across pipeline stages</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pipelineData} cx="50%" cy="50%" outerRadius={95} innerRadius={55} dataKey="value" paddingAngle={2} strokeWidth={0}>
                  {pipelineData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  iconSize={8}
                  iconType="circle"
                  formatter={(value) => <span className="text-[11px] text-slate-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Agent Performance */}
        <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-800">
              Agent Performance
            </CardTitle>
            <p className="text-xs text-slate-500">Leads, visits & bookings by agent</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={agentData} barGap={2}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
                <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Leads" />
                <Bar dataKey="bookings" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Bookings" />
                <Bar dataKey="visits" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Visits" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads + Upcoming Visits */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Leads */}
        <Card className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-sm font-semibold text-slate-800">Recent Leads</CardTitle>
              <p className="mt-0.5 text-xs text-slate-500">Newest leads in your pipeline</p>
            </div>
            <button
              onClick={() => navigate('/leads')}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
            >
              View all <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentLeads.map((lead) => (
              <button
                key={lead._id}
                onClick={() => navigate(`/leads/${lead._id}`)}
                className="w-full rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3 text-left transition-all hover:bg-white hover:shadow-sm hover:border-slate-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      {lead.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.phone}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={lead.status} />
                    <span className="text-[10px] text-slate-400 capitalize">{lead.source}</span>
                  </div>
                </div>
              </button>
            ))}
            {recentLeads.length === 0 && (
              <p className="py-6 text-center text-sm text-slate-400">No leads yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Visits */}
        <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-800">Upcoming Visits</CardTitle>
            <p className="mt-0.5 text-xs text-slate-500">Next scheduled visits</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcomingVisits.map((v) => {
              const leadName = typeof v.leadId === 'object' ? v.leadId?.name : undefined;
              return (
                <div key={v._id} className="rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">{v.property}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {v.date} • {v.time}
                    {leadName ? ` • ${leadName}` : ''}
                  </p>
                  {v.outcome && (
                    <span className="mt-2 inline-flex rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium text-teal-700">
                      {v.outcome}
                    </span>
                  )}
                </div>
              );
            })}
            {upcomingVisits.length === 0 && (
              <p className="py-6 text-center text-sm text-slate-400">No visits scheduled.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Agent Leaderboard */}
      <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm font-semibold text-slate-800">Agent Leaderboard</CardTitle>
            <p className="mt-0.5 text-xs text-slate-500">Top agents ranked by bookings</p>
          </div>
          <button
            onClick={() => navigate('/leaderboard')}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Full board <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </CardHeader>
        <CardContent className="-mx-6 -mb-6 px-0 pb-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-t border-slate-100 bg-slate-50/80">
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-6">
                    Rank
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Agent
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">
                    Leads
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">
                    Visits
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right pr-6">
                    Bookings
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topAgents.map((p, i) => (
                  <TableRow key={p.agent?._id} className="hover:bg-slate-50/60 transition-colors">
                    <TableCell className="pl-6 w-16">
                      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                        i === 0 ? 'bg-amber-100 text-amber-700' :
                        i === 1 ? 'bg-slate-100 text-slate-600' :
                        i === 2 ? 'bg-orange-100 text-orange-600' :
                        'bg-slate-50 text-slate-400'
                      }`}>
                        {i + 1}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
                          {p.agent?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{p.agent?.name}</p>
                          <p className="text-[11px] text-slate-400">{p.agent?.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm text-slate-500">{p.leadsCount}</TableCell>
                    <TableCell className="text-right text-sm text-slate-500">{p.visits}</TableCell>
                    <TableCell className="text-right pr-6 text-sm font-semibold text-slate-800">{p.bookings}</TableCell>
                  </TableRow>
                ))}
                {topAgents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-sm text-slate-400">
                      No agent performance data yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
