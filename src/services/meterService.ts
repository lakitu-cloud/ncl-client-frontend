// meter service with all meter queries
import { apiRequest } from ".";
import { MeterPayload, AddMultipleMeterPayload } from "../types/meter.types";

export const getMeters = async (): Promise<MeterPayload[]> => {
  const response = await apiRequest<{ data: { meter: MeterPayload[] } }>('meter', 'GET');
  return response.data.meter;
};

export const addMeter = async( serial: string ): Promise<any> => {
  const response = await apiRequest<{ status: string, message: string }>(`meter/${serial}/add`, 'POST',)
  return response
}

export const deleteMeter = async(id: string): Promise<{ status: string, message: string }> => {
  const response = await apiRequest<{ status: string, message: string }>(`meter/${id}/delete`, 'DELETE', )
  return response
}

export const addMultipleMeter = async(payload: AddMultipleMeterPayload): Promise<{ status: "success" | "error", message: string, addedCount: number }> => {
    const response = await apiRequest<{ status: "success" | "error", message: string, addedCount: number }>('meter/addMany', 'POST', payload)
    return response
}

export const fetchJobs = async(id: string): Promise<any> => {
  const response = await apiRequest<{ data: { job: any } }>(`meter/${id}/jobs`, 'GET', )
  return response
}

export const createConfiguration = async(): Promise<any> => {
  const response = await apiRequest<{ status: "success" | "error", message: string }>('meter/config', 'POST')
  return response
}