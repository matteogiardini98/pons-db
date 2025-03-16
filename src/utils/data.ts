
import { AiTool } from './types';

export const INDUSTRIES = [
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

export const FUNCTIONS = [
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

export const BUSINESS_TYPES = [
  "B2B", 
  "B2C", 
  "B2B2C", 
  "Prosumer", 
  "Developer"
];

export const TECHNICAL_LEVELS = [
  "No-code", 
  "Low-code", 
  "Some coding", 
  "Technical"
];

export const mockTools: AiTool[] = [
  {
    id: "c10ee505-26e4-4cde-aa3e-b00261573a2b",
    name: "Demostack",
    problem_solved_description: "Automates creation of personalized, realistic demos by injecting AI-generated data into product environments.",
    website: "demostack.com",
    linkedin: ["https://www.linkedin.com/company/demostack/"],
    function: ["sales"],
    role: ["sales engineering"],
    use_case_tag: "technical product demonstration",
    technical_level: "plug & play without configuration",
    euCompliant: {
      gdpr_compliant: [],
      data_residency: false,
      ai_act_compliant: false
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
  },
  {
    id: "926d07af-6f69-4917-b9fa-b3af92408c60",
    name: "Consensus",
    problem_solved_description: "Delivers interactive, AI-powered demo tours that tailor content to each prospect, reducing live demo burden.",
    website: "goconsensus.com",
    linkedin: ["https://www.linkedin.com/company/getconsensus/"],
    function: ["sales"],
    role: ["sales engineering"],
    use_case_tag: "technical product demonstration",
    technical_level: "requires setup & integrations",
    euCompliant: {
      gdpr_compliant: [],
      data_residency: false,
      ai_act_compliant: false
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
  },
  {
    id: "dee68088-8cda-46f8-b10b-3264625e2b32",
    name: "Saleo",
    problem_solved_description: "Injects dynamic, AI-generated data into live demos to ensure each demonstration is context-relevant.",
    website: "saleo.ai",
    linkedin: ["https://www.linkedin.com/company/saleo-sales-demo-platform/"],
    function: ["sales"],
    role: ["sales engineering"],
    use_case_tag: "technical product demonstration",
    technical_level: "requires setup & integrations",
    euCompliant: {
      gdpr_compliant: [],
      data_residency: false,
      ai_act_compliant: false
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
  },
  {
    id: "2268766b-c637-466d-a3a4-8a0e4f44c2cb",
    name: "Reprise",
    problem_solved_description: "Creates interactive, customizable product tours with dynamic overlays that highlight key features during technical discussions.",
    website: "reprise.com",
    linkedin: ["https://www.linkedin.com/company/getreprise/"],
    function: ["sales"],
    role: ["sales engineering"],
    use_case_tag: "technical product demonstration",
    technical_level: "requires setup & integrations",
    euCompliant: {
      gdpr_compliant: [],
      data_residency: false,
      ai_act_compliant: false
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
  },
  {
    id: "0e375cdf-6412-4fa7-85ad-d8f883b68f3f",
    name: "Loopio",
    problem_solved_description: "Streamlines RFP responses and proposal creation by auto-filling content from a centralized knowledge base, reducing repetitive writing tasks.",
    website: "loopio.com",
    linkedin: ["https://www.linkedin.com/company/loopio/"],
    function: ["sales"],
    role: ["sales engineering"],
    use_case_tag: "proposal generation & customization",
    technical_level: "requires setup & integrations",
    euCompliant: {
      gdpr_compliant: [],
      data_residency: false,
      ai_act_compliant: false
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
  },
  {
    id: "aa3c69d3-c7ac-479f-bdde-242ca95ae533",
    name: "DocketAI",
    problem_solved_description: "Automates technical proposal and RFP responses by generating tailored content from a centralized repository of sales knowledge.",
    website: "docketai.com",
    linkedin: ["https://www.linkedin.com/company/docket-inc/"],
    function: ["sales"],
    role: ["sales engineering"],
    use_case_tag: "proposal generation & customization",
    technical_level: "requires setup & integrations",
    euCompliant: {
      gdpr_compliant: [],
      data_residency: false,
      ai_act_compliant: false
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
  },
  {
    id: "5e2e207e-9b19-4307-bc52-88297f9c18fc",
    name: "Responsive",
    problem_solved_description: "Accelerates RFP and proposal responses with AI-driven content suggestions and templates for technical documentation.",
    website: "rfpio.com",
    linkedin: ["https://www.linkedin.com/company/responsiveio/"],
    function: ["sales"],
    role: ["sales engineering"],
    use_case_tag: "proposal generation & customization",
    technical_level: "requires setup & integrations",
    euCompliant: {
      gdpr_compliant: [],
      data_residency: false,
      ai_act_compliant: false
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
  },
  {
    id: "ef0ae92e-0052-4ef3-974a-bf08fd69fdaf",
    name: "Second Nature",
    problem_solved_description: "Provides AI-based role-play and coaching that simulates customer interactions for practicing demos and technical Q&A sessions.",
    website: "secondnature.ai",
    linkedin: ["https://www.linkedin.com/company/second-nature-ai/"],
    function: ["sales"],
    role: ["sales engineering"],
    use_case_tag: "sales enablement & training",
    technical_level: "plug & play without configuration",
    euCompliant: {
      gdpr_compliant: [],
      data_residency: false,
      ai_act_compliant: false
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
  },
];

export const getDashboardMetrics = () => {
  return {
    totalTools: mockTools.length,
    byFunction: getCountByProperty(mockTools, "function"),
    byRole: getCountByProperty(mockTools, "role"),
    byUseCase: getCountByPropertySingle(mockTools, "use_case_tag"),
    byTechnicalLevel: getCountByPropertySingle(mockTools, "technical_level"),
    gdprCompliant: mockTools.filter(tool => 
      tool.euCompliant.gdpr_compliant && 
      (Array.isArray(tool.euCompliant.gdpr_compliant) ? 
        tool.euCompliant.gdpr_compliant.length > 0 : 
        tool.euCompliant.gdpr_compliant)).length,
    euDataResidency: mockTools.filter(tool => tool.euCompliant.data_residency).length,
  };
};

const getCountByProperty = (tools: AiTool[], property: keyof Pick<AiTool, "function" | "role">) => {
  const counts: Record<string, number> = {};
  
  tools.forEach(tool => {
    (tool[property] as string[]).forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });
  });
  
  return counts;
};

const getCountByPropertySingle = (tools: AiTool[], property: keyof Pick<AiTool, "use_case_tag" | "technical_level">) => {
  const counts: Record<string, number> = {};
  
  tools.forEach(tool => {
    const value = tool[property] as string;
    counts[value] = (counts[value] || 0) + 1;
  });
  
  return counts;
};
