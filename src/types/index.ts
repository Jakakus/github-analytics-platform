export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  timestamp: Date;
}

export interface AnalysisStep {
  id: string;
  process: string;
  input: string;
  output: string;
  timestamp: Date;
}

export interface ProcessingState {
  steps: AnalysisStep[];
  currentProcess: string | null;
  completed: boolean;
}

export interface Facility {
  id: string;
  name: string;
  type: 'office' | 'manufacturing' | 'warehouse' | 'retail' | 'hospital' | 'school' | 'other';
  location: {
    address: string;
    coordinates: [number, number]; // [lat, lng]
    timezone: string;
  };
  size: number; // square feet
  occupancy: number;
  operatingHours: {
    start: string;
    end: string;
    days: string[];
  };
  targetEfficiency: number;
  carbonGoals: {
    target: number; // kg CO2 per year
    baseline: number;
    deadline: Date;
  };
}

export interface Equipment {
  id: string;
  facilityId: string;
  name: string;
  type: 'hvac' | 'lighting' | 'machinery' | 'computing' | 'security' | 'other';
  power: number; // watts
  efficiency: number; // percentage
  status: 'active' | 'idle' | 'maintenance' | 'off';
  lastMaintenance: Date;
  nextMaintenance: Date;
  energyProfile: {
    dailyConsumption: number[];
    weeklyPattern: number[];
    seasonalVariation: number;
  };
}

export interface SustainabilityMetrics {
  carbonFootprint: {
    current: number;
    target: number;
    trend: 'improving' | 'stable' | 'worsening';
    monthlyData: { month: string; value: number }[];
  };
  energyEfficiency: {
    current: number;
    target: number;
    benchmarkComparison: number; // vs industry average
    improvementPotential: number;
  };
  renewableEnergy: {
    percentage: number;
    target: number;
    sources: Record<string, number>;
  };
  costSavings: {
    monthly: number;
    yearly: number;
    fromEfficiency: number;
    fromRenewables: number;
  };
}

export interface Prediction {
  type: 'consumption' | 'demand' | 'cost' | 'carbon';
  timeframe: 'hourly' | 'daily' | 'weekly' | 'monthly';
  values: {
    timestamp: Date;
    predicted: number;
    confidence: number; // 0-1
    upper_bound: number;
    lower_bound: number;
  }[];
  accuracy: number; // percentage
  lastUpdated: Date;
}

export interface Recommendation {
  id: string;
  category: 'efficiency' | 'cost' | 'sustainability' | 'maintenance';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  impact: {
    energySavings: number; // kWh/year
    costSavings: number; // USD/year
    carbonReduction: number; // kg CO2/year
  };
  implementation: {
    difficulty: 'easy' | 'medium' | 'hard';
    cost: number; // USD
    timeframe: string;
    roi: number; // years
  };
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
}

export interface WeatherData {
  timestamp: Date;
  temperature: number; // Celsius
  humidity: number; // percentage
  windSpeed: number; // m/s
  solarIrradiance: number; // W/m²
  cloudCover: number; // percentage
  forecast: {
    temperature: number[];
    solarIrradiance: number[];
    next24h: boolean;
  };
}