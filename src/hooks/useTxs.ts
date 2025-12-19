import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TransactionPayload } from "../types/tsxTypes";
import { transactionService } from "../services/transactionService";


export const useFetchTxs = (options?: UseQueryOptions< TransactionPayload[], Error, TransactionPayload[], ['token'] >) => {
  return useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      const response = await transactionService.get();

     if (response.transactions) {
        return response.transactions;
      }
       throw new Error(response.message || 'Failed to fetch transactions');
    },
    staleTime: 5 * 60 * 1000,
    retry: 3,
     ...options,
  });
};