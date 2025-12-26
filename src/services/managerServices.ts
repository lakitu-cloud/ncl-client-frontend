// services/managerService.ts
import { apiRequest } from ".";
import { CreateManagerPayload, Manager, ManagerLoginPayload, UpdateManagerPayload } from "../types/managerType";
import { SubscriberPayload } from "../types/subscriberTypes";

export interface ApiResponse<T = any> {
  status: "success" | "error";
  message?: string;
  managers?: Manager[];
  manager?: any;
  token: string;
  data?: T;
}

export const managerService = {
  getAll: async (): Promise<Manager[]> => {
    const res = await apiRequest<ApiResponse<{ managers: Manager[] }>>("manager", "GET");
    return res.managers || [];
  },

  create: async (payload: CreateManagerPayload): Promise<ApiResponse> => {
    return await apiRequest<ApiResponse>("manager", "POST", payload);
  },

  getById: async (id: string) => {
    const res = await apiRequest<ApiResponse<{status: string, manager: Manager[] }>>(`manager/${id}`, "GET");
    return res;
  },

  delete: async (id: string): Promise<ApiResponse> => {
    return await apiRequest<ApiResponse>(`manager/${id}`, "DELETE");
  },

  login: async (payload: ManagerLoginPayload) => {
    const res = await apiRequest<ApiResponse<{ status: string, token: string, id: string}>>('manager/login', 'POST', payload);
    console.log(res)
    return res
  },

  update: async(id: string, payload: UpdateManagerPayload): Promise<ApiResponse> => {
    const res = await apiRequest<ApiResponse>(`manager/${id}`, 'PUT', payload)
    return res
  },

  dashboard: async(): Promise<any> => {
    const res = await apiRequest<any>('manager/data', 'GET')
  }
};