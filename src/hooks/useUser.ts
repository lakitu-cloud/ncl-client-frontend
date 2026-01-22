import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import { DashboardData, UserLoginPayload, UserRegistrationPayload } from "../types/userType"
import { userService } from "../services/userServices"
import { useApp } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { queryClient } from "..";


export const useZoneLogin = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (payload: UserLoginPayload) => await userService.login(payload),
        onSuccess: async (response) => {
            toast.dismiss('LOADING');

            const data = await response.json()

            if (data.status === "error") {
                toast.error(data.message);
            }

            if (data.status === "success") {
                toast.success(data.message as string);
                 Cookies.set("user", JSON.stringify(data.login), {
                    expires: 1, // 1 day
                    secure: true,
                    sameSite: "strict"
                });
                
                Cookies.set('auth', data.token, {
                    expires: 1 / 24,
                    secure: true,
                    sameSite: 'strict'

                });

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

export const useRegister = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (payload: UserRegistrationPayload) => userService.register(payload),
        onSuccess: async (response) => {
            toast.dismiss('LOADING');

            const data = await response.json()

            if (data.status === "error"){
                toast.error(data.message);
            }

            if (data.status === "success"){
                toast.success(data.message);
                 window.location.reload()
            }
            // Optional: save token if your backend returns one
            // localStorage.setItem('token', data.token);

           
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Something went wrong. Please try again.');
        },
    });
}

export const useRefreshToken = () => { }

export const useDash = () => {
    return useQuery<DashboardData, Error>({
        queryKey: ['zone_dashboard'],
        queryFn: async () => {
            const res = await userService.dashboard()
            return res.metrics
        },
        staleTime: 5 * 60 * 1000, // 5 minutes – metrics update async, no need super fresh
        refetchOnWindowFocus: false,
        retry: 2,
    })
}

export const useAvailableMeters = () => {
    return useQuery<string[], Error>({
        queryKey: ['availableMeters'],
        queryFn: async () => {
            const res = await userService.availableMeter()
            return res.meters
        },
        staleTime: 1000 * 60 * 5, // 5 minutes — fresh enough
        gcTime: 1000 * 60 * 30, // keep in memory 30 min

    });
}

export const useRefresh = () => {

  return useMutation({
    mutationFn: async () => {
      const res = await userService.refresh();
      return res;
    },
    onSuccess: (response) => {
      toast.dismiss("LOADING");

      if (response.status === "success") {
        toast.success(response.message || "Meters refreshed successfully!");

        // Invalidate relevant queries for instant UI update
        queryClient.invalidateQueries({ queryKey: ["meters"] });
        queryClient.invalidateQueries({ queryKey: ["availableMeters"] });
      } else {
        toast.error(response.message || "Failed to refresh meters");
      }
    },
    onError: (error: any) => {
      toast.dismiss("LOADING");
      toast.error(error?.message || "An error occurred while refreshing meters");
    },
  });
};

export const useChangeZonePassword = () => {
    return useMutation({
        mutationFn: async (payload: {
            identifier: string;       // email for zone manager
            currentPassword: string;
            newPassword: string;
        }) => {
            // Make sure userService.changePassword returns a Promise
            const response = await userService.changePassword(payload);
            return response;
        },

        onSuccess: () => {
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





