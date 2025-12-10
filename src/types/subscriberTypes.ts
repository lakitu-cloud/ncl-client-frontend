export interface SubscriberCreatePayload {
    name: string;
    phone: string;
    region: string;
    ward: string;
    ppu?: number;
    card?: string;
    type: "token" | "card" | "";
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

type Meter = {  
    serial: string;
  }

export interface SubscriberPayload {
    id: string;
    name: string;
    type: string;
    account_no: string;
    phone: string;
    region: string;
    ppu: number;
    card: string;
    ward: string;
    status: string;
}

export interface AssignMeterPayload {
    serial: string;
}