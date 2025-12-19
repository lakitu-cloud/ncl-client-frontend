import { apiRequest } from ".";
import { TransactionPayload } from "../types/tsxTypes";

export const transactionService = {
    get: async(): Promise<{status: string, message: string, transactions: TransactionPayload[]}> => {
        const response = await apiRequest<{ status: string, message: string, transactions: TransactionPayload[] }>('transaction/all', 'GET');
        return response;
    },
}