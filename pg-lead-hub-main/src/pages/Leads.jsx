import { useEffect, useState } from "react";
import { useCrm } from "@/context/CrmContext";
import { useNavigate } from "react-router-dom";
import { PIPELINE_STAGES } from "@/constants/crm";
import { Search, Plus, AlertCircle } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import StatusBadge from "@/components/leads/StatusBadge";

const Leads = () => {
  const { leads = [], fetchLeads, fetchAgents } = useCrm();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");

  useEffect(() => {
    fetchLeads();
    fetchAgents();
  }, []);

  const filtered = leads.filter((l) => {
    const name = l?.name?.toLowerCase() || "";
    const phone = l?.phone || "";

    if (
      search &&
      !name.includes(search.toLowerCase()) &&
      !phone.includes(search)
    )
      return false;

    if (stageFilter !== "ALL" && l.status !== stageFilter) return false;

    if (sourceFilter !== "ALL" && l.source !== sourceFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Leads</h1>
          <p className="mt-1 text-sm text-slate-500">
            {leads.length} total leads in your pipeline.
          </p>
        </div>

        <button
          onClick={() => navigate("/leads/new")}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Lead
        </button>
      </div>

      {/* Table Card */}
      <Card className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <CardHeader className="gap-4 pb-4 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100">
          <div>
            <CardTitle className="text-sm font-semibold text-slate-800">Lead List</CardTitle>
            <p className="mt-0.5 text-xs text-slate-500">
              Filter and drill into any lead.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or phone..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-9 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="min-w-[130px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              >
                <option value="ALL">All stages</option>
                {PIPELINE_STAGES.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>

              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="min-w-[130px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              >
                <option value="ALL">All sources</option>
                {["website", "whatsapp", "phone", "social"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="max-h-[70vh] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="sticky top-0 z-10 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Name
                  </TableHead>
                  <TableHead className="sticky top-0 z-10 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Phone
                  </TableHead>
                  <TableHead className="sticky top-0 z-10 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Source
                  </TableHead>
                  <TableHead className="sticky top-0 z-10 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Stage
                  </TableHead>
                  <TableHead className="sticky top-0 z-10 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Agent
                  </TableHead>
                  <TableHead className="sticky top-0 z-10 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">
                    Created
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((lead) => {
                  const agent =
                    typeof lead.assignedAgent === "object"
                      ? lead.assignedAgent
                      : null;

                  return (
                    <TableRow
                      key={lead._id}
                      onClick={() => navigate(`/leads/${lead._id}`)}
                      className="cursor-pointer transition-colors hover:bg-blue-50/40"
                    >
                      <TableCell className="font-medium text-slate-800">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600 shrink-0">
                            {lead.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <span className="truncate">{lead.name}</span>
                          {lead.needsFollowUp && (
                            <AlertCircle size={14} className="text-red-500 shrink-0" />
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-slate-500">
                        {lead.phone}
                      </TableCell>

                      <TableCell>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600">
                          {lead.source}
                        </span>
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={lead.status} />
                      </TableCell>

                      <TableCell className="text-slate-500">
                        {agent?.name || "—"}
                      </TableCell>

                      <TableCell className="text-right text-slate-500">
                        {lead.createdAt
                          ? new Date(lead.createdAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-sm text-slate-400">
                      No leads found for the current filters.
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

export default Leads;