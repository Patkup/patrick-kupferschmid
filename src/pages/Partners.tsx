import { cn } from "@/lib/utils";
import { PARTNERS, type Partner } from "@/data/mock";
import { Mail, MapPin } from "lucide-react";

const AVATAR_COLORS = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-sky-500",
];

const CATEGORY_STYLES: Record<Partner["category"], string> = {
  Technology: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  Consulting: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Finance: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Research: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Avatar + name */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
            color
          )}
        >
          {initials(partner.name)}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{partner.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{partner.role}</p>
        </div>
      </div>

      {/* Category badge */}
      <span
        className={cn(
          "mb-4 self-start rounded-full px-2.5 py-0.5 text-xs font-medium",
          CATEGORY_STYLES[partner.category]
        )}
      >
        {partner.category}
      </span>

      {/* Contact */}
      <div className="flex flex-col gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Mail size={13} className="shrink-0" />
          <span className="truncate">{partner.email}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-1.5 border-t border-gray-100 pt-3 text-xs text-gray-400 dark:border-gray-800">
        <MapPin size={12} className="shrink-0" />
        Since {partner.since}
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {PARTNERS.length} partner organisations
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.map((partner, i) => (
          <PartnerCard key={partner.id} partner={partner} index={i} />
        ))}
      </div>
    </div>
  );
}
