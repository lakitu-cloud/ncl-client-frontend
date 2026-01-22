import { apiRequest } from ".";
import { TransactionPayload } from "../types/tsxTypes";

export const transactionService = {
    get: async(role: string): Promise<{status: string, message: string, transactions: TransactionPayload[]}> => {
        const response = await apiRequest<{ status: string, message: string, transactions: TransactionPayload[] }>(`${role === "zone" ? "transaction/all" : "transaction"}`, 'GET');
        console.log(response)
        return response;
    },
}