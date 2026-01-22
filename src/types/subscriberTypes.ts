import { Meter } from "./meterTypes";
import { TransactionPayload } from "./tsxTypes";

export interface SubscriberCreatePayload {
    name: string;
    phone: string;
    serial: string;
    type: string
    amount?: number;
    card?: string;
    location: string
}

export interface SubscriberUpdatePayload {
    id: string
    name: string;
    phone: string;
    email: string;
    region: number;
    ward: string;
    ppu: string;
}

export interface SubscriberPayload {
  id: string;
  ref: string;
  name: string;
  phone: string;
  balance: number;
  type: string;
  status: 'active' | 'inactive' | 'locked';
  profile: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  transactions: TransactionPayload[]; 
  meters: Meter[]
}


export interface Props {
  IsAddModalOpen: boolean,
  setIsAddModalOpen: any
}

export interface SearchSubscribersResponse {
  status: 'success' | 'error';
  subscribers: SubscriberPayload[];
  message?: string;
}

