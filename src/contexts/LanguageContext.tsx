import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Language = "en" | "de" | "fr";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    projects: "Projects",
    insights: "Insights",
    partners: "Partners",
    notFound: "Page not found",
  },
  de: {
    dashboard: "Dashboard",
    projects: "Projekte",
    insights: "Erkenntnisse",
    partners: "Partner",
    notFound: "Seite nicht gefunden",
  },
  fr: {
    dashboard: "Tableau de bord",
    projects: "Projets",
    insights: "Analyses",
    partners: "Partenaires",
    notFound: "Page introuvable",
  },
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem("language") as Language) ?? "en"
  );

  const t = (key: string): string =>
    translations[language][key] ?? key;

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
