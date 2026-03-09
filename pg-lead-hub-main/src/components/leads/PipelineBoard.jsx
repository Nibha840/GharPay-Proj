import { PIPELINE_STAGES } from '@/constants/crm';
import LeadCard from '@/components/leads/LeadCard';
import { useCrm } from '@/context/CrmContext';
import { useMemo, useState } from 'react';

const PipelineBoard = () => {
  const { leads, updateStatus } = useCrm();
  const [dragOverStage, setDragOverStage] = useState(null);

  const handleDrop = (e, status) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (leadId) updateStatus(leadId, status);
    setDragOverStage(null);
  };

  const leadsByStage = useMemo(() => {
    const map = new Map();
    PIPELINE_STAGES.forEach(s => map.set(s.key, []));
    (leads || []).forEach(l => {
      const arr = map.get(l.status);
      if (arr) arr.push(l);
    });
    return map;
  }, [leads]);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
      {PIPELINE_STAGES.map(stage => {
        const stageLeads = leadsByStage.get(stage.key) || [];
        const isDragOver = dragOverStage === stage.key;

        return (
          <div
            key={stage.key}
            className={`flex-shrink-0 w-[270px] rounded-xl p-3 transition-colors duration-200 ${
              isDragOver
                ? 'bg-blue-50 ring-2 ring-blue-200'
                : 'bg-slate-50 ring-1 ring-slate-200/60'
            }`}
            onDragOver={e => {
              e.preventDefault();
              setDragOverStage(stage.key);
            }}
            onDragLeave={() => {
              setDragOverStage(prev => (prev === stage.key ? null : prev));
            }}
            onDrop={e => handleDrop(e, stage.key)}
          >
            <div className="mb-3 flex items-center gap-2 px-1">
              <div className={`h-2 w-2 rounded-full ${stage.colorClass}`} />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {stage.label}
              </span>
              <span className="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                {stageLeads.length}
              </span>
            </div>
            <div className="min-h-[120px] space-y-2">
              {stageLeads.map(lead => (
                <LeadCard key={lead._id} lead={lead} />
              ))}
              {stageLeads.length === 0 && (
                <div className="rounded-lg border-2 border-dashed border-slate-200 bg-white/60 px-3 py-8 text-center text-xs text-slate-400">
                  Drop leads here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PipelineBoard;
