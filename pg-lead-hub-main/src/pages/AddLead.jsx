import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrm } from '@/context/CrmContext';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const AddLead = () => {
  const { addLead } = useCrm();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', source: 'website', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      await addLead(form);
      toast.success('Lead created successfully');
      navigate('/leads');
    } catch {
      toast.error('Failed to create lead');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add Lead</h1>
        <p className="mt-1 text-sm text-slate-500">
          Capture a new enquiry into your Gharpayy pipeline.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold text-slate-800">Lead Details</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Basic contact and source information for this lead.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                  placeholder="Enter lead name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className={inputClass}
                  placeholder="+91 98XXXXXXXX"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Source</label>
                <select
                  value={form.source}
                  onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
                  className={inputClass}
                >
                  <option value="website">Website</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone</option>
                  <option value="social">Social</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  className={`${inputClass} resize-none`}
                  placeholder="Optional context about this enquiry..."
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Creating...' : 'Create Lead'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddLead;
