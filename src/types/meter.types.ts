export interface MeterPayload {
        id: string;
      serial: string;
      error: string;
      price_per_unit: number;
      calibration_factor: number;
      type: string;
      status: string;
      created_at: string;
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