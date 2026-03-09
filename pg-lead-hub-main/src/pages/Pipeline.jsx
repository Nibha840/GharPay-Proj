import { useEffect } from 'react';
import { useCrm } from '@/context/CrmContext';
import PipelineBoard from '@/components/leads/PipelineBoard';

const Pipeline = () => {
  const { fetchLeads } = useCrm();
  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pipeline</h1>
        <p className="mt-1 text-sm text-slate-500">
          Drag and drop leads across stages to keep your pipeline up to date.
        </p>
      </div>
      <PipelineBoard />
    </div>
  );
};

export default Pipeline;
