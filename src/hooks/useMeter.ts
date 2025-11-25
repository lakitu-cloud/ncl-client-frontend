import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  addMeter,
  addMultipleMeter,
  createConfiguration,
  deleteMeter,
  getMeters,
} from "../services/meterService";
import { AddMultipleMeterPayload } from "../types/meter.types";
import { toast } from "react-toastify";
import { queryClient } from "..";
import { useApp } from "../context/ContextProvider";

export const useGetMeter = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["meters"],
    queryFn: async () => {
      const data = await getMeters();
      toast.dismiss("LOADING");
      return data;
    },
    retry: 3,
    ...options,
  });
};

export const useCreateMeter = () => {
  const { setIsButtonPress, meters } = useApp();

  const mutation = useMutation({
    mutationFn: async (serial: string) => {
      const response = await addMeter(serial);

      if (response.status === "success") {
        toast.dismiss("LOADING");
        toast.success(`${response.message}`);

        queryClient.invalidateQueries({
          queryKey: ["meters"],
        });
        setIsButtonPress(false);
      }

      if (response.status === "error") {
        toast.dismiss("LOADING");
        toast.error(`${response.message}`);
      }
    },
    onMutate: (variable) => {
      toast.loading("Please wait", { toastId: "LOADING" });
    },
  });

  return mutation;
};

export const useAddMultipleMeter = () => {
  // const { setIsButtonPress, meters } = useApp();

  const mutation = useMutation({
    mutationFn: async (payload: AddMultipleMeterPayload) => await addMultipleMeter(payload),
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
  return {
    ...mutation,
    isLoading: mutation.isPending,
    data: mutation.data,
  };
};

export const useDeleteMeter = () => {
  return useMutation({
    mutationFn: deleteMeter,
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
      mutationFn: createConfiguration,
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