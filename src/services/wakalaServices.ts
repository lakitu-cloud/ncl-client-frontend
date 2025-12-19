import { apiRequest } from '.';
import { AddFloatData, WakalaCreatePayload, WakalaData } from '../types/wakalaType';

export interface ApiResponse<T = any> {
  status: "success" | "error";
  message?: string;
  wakalas?: WakalaData[];
  wakala?: any;
  token: string;
  data?: T;
}

export const wakalaService = {
    get: async (): Promise<WakalaData[]> => {
        const res = await apiRequest<ApiResponse<{ wakalas: WakalaData[] }>>('wakala', 'GET')
        return res.wakalas || []
    },

    create: async (payload: WakalaCreatePayload): Promise<ApiResponse> => {
        const res = await apiRequest<ApiResponse>('wakala', 'POST', payload)
        return res
    },

    delete: async (id: string): Promise<any> => {
        const res = await apiRequest<any>(`wakala/${id}`, 'DELETE')
        return res
    },

    addFloat: async (id: string, addFloatData: AddFloatData): Promise<any> => {
        const res = await apiRequest<any>(`wakala/${id}/float`, 'PUT', addFloatData)
        return res
    }
}