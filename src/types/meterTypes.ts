export interface Meter {
  id: string;
  name: string | null;
  serial: string;
  type: string;
  phone: string | null;
  status: "active" | "inactive";
  description: string;
  lock: boolean;
  image: string;
  subscriberId: string | null;
  managerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: boolean;
  installedAt: string;
}

export interface MeterPayload {
  status: string;
  meters: Meter[];
}

export interface UpdateMeterPayload {
    type: string;
    description: string;
    subscriber_id: string;
    location: string;
    status: string;
}

export interface AddMeterPayload {
    serial: string;
}

export type AddMultipleMeterPayload = {
    meters: string[],
    name: string,
    password: string
}

export interface deleteMeterPayload {
    id: number;
}