import { SubscriberPayload } from "./subscriberTypes";
import { DashboardRevenue, DashboardTotals, DashboardVolume } from "./userType";

export interface CreateManagerPayload {
  name: string;
  phone: string;
  ward: string;
  district: string;
  region: string;
  ppu: number;
  meters: string[];
}

export interface ManagerLoginPayload {
    phone: string
    password: string
}

export interface ManagerRegistrationPayload {
    name: string
    email: string
    phone: string
    password: string
}

export interface Meters {
  id: string;
  name: string | null;
  serial: string;
  type: string;
  phone: string | null;
  status: string;
  description: string;
  lock: boolean;
  image: string;
  subscriberId: string | null;
  managerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: boolean | string;
  installedAt: string;
}

export interface Manager {
  id: string,
  name: string,
  phone: string,
  ward: string,
  region: string,
  district: string,
  ppu: number,
  meters: Meters[]
  metrics: Metrics
  subscribers: SubscriberPayload[]
  createdAt: string,
}

export interface Metrics {
  managerId: string,
  revenueToday: string,
  revenueYesterday: string,
  revenueThisWeek: string,
  revenueLastWeek: string,
  revenueThisMonth: string,
  revenueLastMonth: string,
  revenueThisYear: string,
  revenueLastYear: string,
  volumeToday: string,
  volumeYesterday: string,
  volumeThisWeek: string,
  volumeLastWeek: string,
  volumeThisMonth: string,
  volumeLastMonth: string,
  volumeThisYear: string,
  volumeLastYear: string,
  collectiveRevenue: string,
  collectiveVolume: string,
  updatedAt: string
      
}

export interface UpdateManagerPayload {
  name: string,
  ward: string,
  district: string,
  region: string,
  ppu: number,
  meters: String[]
}


export interface chartDashboardData {
  daily:[],
  weekly:[],
  monthly:[],
  yearly:[]
}

export interface MetricsPayload {
  totals: DashboardTotals;
  revenue: DashboardRevenue;
  volume: DashboardVolume;
  chart: chartDashboardData
}