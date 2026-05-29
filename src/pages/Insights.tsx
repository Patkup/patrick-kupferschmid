import { useLanguage } from "@/contexts/LanguageContext";

export default function Insights() {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold">{t("insights")}</h1>
      <p className="text-gray-600 dark:text-gray-400">Analytics and insights.</p>
    </main>
  );
}
