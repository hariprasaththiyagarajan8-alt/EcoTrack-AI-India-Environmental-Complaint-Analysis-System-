export const ENVIRONMENTAL_CATEGORIES = [
  'Air Pollution',
  'Water Pollution',
  'Noise Pollution',
  'Illegal Waste Dumping',
  'Plastic Pollution',
  'Sewage and Drainage Pollution',
  'Industrial Pollution',
  'River and Lake Pollution',
  'Groundwater Contamination',
  'Deforestation and Tree Cutting',
  'Soil Pollution',
  'Agricultural Burning and Crop Residue Burning',
  'Construction Dust Pollution',
  'Solid Waste Management Issues',
  'Hazardous Waste Disposal',
  'Coastal and Marine Pollution',
  'Environmental Damage to Wildlife and Biodiversity',
  'Other Environmental Issues',
] as const;

export type EnvironmentalCategory = (typeof ENVIRONMENTAL_CATEGORIES)[number];

export const COMPLAINT_STATUSES = [
  'Submitted',
  'Under Review',
  'In Progress',
  'Resolved',
  'Rejected',
] as const;

export type ComplaintStatus = (typeof COMPLAINT_STATUSES)[number];

export interface ComplaintNote {
  id: string;
  author: string;
  role: string;
  text: string;
  created_at: string;
}

export interface ComplaintHistoryItem {
  id: string;
  action: string;
  actor: string;
  details: string;
  timestamp: string;
}

export interface ExtractedLocationInfo {
  state?: string;
  district?: string;
  city_town_village?: string;
  locality_or_landmark?: string;
  raw_mentions: string[];
}

export interface EnvironmentalComplaint {
  id: string; // e.g. ECO-IN-2026-1042
  description: string;
  predicted_category: EnvironmentalCategory;
  human_reviewed_category: EnvironmentalCategory | null;
  prediction_confidence: number; // 0.0 to 1.0
  state: string;
  district: string;
  city_town_village: string;
  locality?: string;
  incident_date?: string;
  submission_date: string;
  status: ComplaintStatus;
  extracted_keywords: string[];
  extracted_locations: ExtractedLocationInfo;
  notes: ComplaintNote[];
  history: ComplaintHistoryItem[];
  is_synthetic_demonstration: boolean;
}

export interface ModelMetrics {
  accuracy: number;
  macro_f1: number;
  weighted_f1: number;
  macro_precision: number;
  macro_recall: number;
  training_samples: number;
  test_samples: number;
  vocabulary_size: number;
  last_evaluated: string;
  category_metrics: {
    category: EnvironmentalCategory;
    precision: number;
    recall: number;
    f1: number;
    support: number;
  }[];
  confusion_matrix: {
    labels: string[];
    matrix: number[][];
  };
}

export interface DashboardStats {
  total_complaints: number;
  submitted_today: number;
  under_review: number;
  in_progress: number;
  resolved: number;
  rejected: number;
  most_reported_issue: string;
  most_reported_state: string;
  most_reported_district: string;
}

export interface RuleBasedRecommendation {
  id: string;
  district_or_state: string;
  category: EnvironmentalCategory | string;
  complaint_count: number;
  rule_trigger: string;
  action_recommendation: string;
  severity: 'Urgent Action' | 'High Attention' | 'Standard Review';
  recorded_evidence: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Nodal Environmental Officer';
  department: string;
}
