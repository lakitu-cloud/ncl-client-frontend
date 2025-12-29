import Cookies from 'js-cookie';
import { baseUrl } from "../config/urls";

export const apiRequest = async <T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<T> => {
    const response = await fetch(`${baseUrl}/${url}`, {
        method,
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${Cookies.get('auth')}`,
            "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
        if (response.status == 401) {
            Cookies.remove('auth');
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);

        }
    }

    if (response.status === 204) return {} as T;


    const responseData: T = await response.json();
    return responseData;
};