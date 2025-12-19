export interface WakalaCreatePayload {
    name: string;
    phone: string;
    email: string;
    imei: string;
    float?: number;
}

export interface WakalaData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  imei: string;
  float: number;
  createAt?: string
}

export interface AddFloatData {
  float: number;
}

export interface Props {
  IsAddModalOpen: boolean,
  setIsAddModalOpen: any
}
