import { cn } from "@/lib/utils";
import { PROJECTS, type ProjectStatus } from "@/data/mock";
import { ArrowLeft, Calendar, Tag, Users, Wallet } from "lucide-react";
import { Link, useParams, Redirect } from "wouter";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  planning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  completed: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

const card = "rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) return <Redirect to="/404" />;

  const pct = project.completion;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className={card}>
        <Link
          href="/projects"
          className="mb-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {project.title}
          </h1>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium capitalize",
              STATUS_STYLES[project.status]
            )}
          >
            {project.status}
          </span>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { icon: Users, label: "Team Size", value: `${project.teamSize} members` },
          { icon: Calendar, label: "Start Date", value: project.startDate },
          { icon: Wallet, label: "Budget", value: project.budget },
          { icon: null, label: "Completion", value: `${pct}%` },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className={card}>
            <div className="mb-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              {Icon && <Icon size={13} />}
              {label}
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className={card}>
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium text-gray-900 dark:text-white">Overall Progress</span>
          <span className="text-gray-500 dark:text-gray-400">{pct}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className={cn(
              "h-2.5 rounded-full transition-all",
              pct === 100 ? "bg-green-500" : "bg-indigo-600"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className={card}>
        <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
