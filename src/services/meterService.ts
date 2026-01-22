// meter service with all meter queries
import { apiRequest } from ".";
import { MeterPayload, AddMultipleMeterPayload, Meter, MetersGetByIdPayload } from "../types/meterTypes";
import {baseUrl} from "../config/urls"

export interface ApiResponse<T = any> {
  status: "success" | "error";
  message?: string;
  meters?: MeterPayload[];
  meter?: any;
  data?: T;
}

export const meterService = {
  getAll: async (): Promise<{ status: string, meters: Meter[] }> => {
    const response = await apiRequest<{ status: string, meters: Meter[] }>('meter/all', 'GET');
    return response;
  },

  get: async (): Promise<{ status: string, meters: Meter[] }> => {
    const response = await apiRequest<{ status: string, meters: Meter[] }>('meter', 'GET');
    return response;
  },

  getById: async (id: string): Promise<{ status: string, meter: MetersGetByIdPayload, manager: { id: string, name: string } }> => {
    const res = await apiRequest<{ status: string, meter: MetersGetByIdPayload, manager: { id: string, name: string } }>(`meter/${id}`, 'GET')
    return res
  },

  delete: async (id: string): Promise<{ status: string, message: string }> => {
    const response = await apiRequest<{ status: string, message: string }>(`meter/${id}/delete`, 'DELETE',)
    return response
  },

  fetchJobs: async (id: string): Promise<any> => {
    const response = await apiRequest<{ data: { job: any } }>(`meter/${id}/jobs`, 'GET',)
    return response
  },

  createConfiguration: async (): Promise<any> => {
    const response = await apiRequest<{ status: "success" | "error", message: string }>('meter/config', 'POST')
    return response
  },

  assign: async (subscriberId: string, meterId: string): Promise<{ status: string, message: string }> => {
    const response = await apiRequest<{ status: string, message: string }>(`meter/${subscriberId}/${meterId}/assign`, 'PUT')
    return response
  },

  unassign: async (meterId: string): Promise<{ status: string, message: string }> => {
    const response = await apiRequest<{ status: string, message: string }>(`meter/unassign/${meterId}/subscriber`, 'PUT')
    return response
  },
  getAvailable: async (search?: string): Promise<{ id: string, serial: string}[]> => {
    const url = new URL(`${baseUrl}meter/available`);
    if (search && search.trim()) {
      url.searchParams.append('search', search.trim());
    }

    const response = await fetch(url, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch available meters');
    }

    const result = await response.json();
    // Adjust based on your API response structure, e.g. result.data or result.meters
    return result.data || result.meters || [];
  },

  reportProblem: async(id: string, description: string): Promise<{ status: string, message: string }> => {
    const res = await apiRequest<{ status: string, message: string }>(`report/${id}/report-problem`, 'POST', { description: description.trim() })
    return res
  }
}