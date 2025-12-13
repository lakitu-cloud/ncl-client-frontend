// meter service with all meter queries
import { apiRequest } from ".";
import { MeterPayload, AddMultipleMeterPayload, Meter, MetersGetByIdPayload } from "../types/meterTypes";

export interface ApiResponse<T = any> {
  status: "success" | "error";
  message?: string;
  meters?: MeterPayload[];
  meter?: any;
  data?: T;
}

export const meterService =  {
 getAll: async (): Promise<{ status: string, meters: Meter[]}> => {
  const response = await apiRequest<{ status: string, meters: Meter[]}>('meter/all', 'GET');
  return response;
},

 get: async (): Promise<MeterPayload> => {
  const response = await apiRequest<{ meters: MeterPayload}>('meter', 'GET');
  return response.meters;
},

getById: async(id: string): Promise<{ status: string, meter: MetersGetByIdPayload, manager: { id: string, name: string}}> => {
    const res = await apiRequest<{status: string, meter: MetersGetByIdPayload, manager: { id: string, name: string }}>(`meter/${id}`, 'GET')
    return res
  },

delete: async(id: string): Promise<{ status: string, message: string }> => {
  const response = await apiRequest<{ status: string, message: string }>(`meter/${id}/delete`, 'DELETE', )
  return response
},

fetchJobs: async(id: string): Promise<any> => {
  const response = await apiRequest<{ data: { job: any } }>(`meter/${id}/jobs`, 'GET', )
  return response
},

createConfiguration: async(): Promise<any> => {
  const response = await apiRequest<{ status: "success" | "error", message: string }>('meter/config', 'POST')
  return response
}
}