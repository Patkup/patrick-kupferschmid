import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2, Clock, TrendingUp } from "lucide-react";

const KPIS = [
  { label: "Revenue Growth", value: "+18%", sub: "vs last quarter", up: true },
  { label: "User Retention", value: "84%", sub: "+4pp month-over-month", up: true },
  { label: "NPS Score", value: "62", sub: "Industry avg: 45", up: true },
  { label: "Efficiency Index", value: "91%", sub: "-2pp vs target", up: false },
];

const BAR_DATA = [
  { month: "Jan", value: 55 },
  { month: "Feb", value: 72 },
  { month: "Mar", value: 61 },
  { month: "Apr", value: 80 },
  { month: "May", value: 68 },
  { month: "Jun", value: 91 },
  { month: "Jul", value: 74 },
];

type InsightStatus = "published" | "review" | "draft";

const INSIGHTS: {
  id: number;
  title: string;
  category: string;
  date: string;
  status: InsightStatus;
}[] = [
  { id: 1, title: "Q2 Growth Drivers Analysis", category: "Finance", date: "May 28, 2025", status: "published" },
  { id: 2, title: "User Onboarding Funnel Report", category: "Product", date: "May 22, 2025", status: "published" },
  { id: 3, title: "Partner Engagement Trends", category: "Partners", date: "May 18, 2025", status: "review" },
  { id: 4, title: "Infrastructure Cost Optimisation", category: "Engineering", date: "May 10, 2025", status: "published" },
  { id: 5, title: "Mobile Retention Deep Dive", category: "Product", date: "May 5, 2025", status: "draft" },
];

const STATUS_STYLES: Record<InsightStatus, string> = {
  published: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  review: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  draft: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
};

const STATUS_ICON: Record<InsightStatus, typeof CheckCircle2> = {
  published: CheckCircle2,
  review: Clock,
  draft: Clock,
};

const card = "rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900";

export default function Insights() {
  const maxVal = Math.max(...BAR_DATA.map((d) => d.value));

  return (
    <div className="flex flex-col gap-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className={card}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">{k.label}</span>
              <TrendingUp size={14} className="text-gray-300 dark:text-gray-700" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{k.value}</p>
            <p
              className={cn(
                "mt-1 flex items-center gap-0.5 text-xs",
                k.up ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
              )}
            >
              {k.up && <ArrowUpRight size={12} />}
              {k.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className={card}>
        <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white">
          Monthly Performance Score
        </h2>
        <div className="flex items-end gap-3" style={{ height: 160 }}>
          {BAR_DATA.map((d) => (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs text-gray-400">{d.value}</span>
              <div
                className="w-full rounded-t-md bg-indigo-500 dark:bg-indigo-600"
                style={{ height: `${(d.value / maxVal) * 120}px` }}
              />
              <span className="text-xs text-gray-400">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className={card}>
        <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
          Recent Insights
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Title", "Category", "Date", "Status"].map((h) => (
                  <th
                    key={h}
                    className="pb-3 pr-4 text-left text-xs font-medium text-gray-400 dark:text-gray-600"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INSIGHTS.map((ins) => {
                const Icon = STATUS_ICON[ins.status];
                return (
                  <tr
                    key={ins.id}
                    className="border-b border-gray-50 last:border-0 dark:border-gray-800/50"
                  >
                    <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">
                      {ins.title}
                    </td>
                    <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{ins.category}</td>
                    <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{ins.date}</td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                          STATUS_STYLES[ins.status]
                        )}
                      >
                        <Icon size={11} />
                        {ins.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
