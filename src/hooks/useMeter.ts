import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { meterService } from "../services/meterService";
import { Meter, MeterPayload, MeterDetailApiResponse } from "../types/meterTypes";
import { toast } from "react-toastify";
import { queryClient } from "..";
import { meterKeys } from "../lib/queryKeys";
import { useMemo } from "react";

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

type MeterResponse = {
  status: string;
  meters: MeterPayload[];
};

export const useGetMeter = (
  options?: UseQueryOptions<Meter[], Error>
) => {
  return useQuery<Meter[], Error>({
    queryKey: ['meters'],
    queryFn: async () => {
      const data = await meterService.get();
      toast.dismiss('LOADING');
      return data.meters;
    },
    retry: 3,
    staleTime: 5 * 60 * 1000, // Optional: cache for 5 mins
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

// Assign meter
export const useAssignMeterToSubscriber = () => {
  return useMutation({
    mutationFn: ({ meterId, subscriberId }: { meterId: string; subscriberId: string }) =>
      meterService.assign(meterId, subscriberId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meter', variables.meterId] });
      queryClient.invalidateQueries({ queryKey: ['meters'] });
    },
  });
};

// Unassign
export const useUnassignMeter = () => {
  return useMutation({
    mutationFn: ({ meterId }: { meterId: string }) =>
      meterService.unassign(meterId),
    onSuccess: (_, { meterId }) => {
      queryClient.invalidateQueries({ queryKey: ['meter', meterId] });
      queryClient.invalidateQueries({ queryKey: ['meters'] });
    },
  });
};

export const useAvailableMeters = (search: string = '', enabled: boolean = true) => {
  return useQuery<{ id: string, serial: string }[], Error>({
    queryKey: ['available-meters', search],
    queryFn: () => meterService.getAvailable(search),
    enabled: enabled && search.length >= 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useMeterStats = () => {
  const { data: meters = [], isLoading, isError, error } = useGetAllMeter();

  const stats = useMemo(() => {
    if (isLoading || !meters.length) {
      return {
        total: 0,
        token: 0,
        card: 0,
        inactive: 0,
      };
    }

    let token = 0;
    let card = 0;
    let inactive = 0;

    meters.forEach((meter: Meter) => {
      const type = meter.type?.toLowerCase();
      const status = meter.status?.toLowerCase();

      if (type === 'token') token++;
      if (type === 'card') card++;
      if (status === 'inactive' || status === 'locked') inactive++;
    });

    return {
      total: meters.length,
      token,
      card,
      inactive,
    };
  }, [meters, isLoading]);

  return { stats, isLoading, isError, error, meters };
};