// export interface TransactionPayload {
//   id: string;
//   serial: string;
//   reference: string;
//   token: string;
//   phone: string;
//   units: number;
//   method: string;
//   status: string;
//   created_at: string;
//   amount: number;
// }


export type TransactionPayload = {
  id: string;
  receipt: string;
  serial: string;
  card: string | null;
  accountNo: string;
  units: number;
  amount: number;
  token: string;
  status: string;
  method: string;
  sys_id: string | null;
  managerId: string;
  wakalaId: string | null;
  subscriberId: string;
  subscriber: any
  userId: string
  createdAt: string;
  updatedAt: string;
  deletedAt: boolean | null;
};