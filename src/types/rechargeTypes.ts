    export interface TopUpPayload {
      serial: string;
      units?: string;
      type: string;
      price?: string;
      liters: number;
      phone?: string;
      token?: string;
      status: string;
      reference: string;
      createdAt: string;
      expire_date?: string;
    }

export interface GenerateTokenPayload {
    serial: string,
    account?: string,
    unit: number
}

export interface ClearTamperPayload {
    serial: string
}