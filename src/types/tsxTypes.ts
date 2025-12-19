export interface TransactionPayload {
  id: string;
  serial: string;
  reference: string;
  token: string;
  phone: string;
  units: number;
  method: string;
  status: string;
  created_at: string;
  amount: number;
}
