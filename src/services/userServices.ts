import { apiRequest } from ".";
import { baseUrl } from "../config/urls";
import { DashboardData, UserLoginPayload, UserRegistrationPayload } from "../types/userType";
import { ApiResponse } from "./managerServices";

interface DashboardApiResponse {
  status: 'success';
  metrics: DashboardData;
}

export const userService = {
    login: async (payload: UserLoginPayload) => {

        return await fetch(`${baseUrl}user/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
    },

     register: async (payload: UserRegistrationPayload) => {
        return await fetch(`${baseUrl}user`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        
    },

    token: async (token: string) => {
        return  await fetch(`${baseUrl}user/${token}/refresh`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': "application/json"
            },
        })
        
    },

    refresh: async(): Promise<ApiResponse> => {
        const res = await apiRequest<ApiResponse>('user/refresh', 'POST')
        return res
    },

    dashboard: async(): Promise<DashboardApiResponse> => {
        const res = await apiRequest<DashboardApiResponse>('user/data', 'GET')
            return res
    },

    availableMeter: async(): Promise<{status: string, meters: string[]}> => {
        const res = await apiRequest<{status: string, meters: string[]}>('user/available', 'GET')
        return res
    },

    changePassword: async(payload: any) : Promise<{ status: string, message:string}>=> {
        console.log(payload)
        const res = await apiRequest<{status: string, message: string}>('user/reset', 'PUT', payload)
        return res
    }
}