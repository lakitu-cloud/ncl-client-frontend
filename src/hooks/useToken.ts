import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  ClearTamperPayload,
  GenerateTokenPayload,
  TopUpPayload,
} from "../types/rechargeTypes";
import { toast } from "react-toastify";
import { queryClient } from "..";
import { rechargeService } from "../services/rechargeService";

let tokenId: any

export const useFetchTokens = (options?: UseQueryOptions< TopUpPayload[], Error, TopUpPayload[], ['tokens'] >) => {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: async () => {
      toast.dismiss("LOADING");
      const data = await rechargeService.get();
      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 3,
     ...options,
  });
};

export const useGenerateToken = () => {
  return useMutation({
    mutationFn: (payload: GenerateTokenPayload) => {
        return rechargeService.generateToken(payload)
    },
    onSuccess: (data) => {
      toast.dismiss("LOADING");

        if (data.status === "success") {
          
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ['tokenId', tokenId] })
          queryClient.invalidateQueries({ queryKey: ["tokens"] });
          window.location.reload()
        }
  
        if (data.status === "error") {
          toast.error(`${data.message}`);
        }
      },
    onError: (error: any) => {
      toast.dismiss("LOADING");
      toast.error(`${error.message}`);
    },
    onMutate: () => {
        toast.loading("Processing request...", { toastId: "LOADING" });
      },
  });
};

export const useGenerateTamper = () => {
  return useMutation({
    mutationFn: async (serial: string) => await rechargeService.generateTamper(serial),
    onMutate: () => {
      toast.loading("Please wait", { toastId: "LOADING" });
    },
    onSuccess: (data) => {
      if (data.status == "success") {
        toast.dismiss("LOADING");
          toast.success(data.message);
          
          queryClient.invalidateQueries({
            queryKey: ["tokens"],
          });

      }

      if (data.status == "error") {
        toast.dismiss("LOADING");
         toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.dismiss("LOADING");
      toast.error(error.message);
    },
  });
};

export const useTokenMeter = (tokenId: string) => {
  tokenId = tokenId
  return useQuery<TopUpPayload[], Error>({
    queryKey: ['tokenId', tokenId], // ← important: include tokenId in key!
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; // extract the id from queryKey

      toast.dismiss('LOADING');

      const response = await rechargeService.getTamperById(id as string);

      // Optional: validate/transform response
      if (!response?.token) {
        throw new Error('Invalid response format');
      }

      return response.token;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes (previously cacheTime)
    retry: 3,
    enabled: !!tokenId,       // ← very important: don't run if no id
  });
};