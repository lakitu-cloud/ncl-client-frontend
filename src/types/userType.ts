export interface UserLoginPayload {
    email: string
    password: string
}

export interface UserRegistrationPayload {
    name: string
    email: string
    phone: string
    password: string
    ppl: number
}


// src/types/dashboard.ts

export interface DashboardRevenue {
  today: number;
  yesterday: number;
  thisWeek: number;
  lastWeek: number;
  thisMonth: number;
  lastMonth: number;
  thisYear: number;
  lastYear: number;
}

export interface DashboardVolume {
  today: number;
  yesterday: number;
  thisWeek: number;
  lastWeek: number;
  thisMonth: number;
  lastMonth: number;
  thisYear: number;
  lastYear: number;
}

export interface ManagerChartItem {
  name: string;
  subscribers: number;
  meters: number;
  revenue: number;
}

export interface DashboardTotals {
  manager?: number;
  meter: number;
  revenue: number;
  transaction: string;
  subscriber?: number,
  wakala?: number
}

export interface DashboardData {
  total: DashboardTotals;
  revenue: DashboardRevenue;
  volume: DashboardVolume;
  chart: ManagerChartItem[];
}

