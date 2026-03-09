import { useEffect, useState } from 'react';
import { useCrm } from '@/context/CrmContext';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';

const VisitScheduler = () => {
  const { leads, visits, fetchLeads, fetchVisits, addVisit } = useCrm();
  const [form, setForm] = useState({ leadId: '', property: '', date: '', time: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchLeads(); fetchVisits(); }, [fetchLeads, fetchVisits]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.leadId || !form.property || !form.date || !form.time) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      await addVisit(form);
      toast.success('Visit scheduled');
      setForm({ leadId: '', property: '', date: '', time: '', notes: '' });
    } catch {
      toast.error('Failed to schedule visit');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Visit Scheduler</h1>
        <p className="mt-1 text-sm text-slate-500">
          Plan and review site visits across your active leads.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Schedule Form */}
        <form onSubmit={handleSubmit} className="h-fit">
          <Card className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold text-slate-800">Schedule New Visit</CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Choose a lead and property, then set the visit window.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Lead <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.leadId}
                    onChange={e => setForm(f => ({ ...f, leadId: e.target.value }))}
                    className={inputClass}
                  >
                    <option value="">Select a lead</option>
                    {leads.map(l => (
                      <option key={l._id} value={l._id}>
                        {l.name} — {l.phone}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Property name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.property}
                    onChange={e => setForm(f => ({ ...f, property: e.target.value }))}
                    className={inputClass}
                    placeholder="e.g. Sunshine PG, Koramangala"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Optional instructions for the agent or visitor..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? 'Scheduling...' : 'Schedule Visit'}
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ leadId: '', property: '', date: '', time: '', notes: '' })}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Upcoming Visits */}
        <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CalendarCheck size={16} className="text-blue-500" />
              <CardTitle className="text-sm font-semibold text-slate-800">
                Upcoming Visits ({visits.length})
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              All upcoming and recently scheduled property visits.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {visits.map(v => (
                <div key={v._id} className="rounded-lg border border-slate-100 bg-slate-50 p-4 transition-all hover:bg-white hover:shadow-sm hover:border-slate-200">
                  <p className="text-sm font-medium text-slate-800">{v.property}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {v.date} at {v.time}
                  </p>
                  {v.outcome && (
                    <span className="mt-2 inline-block rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium text-teal-700">
                      {v.outcome}
                    </span>
                  )}
                  {v.notes && (
                    <p className="mt-1.5 text-xs italic text-slate-400">{v.notes}</p>
                  )}
                </div>
              ))}
              {visits.length === 0 && (
                <p className="py-8 text-center text-sm text-slate-400">
                  No visits scheduled yet. Once you add them, they will show up here.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisitScheduler;
