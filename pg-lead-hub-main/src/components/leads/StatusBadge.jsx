import { Badge } from "@/components/ui/badge";
import { PIPELINE_STAGES } from "@/constants/crm";

const STATUS_STYLES = {
  NEW: "bg-stage-new/10 text-stage-new border-stage-new/20",
  CONTACTED: "bg-stage-contacted/10 text-stage-contacted border-stage-contacted/20",
  REQUIREMENT_COLLECTED:
    "bg-stage-requirement/10 text-stage-requirement border-stage-requirement/20",
  PROPERTY_SUGGESTED:
    "bg-stage-suggested/10 text-stage-suggested border-stage-suggested/20",
  VISIT_SCHEDULED:
    "bg-stage-visit-scheduled/10 text-stage-visit-scheduled border-stage-visit-scheduled/20",
  VISIT_COMPLETED:
    "bg-stage-visit-completed/10 text-stage-visit-completed border-stage-visit-completed/20",
  BOOKED: "bg-stage-booked/10 text-stage-booked border-stage-booked/20",
  LOST: "bg-stage-lost/10 text-stage-lost border-stage-lost/20",
};

const StatusBadge = ({ status }) => {
  const stage = PIPELINE_STAGES.find((s) => s.key === status);
  const label = stage?.label ?? status;
  const style = STATUS_STYLES[status] ?? "bg-secondary text-secondary-foreground border-border";

  return (
    <Badge
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      {stage ? (
        <span
          className={`h-2 w-2 rounded-full ${stage.colorClass}`}
        />
      ) : null}
      <span>{label}</span>
    </Badge>
  );
};

export default StatusBadge;

