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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: T = await response.json();
    console.log(responseData)
    return responseData;
};