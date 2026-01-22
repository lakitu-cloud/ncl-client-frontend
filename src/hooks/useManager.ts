import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "..";
import { managerService } from "../services/managerServices";
import { CreateManagerPayload, Manager, ManagerLoginPayload, MetricsPayload, UpdateManagerPayload } from "../types/managerType";
import { managerKeys } from "../lib/queryKeys";
import { baseUrl } from "../config/urls";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
      return res.manager
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
        window.location.reload();
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
       toast.dismiss("LOADING");
      if (data.status === "success") {
        toast.success(data.message);

        queryClient.invalidateQueries({ queryKey: ["meters"] });
        queryClient.invalidateQueries({ queryKey: ["availableMeters"] });
        queryClient.invalidateQueries({ queryKey: ["managers"] });
      }
      if (data.status === "error") {
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
        toast.error("Wrong Credentials");
      }

      if (response.status === "success") {
        toast.success(response.message as string);
        Cookies.set('auth', response.token, {
          expires: 1 / 24,
          secure: true,
          sameSite: 'strict'

        }); 

        queryClient.invalidateQueries({
          queryKey: ['user']
        })

        navigate('/manager/sales/dashboard');
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


export const useChangeSalesPassword = () => {
    return useMutation({
        mutationFn: async (payload: {
            identifier: string;       // phone for sales manager
            currentPassword: string;
            newPassword: string;
        }) => {
            const response = await managerService.changePassword(payload);
            return response;
        },

        onSuccess: () => {
          window.location.reload()
            toast.success('Password changed successfully!', {
                position: 'top-right',
                autoClose: 4000,
            });
      
        },

        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Failed to update password. Please check your current password.';

            toast.error(message, {
                position: 'top-right',
                autoClose: 5000,
            });
        },

        retry: 1,
    });
};

export const useDash = () => {
  return useQuery<MetricsPayload, Error>({
    queryKey: ['sales_dashboard'],
    queryFn: async () => {
      const res = await managerService.dashboard();
      return res.metrics
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
       refetchOnWindowFocus: false,
  });
};

type DownloadState = 'idle' | 'loading' | 'success' | 'error';

export const useDownloadManagerReport = () => {
  const [state, setState] = useState<DownloadState>('idle');

  const downloadReport = async (managerId: string, managerName?: string) => {
    if (state === 'loading') return;
     toast.loading("LOADING...!")


    setState('loading');
    const toastId = toast.loading(`Generating report for ${managerName || 'manager'}...`);

    try {
      const response = await fetch(`${baseUrl}/report/${managerId}/download`, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
          "Authorization": `Bearer ${Cookies.get('auth')}`
        },
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`Failed to generate report: ${response.status} - ${errorText}`);
      }

      // const response = await managerService.download(managerId)

      if(!response.ok){
        toast.error("Failed to connect to the server")
      }

      const blob = await response.blob();


      const url = window.URL.createObjectURL(blob);

      // Create invisible link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${managerId}-report.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setState('success');
      // toast.update(toastId, {
      //   render: `Report downloaded successfully`,
      //   type: 'success',
      //   isLoading: false,
      //   autoClose: 4000,
      // });
      toast.success("Report downloaded successfully!")
    } catch (err: any) {
      console.error('Report download failed:', err);
      setState('error');
      toast.update(toastId, {
        render: err.message || 'Failed to download report',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      // Reset state after short delay (UX improvement)
      setTimeout(() => setState('idle'), 1200);
    }
  };


  return {
    downloadReport,
    isLoading: state === 'loading',
    isSuccess: state === 'success',
    isError: state === 'error',
  };
}

