
export interface AiTool {
  id: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  industries: string[];
  functions: string[];
  businessTypes: string[];
  technicalLevel: string;
  features: string[];
  euCompliant: {
    gdpr: boolean;
    dataResidency: boolean;
    aiAct?: boolean;
  };
  company?: {
    name: string;
    founded: string;
    location: string;
    employees?: string;
  };
  pricing?: {
    model: string;
    hasFree: boolean;
    startingPrice?: number;
  };
  releaseDate?: string;
  similarTools?: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  text: string;
  authorName: string;
  date: string;
  rating: number;
  role?: string;
  industry?: string;
  comment?: string;
}

export interface FilterState {
  industries: string[];
  functions: string[];
  businessTypes: string[];
  technicalLevel: string[];
  euCompliant: {
    gdpr: boolean;
    dataResidency: boolean;
    aiAct?: boolean;
  };
}

export type Industry = string;
export type BusinessFunction = string;
export type BusinessType = string;
export type TechnicalLevel = string;
