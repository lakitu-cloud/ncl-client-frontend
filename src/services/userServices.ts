import { apiRequest } from ".";
import { baseUrl } from "../config/urls";
import { DashboardData, UserLoginPayload, UserRegistrationPayload } from "../types/userType";

interface DashboardApiResponse {
  status: 'success';
  metrics: DashboardData;
}

export const userService = {
    login: async (payload: UserLoginPayload) => {

        return await fetch(`${baseUrl}/user/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
    },

     register: async (payload: UserRegistrationPayload) => {
        return await fetch(`${baseUrl}/user`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        
    },

    refresh: async (token: string) => {
        return  await fetch(`${baseUrl}/user/${token}/refresh`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': "application/json"
            },
        })

        
    },

    dashboard: async(): Promise<DashboardApiResponse> => {
        const res = await apiRequest<DashboardApiResponse>('user/data', 'GET')
        console.log("form the main source", res.metrics);
        return res
    }
}