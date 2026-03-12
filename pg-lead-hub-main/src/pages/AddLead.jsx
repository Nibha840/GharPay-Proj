import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrm } from '@/context/CrmContext';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Sparkles } from 'lucide-react';

/**
 * Parse free-form lead text and extract structured fields.
 *
 * Example input:  "Rahul Sharma 9876543210 2BHK Koramangala 12000"
 * Returns: { name, phone, budget, location }
 */
const parseLeadInput = (text) => {
  const result = { name: '', phone: '', budget: '', location: '' };
  if (!text.trim()) return result;

  // 1. Extract phone number (Indian 10-digit mobile, optional +91 prefix)
  const phoneRegex = /(?:\+91[\s-]?)?([6-9]\d{9})/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) {
    result.phone = phoneMatch[1];
  }

  // Remove the full phone match from text for further parsing
  let remaining = phoneMatch
    ? text.replace(phoneMatch[0], ' ')
    : text;

  // 2. Extract budget — numbers with 4+ digits (not the phone number)
  //    Also handle patterns like "12L", "1.5Cr", "12,000", "₹12000"
  const budgetRegex = /(?:₹\s*)?(\d[\d,]*\.?\d*)\s*(lakhs?|lacs?|l|crores?|cr|k)?\b/gi;
  let budgetMatch;
  let bestBudget = '';
  while ((budgetMatch = budgetRegex.exec(remaining)) !== null) {
    const rawNum = budgetMatch[1].replace(/,/g, '');
    const num = parseFloat(rawNum);
    const suffix = (budgetMatch[2] || '').toLowerCase();

    // Skip small numbers that are unlikely to be budgets (< 1000) unless they have a suffix
    if (!suffix && (num < 1000 || rawNum.length < 4)) continue;

    let value = num;
    if (suffix.startsWith('l') || suffix === 'lac' || suffix === 'lacs') value = num * 100000;
    else if (suffix.startsWith('cr')) value = num * 10000000;
    else if (suffix === 'k') value = num * 1000;

    bestBudget = String(value);
    // Remove the matched budget from remaining text
    remaining = remaining.replace(budgetMatch[0], ' ');
    break; // Take first plausible budget
  }
  result.budget = bestBudget;

  // 3. Tokenize remaining text
  const tokens = remaining
    .replace(/[,|;:\-–—]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  // Separate alpha tokens vs property-type tokens (like "2BHK", "3BHK")
  const bhkRegex = /^\d+\.?\d*\s*bhk$/i;
  const alphaTokens = [];
  const propertyTokens = [];
  for (const token of tokens) {
    if (bhkRegex.test(token)) {
      propertyTokens.push(token);
    } else if (/^[a-zA-Z]+$/.test(token)) {
      alphaTokens.push(token);
    }
  }

  // 4. Name = first 1-3 alphabetic words (typically first name + last name)
  //    Location = remaining alphabetic words
  const nameWords = alphaTokens.slice(0, Math.min(3, alphaTokens.length > 2 ? 2 : alphaTokens.length));
  const locationWords = alphaTokens.slice(nameWords.length);

  result.name = nameWords.join(' ');

  // Combine location with property type if present
  const locParts = [...propertyTokens, ...locationWords];
  result.location = locParts.join(' ');

  return result;
};

const AddLead = () => {
  const { addLead } = useCrm();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', source: 'website', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [smartInput, setSmartInput] = useState('');
  const [parsedExtras, setParsedExtras] = useState({ budget: '', location: '' });

  const handleSmartInput = (text) => {
    setSmartInput(text);
    const parsed = parseLeadInput(text);
    setForm((f) => ({
      ...f,
      name: parsed.name || f.name,
      phone: parsed.phone || f.phone,
    }));
    setParsedExtras({
      budget: parsed.budget,
      location: parsed.location,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);

    // Append parsed budget & location into notes so data is persisted
    let finalNotes = form.notes;
    const extras = [];
    if (parsedExtras.budget) extras.push(`Budget: ₹${Number(parsedExtras.budget).toLocaleString('en-IN')}`);
    if (parsedExtras.location) extras.push(`Location: ${parsedExtras.location}`);
    if (extras.length) {
      finalNotes = finalNotes
        ? `${finalNotes}\n${extras.join(' | ')}`
        : extras.join(' | ');
    }

    try {
      await addLead({ ...form, notes: finalNotes });
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
            {/* ── Smart Lead Input ── */}
            <div className="relative">
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Sparkles size={14} className="text-amber-500" />
                Smart Input
                <span className="ml-auto text-[11px] font-normal text-slate-400">paste &amp; auto-fill</span>
              </label>
              <textarea
                rows={2}
                value={smartInput}
                onChange={(e) => handleSmartInput(e.target.value)}
                className={`${inputClass} resize-none border-dashed border-blue-200 bg-blue-50/40 focus:border-blue-400 focus:bg-white`}
                placeholder="Paste lead info here — name, phone, budget, location in any format"
              />
              {smartInput && (parsedExtras.budget || parsedExtras.location || form.name || form.phone) && (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {form.name && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-200">
                      ✓ Name
                    </span>
                  )}
                  {form.phone && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-200">
                      ✓ Phone
                    </span>
                  )}
                  {parsedExtras.budget && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-200">
                      ✓ Budget
                    </span>
                  )}
                  {parsedExtras.location && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-200">
                      ✓ Location
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ── Name & Phone ── */}
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

            {/* ── Budget & Location (parsed, editable) ── */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Budget
                  <span className="ml-1.5 text-[11px] font-normal text-slate-400">auto-detected</span>
                </label>
                <input
                  value={parsedExtras.budget ? `₹${Number(parsedExtras.budget).toLocaleString('en-IN')}` : ''}
                  onChange={e => {
                    const raw = e.target.value.replace(/[₹,\s]/g, '');
                    setParsedExtras(p => ({ ...p, budget: raw }));
                  }}
                  className={`${inputClass} ${parsedExtras.budget ? 'border-green-200 bg-green-50/50' : ''}`}
                  placeholder="Detected from smart input"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Preferred Location
                  <span className="ml-1.5 text-[11px] font-normal text-slate-400">auto-detected</span>
                </label>
                <input
                  value={parsedExtras.location}
                  onChange={e => setParsedExtras(p => ({ ...p, location: e.target.value }))}
                  className={`${inputClass} ${parsedExtras.location ? 'border-green-200 bg-green-50/50' : ''}`}
                  placeholder="Detected from smart input"
                />
              </div>
            </div>

            {/* ── Source & Notes ── */}
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
