import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TransactionPayload } from "../types/tsxTypes";
import { transactionService } from "../services/transactionService";


export const useFetchTxs = (
  accountType: 'zone' | 'sales' | null,
  options?: UseQueryOptions<TransactionPayload[], Error>) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      if (!accountType) {
        throw new Error('Account type not available');
      }

      const response = await transactionService.get(accountType);

      if (response.transactions) {
        return response.transactions;
      }

      throw new Error(response.message || 'Failed to fetch transactions');

    },
    enabled: !!accountType,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    ...options,
  });
};