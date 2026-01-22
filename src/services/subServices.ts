import { apiRequest } from ".";
import { SubscriberCreatePayload, SubscriberPayload, SubscriberUpdatePayload } from "../types/subscriberTypes";

export const subscriberService = {
    get: async(): Promise<{status: string, message: string, subscribers: SubscriberPayload[]}> => {
        const response = await apiRequest<{ status: string, message: string, subscribers: SubscriberPayload[] }>('subscriber', 'GET');
        return response;
    },

    getById: async(id: string): Promise<{ status: string, message: string, data: { subscriber: SubscriberPayload }}> => {
        const res = await apiRequest<any>(`subscriber/${id}`, 'GET')
        return res
    },

    create: async(payload: SubscriberCreatePayload): Promise<SubscriberCreatePayload> => {
        return await apiRequest<any>('subscriber', 'POST', payload)
    },

    delete: async(id: string): Promise<any> => {
         return await apiRequest<any>(`subscriber/${id}`, 'DELETE')
    },

    assign: async(id: string, serial: string): Promise<any> => {
        return await apiRequest<{ status: string, message: string}>(`subscriber/${id}/assign`, 'PUT', { serial })

    },

    update: async(payload: SubscriberUpdatePayload) => {
        return await apiRequest<any>(`subscriber/${payload.id}/update`, 'PUT', payload)
    },

    upload: async(id: string) => {
        return await apiRequest<any>(`subscriber/${id}/image`, 'PUT')
    },

    search: async(payload: string) => {
        const res = await apiRequest<any>(`subscriber/search/${payload}`, 'GET')
        return res
    }
}