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

            if (!response.ok) {
                if (!response.ok) {
                    if (response.status === 401) {
                        toast.error("Error: UnAuthorized Access")
                    }
                    if (response.status === 500) {
                        toast.error("Error: Server Error")
                    }
                }
            }

            const data = await response.json()

            if (data.status === "error") {
                toast.dismiss('LOADING');
                toast.error(data.message as string);
            }

            if (data.status === "success") {
                toast.success(data.message as string);
                // Cookies.set('role', 'zone')
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
        onSuccess: (data) => {
            toast.success('Registration successful! Welcome!');
            // Optional: save token if your backend returns one
            // localStorage.setItem('token', data.token);

            setTimeout(() => {
                navigate('/auth');
            }, 1500);
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
    queryFn: async() => {
        const res = await userService.availableMeter()
        return res.meters
    },
    staleTime: 1000 * 60 * 5, // 5 minutes — fresh enough
    gcTime: 1000 * 60 * 30, // keep in memory 30 min

  });
}