
export type Industry = 
  | "Finance" 
  | "Healthcare" 
  | "Education" 
  | "Retail" 
  | "Manufacturing" 
  | "Technology" 
  | "Legal" 
  | "Marketing" 
  | "HR"
  | "Other";

export type BusinessFunction = 
  | "Sales" 
  | "Marketing" 
  | "Customer Support" 
  | "HR" 
  | "Finance" 
  | "IT" 
  | "Operations" 
  | "Legal" 
  | "Product"
  | "Other";

export type BusinessType = "B2B" | "B2C" | "B2B2C" | "Prosumer" | "Developer";

export type TechnicalLevel = "No-code" | "Low-code" | "Some coding" | "Technical";

export interface AiTool {
  id: string;
  name: string;
  description: string;
  logo: string;
  url: string;
  industries: Industry[];
  functions: BusinessFunction[];
  businessTypes: BusinessType[];
  technicalLevel: TechnicalLevel;
  euCompliant: {
    gdpr: boolean;
    dataResidency: boolean;
  };
  features: string[];
  pricing: {
    hasFree: boolean;
    model: string;
    startingPrice?: number;
  };
  releaseDate: string;
  company: {
    name: string;
    founded: string;
    location: string;
    employees?: string;
  };
  reviews: Review[];
  similarTools: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  role?: string;
  industry?: Industry;
  date: string;
}

export interface FilterState {
  industries: Industry[];
  functions: BusinessFunction[];
  businessTypes: BusinessType[];
  technicalLevel: TechnicalLevel[];
  euCompliant: {
    gdpr: boolean;
    dataResidency: boolean;
  };
}

export interface DashboardMetric {
  label: string;
  value: number;
  change?: number;
}

export interface ChartData {
  labels: string[];
  values: number[];
}
