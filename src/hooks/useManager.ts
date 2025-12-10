import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "..";
import { managerService } from "../services/managerServices";
import { CreateManagerPayload, Manager, ManagerLoginPayload, UpdateManagerPayload } from "../types/managerType";
import { managerKeys } from "../lib/queryKeys";
import { baseUrl } from "../config/urls";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface UpdateManagerVariables {
  id: string;
  data: UpdateManagerPayload;
}

export const useGetManagers = () => {
  return useQuery<Manager[], Error>({
    queryKey: managerKeys.all,
    queryFn: async () => {
      const res = await managerService.getAll();
      return res
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};

export const useManagerById = (id: string) => {
  return useQuery<Manager, Error>({
    queryKey: managerKeys.byId(id),
    queryFn: async () => {
      const res = await managerService.getById(id);
      return res
    },
    placeholderData: (keepPreviousData) => keepPreviousData,

  });
};

export const useCreateManager = () => {

  const mutation = useMutation({
    mutationFn: (payload: CreateManagerPayload) => managerService.create(payload),
    onSuccess: (response, variables) => {
      toast.dismiss("create-manager");
      if (response.status === "success") {
        toast.success("Manager created!");

        // Remove assigned meters from localStorage
        const currentMeters = JSON.parse(localStorage.getItem('meters') || '[]') as string[];
        const updatedMeters = currentMeters.filter(
          (serial: string) => !variables.meters.includes(serial)
        );
        localStorage.setItem('meters', JSON.stringify(updatedMeters));

        queryClient.invalidateQueries({ queryKey: managerKeys.all });
      } else {
        toast.error(response.message || "Failed");
      }
    },
    onMutate: (variable) => {
      toast.loading("Please wait...", { toastId: "LOADING" });
    },
    onError: (error: any) => {
      toast.dismiss("create-manager");
      const message = error?.response?.data?.message || error?.message || "Failed to create manager";
      toast.error(message);
    },
    onSettled: () => {
      toast.dismiss(" manager created! ")
    }
  });

  return mutation;
};

export const useDeleteManager = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await managerService.delete(id);
      return res
    },
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
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: managerKeys.all });

      const previous = queryClient.getQueryData<Manager[]>(managerKeys.all);

      queryClient.setQueryData<Manager[]>(managerKeys.all, (old = []) =>
        old.filter(m => m.id !== id)
      );

      return { previous }; // for rollback
    },
    onError: (error, context, id) => {
      toast.dismiss("LOADING");
      toast.error(error.message)
    }
  });
};

export const getManagerById = () => {
  return {}
}

export const useUpdateManager = () => {
  return useMutation({
    mutationFn: async ({ id, data }: UpdateManagerVariables) => {
      const res = await managerService.update(id, data)
      return res
    },
    onSuccess: (response, variables) => {
      toast.dismiss("create-manager");
      if (response.status === "success") {
        toast.success("Manager created!");

        // Remove assigned meters from localStorage

        // localStorage.setItem('meters', JSON.stringify());

        // Optimistically update the cache (optional, faster UX)

        queryClient.invalidateQueries({ queryKey: managerKeys.all });
      } else {
        toast.error(response.message || "Failed");
      }

      // Optimistically update the cache (optional, faster UX)
      // queryClient.setQueryData<Manager[]>(["managers"], (old = []) =>
      //   old.map((m) => (m.id === updatedManager.id ? updatedManager : m))
      // );

      toast.success(`Manager updated successfully`);
      // onSuccess?.(updatedManager);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update manager. Please try again.";

      toast.error(message);
      // onError?.(error);
    },
  });
};

export const useSalesLogin = () => {
  const navigate = useNavigate();


  const mutation = useMutation({
    mutationFn: async (payload: ManagerLoginPayload) => await managerService.login(payload),
    onSuccess: async (response) => {
      toast.dismiss('LOADING');

      if (response.status === "error") {
        toast.dismiss('LOADING');
        toast.error(response.message as string);
      }

      if (response.status === "success") {
        toast.success(response.message as string);
        Cookies.set('role', 'sales')
        Cookies.set('auth', response.token, {
          expires: 1 / 24,
          secure: true,
          sameSite: 'strict'

        }); // Save token to cookies

        queryClient.invalidateQueries({
          queryKey: ['user']
        })

        navigate('/manager/zone/dashboard');
      }
    },

    onError: (error) => {
      toast.dismiss('LOADING');
      toast.error(error.message as string)
    },
    onMutate: (variables) => {
      toast.loading('Please wait', { toastId: 'LOADING' })
    }

  });

  return {
    ...mutation,
    isLoading: mutation.status === "pending"
  }
}