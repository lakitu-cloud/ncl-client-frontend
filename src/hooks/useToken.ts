import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ClearTamperPayload,
  GenerateTokenPayload,
  TopUpPayload,
} from "../types/rechargeTypes";
import { toast } from "react-toastify";
import { queryClient } from "..";
import { rechargeSerice } from "../services/rechargeService";

export const useFetchTokens = () => {
  return useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      toast.dismiss("LOADING");
      const data = await rechargeSerice.get();

      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};

export const useGenerateToken = () => {
  return useMutation({
    mutationFn: (payload: GenerateTokenPayload) => {
        return rechargeSerice.generateToken(payload)
    },
    onSuccess: (data) => {
      toast.dismiss("LOADING");
      console.log(data)

        if (data.status === "success") {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["token"] });
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
    mutationFn: async (serial: string) => await rechargeSerice.generateTamper(serial),
    onMutate: () => {
      toast.loading("Please wait", { toastId: "LOADING" });
    },
    onSuccess: (data) => {
      console.log(data)
      if (data.status == "success") {
        toast.dismiss("LOADING");
          toast.success(data.message);
          queryClient.invalidateQueries({
            queryKey: ["token"],
          });
      }

      if (data.status == "error") {
        toast.dismiss("LOADING");
         toast.error(data.message);
      }
    },
    onError: (error) => {
      console.log(error)
      toast.dismiss("LOADING");
      toast.error(error.message);
    },
  });
};
