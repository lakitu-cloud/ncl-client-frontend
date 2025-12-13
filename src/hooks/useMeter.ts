import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { meterService } from "../services/meterService";
import { Meter, MeterPayload, MeterDetailApiResponse } from "../types/meterTypes";
import { toast } from "react-toastify";
import { queryClient } from "..";
import { meterKeys } from "../lib/queryKeys";

export const useGetAllMeter = () => {
  return useQuery<Meter[], Error>({
    queryKey: meterKeys.all,
    queryFn: async () => {
      const res = await meterService.getAll();
      return res.meters
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetMeter = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["meters"],
    queryFn: async () => {
      const data = await meterService.get();
      toast.dismiss("LOADING");
      return data;
    },
    retry: 3,
    ...options,
  });
};

export const useGetMeterById = (
  meterId: string,
  options?: UseQueryOptions<MeterDetailApiResponse, Error>
) => {
  return useQuery<MeterDetailApiResponse, Error>({
    queryKey: meterKeys.byId(meterId),
    queryFn: async () => {
      const res = await meterService.getById(meterId);
      return res;
    },
    enabled: !!meterId && meterId !== "undefined" && meterId !== "null",
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

export const useDeleteMeter = () => {
  return useMutation({
    mutationFn: meterService.delete,
    onSuccess: (data) => {
        if (data.status === "success") {
            toast.dismiss("LOADING");
            toast.success(data.message);
           
            queryClient.invalidateQueries({ queryKey: ["meters"] });
          }
          if (data.status === "error") {
            toast.dismiss("LOADING");
            toast.error(data.message);
          }
    },
        onError: (error) => {
            toast.dismiss("LOADING");
            toast.error(error.message)
        }
  });
};

export const useSetting = () => {
  return useMutation({
      mutationFn: meterService.createConfiguration,
      onSuccess: (data) => {
        toast.dismiss("LOADING");

        if (data.status === "success") {
          toast.success(data.message);
         
          queryClient.invalidateQueries({ queryKey: ["meters"] });
        }
        if (data.status === "error") {
          toast.dismiss("LOADING");
          toast.error(data.message);
        }
      }
  
    });

}