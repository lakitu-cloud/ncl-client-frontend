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

type Meter = {  
    serial: string;
  }

export interface MeterSubscriber {
  id: string;
  serial: string;
  name: string | null;
  type: string;
  status: string;
  image: string;
  // ... other meter fields if needed
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
  meters: MeterSubscriber[]; 
}


export interface Props {
  IsAddModalOpen: boolean,
  setIsAddModalOpen: any
}

