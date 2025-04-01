
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const translations = {
  en: {
    // Navigation
    'nav.start': 'start from 0',
    'nav.database': 'database',
    'nav.dashboard': 'dashboard',
    'nav.addTool': 'add tool',
    'nav.manifesto': 'manifesto',

    // Start from Zero page
    'startZero.title': 'For all entrepreneurs and operators out there, tell us your business challenges and we\'ll help you find the right AI tools.',
    'startZero.entrepreneurs': 'entrepreneurs',
    'startZero.operators': 'operators',
    'startZero.challenges': 'challenges',

    // Footer
    'footer.description': 'pons is an open-source database of ai solutions to help companies find the right tools for their business problems.',
    'footer.navigation': 'navigation',
    'footer.about': 'about',
    'footer.contact': 'contact',
    'footer.rights': '© {year} ai solutions database. open-source project.',
    'footer.privacy': 'privacy',
    'footer.terms': 'terms',
    'footer.cookies': 'cookie policy',

    // Sidebar
    'sidebar.darkMode': 'dark mode',
    'sidebar.lightMode': 'light mode',

    // Language
    'language.en': 'English',
    'language.it': 'Italian',
  },
  it: {
    // Navigation
    'nav.start': 'inizia da 0',
    'nav.database': 'database',
    'nav.dashboard': 'dashboard',
    'nav.addTool': 'aggiungi tool',
    'nav.manifesto': 'manifesto',

    // Start from Zero page
    'startZero.title': 'Per tutti gli imprenditori e operatori, raccontaci le tue sfide aziendali e ti aiuteremo a trovare gli strumenti AI giusti.',
    'startZero.entrepreneurs': 'imprenditori',
    'startZero.operators': 'operatori',
    'startZero.challenges': 'sfide',

    // Footer
    'footer.description': 'pons è un database open-source di soluzioni AI per aiutare le aziende a trovare gli strumenti giusti per i loro problemi aziendali.',
    'footer.navigation': 'navigazione',
    'footer.about': 'chi siamo',
    'footer.contact': 'contatti',
    'footer.rights': '© {year} database soluzioni AI. progetto open-source.',
    'footer.privacy': 'privacy',
    'footer.terms': 'termini',
    'footer.cookies': 'politica dei cookie',

    // Sidebar
    'sidebar.darkMode': 'modalità scura',
    'sidebar.lightMode': 'modalità chiara',

    // Language
    'language.en': 'Inglese',
    'language.it': 'Italiano',
  }
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage, default to 'en'
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const languageData = translations[language];
    if (key.includes('{year}')) {
      return (languageData[key] || key).replace('{year}', new Date().getFullYear().toString());
    }
    return languageData[key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
