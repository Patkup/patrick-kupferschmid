import { cn } from "@/lib/utils";
import { PROJECTS, type Project, type ProjectStatus } from "@/data/mock";
import { ArrowRight, Search, Tag } from "lucide-react";
import { Link } from "wouter";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  planning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  completed: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        STATUS_STYLES[status]
      )}
    >
      {status}
    </span>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">{p.title}</h3>
          <StatusBadge status={p.status} />
        </div>
        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{p.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 dark:border-gray-800">
        <span className="text-xs text-gray-400">Updated {p.updatedAt}</span>
        <Link
          href={`/projects/${p.id}`}
          className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
        >
          View Details <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="flex flex-col gap-6">
      {/* Filter bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            readOnly
            placeholder="Search projects…"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          />
        </div>
        {(["all", "active", "planning", "completed"] as const).map((f) => (
          <button
            key={f}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-medium capitalize",
              f === "all"
                ? "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                : "border-gray-200 bg-white text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
