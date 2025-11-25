import { baseUrl } from "../config/urls";
import { UserLoginPayload, UserRegistrationPayload } from "../types/user.type";

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

        
    }
}