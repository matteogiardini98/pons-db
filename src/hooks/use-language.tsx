
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

    // Database Page
    'database.title': 'pons database',
    'database.addNewTool': 'add new tool',

    // Dashboard Page
    'dashboard.title': 'dashboard',

    // Add Tool Page
    'addTool.title': 'add new ai tool',
    'addTool.description': 'submit a new ai tool to the pons database. all submissions will be reviewed before being published.',

    // Tool Detail Page
    'toolDetail.backToDatabase': 'back to database',

    // Manifesto Page
    'manifesto.title': 'manifesto',
    'manifesto.subtitle': 'pons, connecting the dots to bridge the ai adoption gap in europe',
    'manifesto.introduction': 'pons - latin for bridge - is an open-source project to bridge the gap between the overcrowded ai market and european small businesses, the ones that can truly benefit from the ai revolution.',
    'manifesto.gapTitle': 'the ai adoption gap (why)',
    'manifesto.gapContent': 'the fast pace and directionless innovation coming from silicon valley creates an adoption gap between the state of the art ai solutions that are being developed and what smbs are actually adopting in europe. many general purpose ai tools are being developed without concrete consideration on the business problems they could solve. they are too far from reality, at least in europe, with its regional nuances and specific priorities.',
    'manifesto.noiseTitle': 'a lot of noise (what)',
    'manifesto.noiseContent': 'there is clearly an opportunity out there for smbs to leverage ai. they will be able to do more with the same resources, multiply their capabilities and empower their employees to reach heights they never have. but, where should they start? there are hundreds of tools out there, many overhyped that create a lot of noise, overwhelming entrepreneurs and their organizations.',
    'manifesto.databaseTitle': 'an open-source database (how)',
    'manifesto.databaseContent': 'the first step to solve this adoption gap is to cut through the noise and bring to surface what is valuable and who it has been valuable to while doing which task. the idea is to put together an online open-source database which contains information about ai solutions relevant for european companies.',

    // Hero component
    'hero.badge': 'Open Source Project',
    'hero.title': 'Find the right AI solution for your business problem',
    'hero.description': 'Cutting through the noise to connect European businesses with the AI tools that solve real business challenges.',
    'hero.exploreButton': 'Explore the Database',
    'hero.insightsButton': 'View Insights',
    'hero.scrollText': 'Scroll',

    // Not Found Page
    'notFound.message': 'Oops! Page not found',
    'notFound.returnHome': 'Return to Home',
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

    // Database Page
    'database.title': 'database pons',
    'database.addNewTool': 'aggiungi nuovo strumento',

    // Dashboard Page
    'dashboard.title': 'dashboard',

    // Add Tool Page
    'addTool.title': 'aggiungi nuovo strumento ai',
    'addTool.description': 'invia un nuovo strumento ai al database pons. tutte le proposte saranno esaminate prima della pubblicazione.',

    // Tool Detail Page
    'toolDetail.backToDatabase': 'torna al database',

    // Manifesto Page
    'manifesto.title': 'manifesto',
    'manifesto.subtitle': 'pons, collegare i punti per colmare il divario di adozione dell\'ai in europa',
    'manifesto.introduction': 'pons - latino per ponte - è un progetto open-source per colmare il divario tra il mercato dell\'ai sovraffollato e le piccole imprese europee, quelle che possono realmente beneficiare della rivoluzione dell\'ai.',
    'manifesto.gapTitle': 'il divario di adozione dell\'ai (perché)',
    'manifesto.gapContent': 'il ritmo veloce e l\'innovazione senza direzione proveniente dalla silicon valley crea un divario di adozione tra le soluzioni ai all\'avanguardia che vengono sviluppate e ciò che le pmi stanno effettivamente adottando in europa. molti strumenti ai generici vengono sviluppati senza una considerazione concreta sui problemi aziendali che potrebbero risolvere. sono troppo lontani dalla realtà, almeno in europa, con le sue sfumature regionali e priorità specifiche.',
    'manifesto.noiseTitle': 'molto rumore (cosa)',
    'manifesto.noiseContent': 'c\'è chiaramente un\'opportunità per le pmi di sfruttare l\'ai. saranno in grado di fare di più con le stesse risorse, moltiplicare le loro capacità e potenziare i loro dipendenti per raggiungere altezze mai raggiunte prima. ma, da dove iniziare? ci sono centinaia di strumenti là fuori, molti sopravvalutati che creano molto rumore, sopraffacendo gli imprenditori e le loro organizzazioni.',
    'manifesto.databaseTitle': 'un database open-source (come)',
    'manifesto.databaseContent': 'il primo passo per risolvere questo divario di adozione è tagliare attraverso il rumore e portare in superficie ciò che è prezioso e per chi è stato prezioso durante lo svolgimento di quale attività. l\'idea è di mettere insieme un database open-source online che contenga informazioni sulle soluzioni ai rilevanti per le aziende europee.',

    // Hero component
    'hero.badge': 'Progetto Open Source',
    'hero.title': 'Trova la giusta soluzione AI per il tuo problema aziendale',
    'hero.description': 'Eliminando il rumore per collegare le aziende europee agli strumenti AI che risolvono vere sfide aziendali.',
    'hero.exploreButton': 'Esplora il Database',
    'hero.insightsButton': 'Vedi Approfondimenti',
    'hero.scrollText': 'Scorri',

    // Not Found Page
    'notFound.message': 'Oops! Pagina non trovata',
    'notFound.returnHome': 'Torna alla Home',
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
    if (!languageData[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
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
