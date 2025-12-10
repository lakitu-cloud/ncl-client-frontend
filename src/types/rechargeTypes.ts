export interface TopUpPayload {
  serial: string;
  units?: string;
  type: string;
  price?: string;
  liters: number;
  phone?: string;
  status: string;
  token: string;
  reference: string;
  created_at: string;
  expire_date?: string;
}

export interface GenerateTokenPayload {
    serial: string,
    account: string,
    amount: number
}

export interface ClearTamperPayload {
    serial: string
}