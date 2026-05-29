import { useLanguage } from "@/contexts/LanguageContext";

export default function Partners() {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold">{t("partners")}</h1>
      <p className="text-gray-600 dark:text-gray-400">Our partners and collaborators.</p>
    </main>
  );
}
