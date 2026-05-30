import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowUpRight,
  BarChart2,
  CheckCircle2,
  FolderOpen,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "wouter";

const STATS = [
  {
    label: "Total Projects",
    value: "12",
    trend: "+2 this month",
    icon: FolderOpen,
    up: true,
  },
  {
    label: "Active Partners",
    value: "8",
    trend: "+1 this quarter",
    icon: Users,
    up: true,
  },
  {
    label: "Open Insights",
    value: "5",
    trend: "3 pending review",
    icon: BarChart2,
    up: false,
  },
  {
    label: "Completion Rate",
    value: "74%",
    trend: "+6% vs last month",
    icon: TrendingUp,
    up: true,
  },
];

const ACTIVITY = [
  {
    id: 1,
    icon: CheckCircle2,
    color: "text-green-500",
    text: "Platform Redesign reached 68% completion",
    time: "2h ago",
  },
  {
    id: 2,
    icon: Users,
    color: "text-indigo-500",
    text: "Luminary Digital joined as a new partner",
    time: "Yesterday",
  },
  {
    id: 3,
    icon: FolderOpen,
    color: "text-yellow-500",
    text: "Mobile App v2 moved to planning stage",
    time: "2 days ago",
  },
  {
    id: 4,
    icon: Activity,
    color: "text-blue-500",
    text: "New insight: User retention up 12% QoQ",
    time: "3 days ago",
  },
  {
    id: 5,
    icon: CheckCircle2,
    color: "text-green-500",
    text: "Auth Service Upgrade marked as completed",
    time: "3 months ago",
  },
];

const QUICK_LINKS = [
  { label: "New Project", href: "/projects", icon: Plus, color: "bg-indigo-600" },
  { label: "View Insights", href: "/insights", icon: BarChart2, color: "bg-blue-600" },
  { label: "Partners", href: "/partners", icon: Users, color: "bg-emerald-600" },
  { label: "All Projects", href: "/projects", icon: FolderOpen, color: "bg-violet-600" },
];

const card = "rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className={card}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{s.label}</span>
              <s.icon size={16} className="text-gray-400 dark:text-gray-600" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{s.value}</p>
            <p
              className={cn(
                "mt-1 flex items-center gap-1 text-xs",
                s.up ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
              )}
            >
              {s.up && <ArrowUpRight size={12} />}
              {s.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Recent Activity */}
        <div className={cn(card, "md:col-span-2")}>
          <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <ul className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
            {ACTIVITY.map((a) => (
              <li key={a.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <a.icon size={16} className={cn("mt-0.5 shrink-0", a.color)} />
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{a.text}</span>
                <span className="shrink-0 text-xs text-gray-400">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className={card}>
          <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
            Quick Links
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map((q) => (
              <Link
                key={q.label}
                href={q.href}
                className="flex flex-col items-center gap-2 rounded-lg border border-gray-100 p-4 text-center transition-colors hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-600"
              >
                <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-white", q.color)}>
                  <q.icon size={16} />
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{q.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
