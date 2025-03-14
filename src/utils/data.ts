import { AiTool, Industry, BusinessFunction, BusinessType, TechnicalLevel } from './types';

export const INDUSTRIES: Industry[] = [
  "Finance", 
  "Healthcare", 
  "Education", 
  "Retail", 
  "Manufacturing", 
  "Technology", 
  "Legal", 
  "Marketing", 
  "HR",
  "Other"
];

export const FUNCTIONS: BusinessFunction[] = [
  "Sales", 
  "Marketing", 
  "Customer Support", 
  "HR", 
  "Finance", 
  "IT", 
  "Operations", 
  "Legal", 
  "Product",
  "Other"
];

export const BUSINESS_TYPES: BusinessType[] = [
  "B2B", 
  "B2C", 
  "B2B2C", 
  "Prosumer", 
  "Developer"
];

export const TECHNICAL_LEVELS: TechnicalLevel[] = [
  "No-code", 
  "Low-code", 
  "Some coding", 
  "Technical"
];

export const mockTools: AiTool[] = [
  {
    id: "1",
    name: "DataSense AI",
    description: "An AI-powered data analytics platform that transforms raw data into actionable insights for businesses without technical expertise.",
    logo: "https://via.placeholder.com/150",
    url: "https://example.com/datasense",
    industries: ["Finance", "Retail", "Technology"],
    functions: ["Marketing", "Sales", "Operations"],
    businessTypes: ["B2B", "B2B2C"],
    technicalLevel: "No-code",
    euCompliant: {
      gdpr: true,
      dataResidency: true,
      aiAct: false
    },
    features: [
      "Automated data analysis",
      "Interactive dashboards",
      "Predictive analytics",
      "Natural language querying",
      "Custom report generation"
    ],
    pricing: {
      hasFree: true,
      model: "Freemium",
      startingPrice: 49,
    },
    releaseDate: "2022-03-15",
    company: {
      name: "DataSense Technologies",
      founded: "2020",
      location: "Berlin, Germany",
      employees: "50-100",
    },
    reviews: [
      {
        id: "r1",
        authorName: "Marie Dubois",
        rating: 4.5,
        text: "Transformed how we understand our customer data. Easy to use but powerful.",
        role: "Marketing Director",
        industry: "Retail",
        date: "2023-05-12",
      },
      {
        id: "r2",
        authorName: "Stefan Müller",
        rating: 5,
        text: "Exceptional tool that helped us identify cost-saving opportunities we never knew existed.",
        role: "CFO",
        industry: "Manufacturing",
        date: "2023-06-30",
      },
    ],
    similarTools: ["2", "5"],
  },
  {
    id: "2",
    name: "CopyGenius",
    description: "AI copywriting assistant that generates marketing content, emails, and product descriptions tailored to your brand voice.",
    logo: "https://via.placeholder.com/150",
    url: "https://example.com/copygenius",
    industries: ["Marketing", "Retail", "Technology"],
    functions: ["Marketing", "Sales"],
    businessTypes: ["B2B", "B2C", "Prosumer"],
    technicalLevel: "No-code",
    euCompliant: {
      gdpr: true,
      dataResidency: false,
      aiAct: false
    },
    features: [
      "Brand voice customization",
      "Multi-language support",
      "SEO optimization",
      "Content templates",
      "A/B testing suggestions",
    ],
    pricing: {
      hasFree: true,
      model: "Subscription",
      startingPrice: 29,
    },
    releaseDate: "2021-11-08",
    company: {
      name: "Creative AI Solutions",
      founded: "2020",
      location: "Barcelona, Spain",
      employees: "20-50",
    },
    reviews: [
      {
        id: "r3",
        authorName: "Luisa García",
        rating: 4,
        text: "Saves me hours each week on copywriting tasks. The quality is impressive most of the time.",
        role: "Content Manager",
        industry: "Technology",
        date: "2023-04-18",
      },
    ],
    similarTools: ["3", "8"],
  },
  {
    id: "3",
    name: "LegalMind",
    description: "AI legal assistant that simplifies contract analysis, legal research, and compliance checking for businesses.",
    logo: "https://via.placeholder.com/150",
    url: "https://example.com/legalmind",
    industries: ["Legal", "Finance", "Technology"],
    functions: ["Legal", "Operations"],
    businessTypes: ["B2B"],
    technicalLevel: "Low-code",
    euCompliant: {
      gdpr: true,
      dataResidency: true,
    },
    features: [
      "Contract analysis",
      "Compliance checking",
      "Legal research assistance",
      "Risk assessment",
      "Document automation",
    ],
    pricing: {
      hasFree: false,
      model: "Subscription",
      startingPrice: 199,
    },
    releaseDate: "2022-01-20",
    company: {
      name: "LegalTech Innovations",
      founded: "2019",
      location: "Stockholm, Sweden",
      employees: "20-50",
    },
    reviews: [
      {
        id: "r4",
        authorName: "Henrik Johansson",
        rating: 5,
        text: "Revolutionized our legal department's efficiency. Highly accurate and GDPR compliant.",
        role: "Legal Counsel",
        industry: "Finance",
        date: "2023-02-15",
      },
    ],
    similarTools: ["6", "9"],
  },
  {
    id: "4",
    name: "RecruiterBot",
    description: "AI-powered recruitment assistant that automates candidate screening, interview scheduling, and provides insights for better hiring decisions.",
    logo: "https://via.placeholder.com/150",
    url: "https://example.com/recruiterbot",
    industries: ["HR", "Technology", "Finance"],
    functions: ["HR"],
    businessTypes: ["B2B"],
    technicalLevel: "No-code",
    euCompliant: {
      gdpr: true,
      dataResidency: true,
    },
    features: [
      "Automated candidate screening",
      "Interview scheduling",
      "Skills assessment",
      "Diversity & inclusion tools",
      "Recruitment analytics",
    ],
    pricing: {
      hasFree: false,
      model: "Subscription",
      startingPrice: 99,
    },
    releaseDate: "2021-09-14",
    company: {
      name: "TalentAI",
      founded: "2018",
      location: "Amsterdam, Netherlands",
      employees: "50-100",
    },
    reviews: [
      {
        id: "r5",
        authorName: "Lotte van der Berg",
        rating: 4.5,
        text: "Cut our hiring process time by 40%. The bias reduction features are particularly valuable.",
        role: "HR Director",
        industry: "Technology",
        date: "2023-07-21",
      },
    ],
    similarTools: ["7"],
  },
  {
    id: "5",
    name: "PredictFlow",
    description: "Predictive analytics platform that forecasts business metrics, detects anomalies, and provides actionable recommendations.",
    logo: "https://via.placeholder.com/150",
    url: "https://example.com/predictflow",
    industries: ["Finance", "Retail", "Manufacturing"],
    functions: ["Finance", "Operations", "Sales"],
    businessTypes: ["B2B"],
    technicalLevel: "Some coding",
    euCompliant: {
      gdpr: true,
      dataResidency: true,
    },
    features: [
      "Sales forecasting",
      "Demand prediction",
      "Anomaly detection",
      "What-if scenario analysis",
      "Custom ML model deployment",
    ],
    pricing: {
      hasFree: false,
      model: "Subscription",
      startingPrice: 299,
    },
    releaseDate: "2020-05-28",
    company: {
      name: "Predictive Analytics GmbH",
      founded: "2017",
      location: "Munich, Germany",
      employees: "100-250",
    },
    reviews: [
      {
        id: "r6",
        authorName: "Klaus Weber",
        rating: 5,
        text: "The forecasting accuracy has tremendously improved our inventory management and reduced waste.",
        role: "Supply Chain Manager",
        industry: "Manufacturing",
        date: "2023-03-09",
      },
    ],
    similarTools: ["1"],
  },
  {
    id: "6",
    name: "SecureAI Guard",
    description: "AI security platform that detects vulnerabilities, prevents breaches, and ensures compliance with EU regulations.",
    logo: "https://via.placeholder.com/150",
    url: "https://example.com/secureai",
    industries: ["Technology", "Finance", "Healthcare"],
    functions: ["IT", "Legal", "Operations"],
    businessTypes: ["B2B"],
    technicalLevel: "Technical",
    euCompliant: {
      gdpr: true,
      dataResidency: true,
    },
    features: [
      "Threat detection",
      "Vulnerability assessment",
      "Compliance monitoring",
      "Security audit automation",
      "Incident response",
    ],
    pricing: {
      hasFree: false,
      model: "Custom pricing",
    },
    releaseDate: "2021-02-17",
    company: {
      name: "CyberSafe Technologies",
      founded: "2016",
      location: "Paris, France",
      employees: "50-100",
    },
    reviews: [
      {
        id: "r7",
        authorName: "Philippe Martin",
        rating: 4.5,
        text: "Best-in-class security tool with excellent EU compliance features. Implementation requires technical expertise.",
        role: "CISO",
        industry: "Finance",
        date: "2023-01-25",
      },
    ],
    similarTools: ["3"],
  },
  {
    id: "7",
    name: "CustomerInsight",
    description: "AI-powered customer experience platform that analyzes customer interactions across channels to improve satisfaction and loyalty.",
    logo: "https://via.placeholder.com/150",
    url: "https://example.com/customerinsight",
    industries: ["Retail", "Technology", "Finance"],
    functions: ["Customer Support", "Marketing", "Sales"],
    businessTypes: ["B2B", "B2C"],
    technicalLevel: "Low-code",
    euCompliant: {
      gdpr: true,
      dataResidency: true,
    },
    features: [
      "Sentiment analysis",
      "Customer journey mapping",
      "Personalization engine",
      "Feedback analysis",
      "Churn prediction",
    ],
    pricing: {
      hasFree: true,
      model: "Freemium",
      startingPrice: 79,
    },
    releaseDate: "2021-07-30",
    company: {
      name: "CX Innovations",
      founded: "2018",
      location: "Dublin, Ireland",
      employees: "20-50",
    },
    reviews: [
      {
        id: "r8",
        authorName: "Fiona O'Connor",
        rating: 4,
        text: "The insights we've gained have transformed our approach to customer service. Integration was simple.",
        role: "Customer Experience Director",
        industry: "Retail",
        date: "2023-05-02",
      },
    ],
    similarTools: ["4", "8"],
  },
  {
    id: "8",
    name: "EduGenius",
    description: "AI educational platform that personalizes learning paths, automates assessment, and provides insights for educators.",
    logo: "https://via.placeholder.com/150",
    url: "https://example.com/edugenius",
    industries: ["Education"],
    functions: ["Operations", "Product"],
    businessTypes: ["B2B", "B2C"],
    technicalLevel: "No-code",
    euCompliant: {
      gdpr: true,
      dataResidency: true,
    },
    features: [
      "Personalized learning paths",
      "Automated assessment",
      "Progress tracking",
      "Content recommendation",
      "Learning analytics",
    ],
    pricing: {
      hasFree: true,
      model: "Freemium",
      startingPrice: 39,
    },
    releaseDate: "2022-08-11",
    company: {
      name: "LearnTech Solutions",
      founded: "2020",
      location: "Helsinki, Finland",
      employees: "10-20",
    },
    reviews: [
      {
        id: "r9",
        authorName: "Anna Korhonen",
        rating: 5,
        text: "Transformed our teaching approach completely. Students are more engaged and learning outcomes have improved.",
        role: "Educational Director",
        industry: "Education",
        date: "2023-06-14",
      },
    ],
    similarTools: ["2"],
  },
  {
    id: "9",
    name: "MedAssist AI",
    description: "Healthcare AI assistant that supports diagnostics, treatment planning, and patient monitoring while maintaining strict privacy compliance.",
    logo: "https://via.placeholder.com/150",
    url: "https://example.com/medassist",
    industries: ["Healthcare"],
    functions: ["Operations", "IT", "Customer Support"],
    businessTypes: ["B2B"],
    technicalLevel: "Some coding",
    euCompliant: {
      gdpr: true,
      dataResidency: true,
    },
    features: [
      "Diagnostic support",
      "Treatment recommendation",
      "Patient monitoring",
      "Medical image analysis",
      "Healthcare compliance tools",
    ],
    pricing: {
      hasFree: false,
      model: "Subscription",
      startingPrice: 499,
    },
    releaseDate: "2021-04-22",
    company: {
      name: "HealthTech Innovations",
      founded: "2017",
      location: "Copenhagen, Denmark",
      employees: "50-100",
    },
    reviews: [
      {
        id: "r10",
        authorName: "Lars Nielsen",
        rating: 4.5,
        text: "Excellent diagnostic support with strong privacy protections. Integration with our systems required some work.",
        role: "Medical Director",
        industry: "Healthcare",
        date: "2023-02-28",
      },
    ],
    similarTools: ["6"],
  },
  {
    id: "10",
    name: "FactoryOptimize",
    description: "Manufacturing AI platform that optimizes production processes, predictive maintenance, and supply chain management.",
    logo: "https://via.placeholder.com/150",
    url: "https://example.com/factoryoptimize",
    industries: ["Manufacturing"],
    functions: ["Operations", "IT", "Finance"],
    businessTypes: ["B2B"],
    technicalLevel: "Some coding",
    euCompliant: {
      gdpr: true,
      dataResidency: true,
    },
    features: [
      "Process optimization",
      "Predictive maintenance",
      "Quality control",
      "Supply chain optimization",
      "Energy efficiency",
    ],
    pricing: {
      hasFree: false,
      model: "Custom pricing",
    },
    releaseDate: "2020-09-15",
    company: {
      name: "Industrial AI Solutions",
      founded: "2016",
      location: "Milan, Italy",
      employees: "100-250",
    },
    reviews: [
      {
        id: "r11",
        authorName: "Marco Bianchi",
        rating: 5,
        text: "Reduced our maintenance costs by 30% and downtime by 45%. The ROI has been exceptional.",
        role: "Operations Director",
        industry: "Manufacturing",
        date: "2023-07-11",
      },
    ],
    similarTools: ["5"],
  },
];

export const getDashboardMetrics = () => {
  return {
    totalTools: mockTools.length,
    byIndustry: getCountByProperty(mockTools, "industries"),
    byFunction: getCountByProperty(mockTools, "functions"),
    byBusinessType: getCountByProperty(mockTools, "businessTypes"),
    byTechnicalLevel: getCountByPropertySingle(mockTools, "technicalLevel"),
    gdprCompliant: mockTools.filter(tool => tool.euCompliant.gdpr).length,
    euDataResidency: mockTools.filter(tool => tool.euCompliant.dataResidency).length,
  };
};

const getCountByProperty = (tools: AiTool[], property: keyof Pick<AiTool, "industries" | "functions" | "businessTypes">) => {
  const counts: Record<string, number> = {};
  
  tools.forEach(tool => {
    (tool[property] as string[]).forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });
  });
  
  return counts;
};

const getCountByPropertySingle = (tools: AiTool[], property: keyof Pick<AiTool, "technicalLevel">) => {
  const counts: Record<string, number> = {};
  
  tools.forEach(tool => {
    const value = tool[property] as string;
    counts[value] = (counts[value] || 0) + 1;
  });
  
  return counts;
};
