import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const VARIANTS = {
  default: {
    card: "bg-white border-slate-200",
    icon: "bg-slate-100 text-slate-600",
  },
  primary: {
    card: "bg-white border-blue-100",
    icon: "bg-blue-50 text-blue-600",
  },
  accent: {
    card: "bg-white border-teal-100",
    icon: "bg-teal-50 text-teal-600",
  },
  warning: {
    card: "bg-white border-amber-100",
    icon: "bg-amber-50 text-amber-600",
  },
};

const StatCard = ({ title, value, icon: Icon, trend, variant = "default" }) => {
  const styles = VARIANTS[variant] ?? VARIANTS.default;

  return (
    <Card className={`rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 ${styles.card}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {title}
        </CardTitle>
        {Icon ? (
          <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${styles.icon}`}>
            <Icon className="h-4 w-4" />
          </div>
        ) : null}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight text-slate-900">{value}</div>
        {trend ? (
          <p className="mt-1 text-xs text-slate-500">{trend}</p>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default StatCard;
