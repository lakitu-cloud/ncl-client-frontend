import { baseUrl } from "../config/urls";
import { SalesLoginPayload, SalesRegistrationPayload } from "../types/sales.type";

export const salesService = {
    login: async (payload: SalesLoginPayload) => {

        return await fetch(`${baseUrl}/sales/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
    },

     register: async (payload: SalesRegistrationPayload) => {
        return await fetch(`${baseUrl}/sales`, {
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

        
    }
}