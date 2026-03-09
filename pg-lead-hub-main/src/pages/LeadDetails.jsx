import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCrm } from "@/context/CrmContext";
import { getLead, getActivities } from "@/services/api";
import { PIPELINE_STAGES } from "@/constants/crm";
import StatusBadge from "@/components/leads/StatusBadge";

import {
  ArrowLeft,
  Phone,
  Globe,
  MessageCircle,
  Share2,
  Clock,
  User,
  ChevronRight,
} from "lucide-react";

const sourceIcon = {
  phone: <Phone size={14} />,
  website: <Globe size={14} />,
  whatsapp: <MessageCircle size={14} />,
  social: <Share2 size={14} />,
};

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateStatus, visits = [] } = useCrm();

  const [lead, setLead] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const leadRes = await getLead(id);
        setLead(leadRes.data);

        const actRes = await getActivities(id);
        setActivities(actRes.data || []);
      } catch (err) {
        console.error("Error loading lead details:", err);
      }
    };

    fetchData();
  }, [id]);

  if (!lead) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-400">
        Loading lead details...
      </div>
    );
  }

  const agent =
    typeof lead.assignedAgent === "object" ? lead.assignedAgent : null;

  const leadVisits = visits.filter(
    (v) =>
      v.leadId === lead._id ||
      (typeof v.leadId === "object" && v.leadId._id === lead._id)
  );

  return (
    <div className="max-w-4xl space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Lead Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
              {lead.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{lead.name}</h2>
              <p className="text-sm text-slate-500">{lead.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs capitalize text-slate-600">
              {sourceIcon[lead.source]} {lead.source}
            </span>
            <StatusBadge status={lead.status} />
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned Agent</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-800">
              <User size={14} className="text-slate-400" />
              {agent?.name || "Unassigned"}
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Created</p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              {lead.createdAt
                ? new Date(lead.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Last Updated</p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              {lead.updatedAt
                ? new Date(lead.updatedAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        {/* Stage update */}
        <div className="mt-6">
          <p className="mb-2.5 text-xs font-semibold uppercase text-slate-500 tracking-wider">
            Update Stage
          </p>
          <div className="flex flex-wrap gap-1.5">
            {PIPELINE_STAGES.map((s) => (
              <button
                key={s.key}
                onClick={() => {
                  updateStatus(lead._id, s.key);
                  setLead({ ...lead, status: s.key });
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  lead.status === s.key
                    ? `${s.colorClass} text-white border-transparent shadow-sm`
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline + Visits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Timeline */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Activity Timeline</h3>

          {!Array.isArray(activities) || activities.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              No activities yet
            </p>
          ) : (
            <div className="space-y-0">
              {activities.map((act, i) => (
                <div key={act._id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 ring-4 ring-blue-50" />
                    {i < activities.length - 1 && (
                      <div className="w-px flex-1 bg-slate-200" />
                    )}
                  </div>
                  <div className="pb-5">
                    <p className="text-sm font-medium text-slate-800">
                      {act.description}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock size={10} />
                      {act.timestamp
                        ? new Date(act.timestamp).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visit History */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-800">Visit History</h3>
            <button
              onClick={() => navigate("/visits")}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Schedule <ChevronRight size={12} />
            </button>
          </div>

          {leadVisits.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              No visits scheduled
            </p>
          ) : (
            <div className="space-y-2">
              {leadVisits.map((v) => (
                <div key={v._id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <p className="text-sm font-medium text-slate-800">{v.property}</p>
                  <p className="text-xs text-slate-500">
                    {v.date} at {v.time}
                  </p>
                  {v.outcome && (
                    <span className="inline-block mt-1.5 text-[10px] font-medium bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
                      {v.outcome}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;