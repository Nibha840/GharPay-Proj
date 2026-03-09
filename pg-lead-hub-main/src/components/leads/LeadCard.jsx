import { useNavigate } from 'react-router-dom';
import { Phone, Globe, MessageCircle, Share2, AlertCircle } from 'lucide-react';

const sourceIcon = {
  phone: <Phone size={12} />,
  website: <Globe size={12} />,
  whatsapp: <MessageCircle size={12} />,
  social: <Share2 size={12} />,
};

const LeadCard = ({ lead }) => {
  const navigate = useNavigate();
  const agent = typeof lead.assignedAgent === 'object' ? lead.assignedAgent : null;

  return (
    <div
      draggable
      onDragStart={e => e.dataTransfer.setData('leadId', lead._id)}
      onClick={() => navigate(`/leads/${lead._id}`)}
      className="group cursor-pointer rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[9px] font-bold text-blue-600 shrink-0">
            {lead.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
            {lead.name}
          </p>
        </div>
        {lead.needsFollowUp && (
          <AlertCircle size={14} className="mt-0.5 shrink-0 text-red-500" />
        )}
      </div>
      <p className="mt-1 text-xs text-slate-500 pl-8">{lead.phone}</p>
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
          {sourceIcon[lead.source]}
          {lead.source}
        </span>
        {agent && (
          <span className="truncate text-[10px] text-slate-400">
            {agent.name.split(' ')[0]}
          </span>
        )}
      </div>
    </div>
  );
};

export default LeadCard;
