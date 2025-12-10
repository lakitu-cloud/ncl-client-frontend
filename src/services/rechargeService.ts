import { apiRequest } from "."
import { GenerateTokenPayload, TopUpPayload } from "../types/rechargeTypes"

export const rechargeSerice = {
    get: async(): Promise<TopUpPayload[]> => {
         const response = await apiRequest<{ data: { tokens: TopUpPayload[]}}>('token', 'GET')
    return response.data.tokens
    },

    generateToken: async(payload: GenerateTokenPayload): Promise<{ status: string, message: string}> => {
        const response = await apiRequest<{ status: string, message: string}>('token', 'POST', payload)
        return response
    },

    generateTamper: async(serial: string): Promise<{status: string, message: string}> => {
         return await apiRequest<{ status: string, message: string}>(`token/${serial}/clear`, 'POST', serial)
    }
}