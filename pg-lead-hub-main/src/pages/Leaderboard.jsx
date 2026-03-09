import { useEffect } from 'react';
import { useCrm } from '@/context/CrmContext';
import { Trophy } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const Leaderboard = () => {
  const { dashboardStats, fetchDashboard } = useCrm();
  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  const performers = dashboardStats?.agentPerformance
    .sort((a, b) => b.bookings - a.bookings || b.visits - a.visits) || [];

  const MEDAL_COLORS = [
    'bg-amber-100 text-amber-700 ring-amber-200',
    'bg-slate-100 text-slate-600 ring-slate-200',
    'bg-orange-100 text-orange-600 ring-orange-200',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Agent Leaderboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Celebrate your top performers across leads, visits, and bookings.
        </p>
      </div>

      {/* Top 3 Podium Cards */}
      {performers.length >= 3 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {performers.slice(0, 3).map((p, i) => (
            <Card key={p.agent._id} className={`rounded-xl border shadow-sm overflow-hidden ${i === 0 ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'}`}>
              <CardContent className="flex flex-col items-center py-6 px-4 text-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ring-2 ${MEDAL_COLORS[i]}`}>
                  {i === 0 ? <Trophy size={20} /> : `#${i + 1}`}
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-800">{p.agent.name}</p>
                <p className="text-xs text-slate-500">{p.agent.email}</p>
                <div className="mt-4 flex gap-6 text-center">
                  <div>
                    <p className="text-lg font-bold text-slate-800">{p.leadsCount}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">Leads</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-teal-600">{p.visits}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">Visits</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">{p.bookings}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">Bookings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Full Ranking Table */}
      <Card className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-sm font-semibold text-slate-800">Full Rankings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-6 w-16">Rank</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Agent</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Leads</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Visits</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right pr-6">Bookings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performers.map((p, i) => (
                <TableRow key={p.agent._id} className="hover:bg-slate-50/60 transition-colors">
                  <TableCell className="pl-6">
                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                      i < 3 ? MEDAL_COLORS[i] : 'bg-slate-50 text-slate-400'
                    }`}>
                      {i + 1}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
                        {p.agent.name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{p.agent.name}</p>
                        <p className="text-[11px] text-slate-400">{p.agent.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm text-slate-500">{p.leadsCount}</TableCell>
                  <TableCell className="text-right text-sm text-slate-500">{p.visits}</TableCell>
                  <TableCell className="text-right pr-6 text-sm font-semibold text-slate-800">{p.bookings}</TableCell>
                </TableRow>
              ))}
              {performers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-sm text-slate-400">
                    No agent performance data yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
