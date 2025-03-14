
export interface AiTool {
  id: string;
  name: string;
  description: string;
  url: string;
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
  reviews: Review[];
}

export interface Review {
  id: string;
  text: string;
  authorName: string;
  date: string;
  rating: number;
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
