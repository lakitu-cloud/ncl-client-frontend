import { useMutation } from "@tanstack/react-query"
import { SalesLoginPayload, SalesRegistrationPayload } from "../types/sales.type"
import { salesService } from "../services/salesServices"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import { useApp } from "../context/ContextProvider"
import { useNavigate } from "react-router-dom";
import { queryClient } from ".."; 


export const useSalesLogin = () => {
    const { setMeters } = useApp();
        const navigate = useNavigate();


    const mutation = useMutation({
        mutationFn: async (payload: SalesLoginPayload) => await salesService.login(payload),
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
                Cookies.set('email', data.login.email)
                Cookies.set('auth', data.token, {
                    expires: 1 / 24,
                    secure: true,
                    sameSite: 'strict'

                }); // Save token to cookies
                setMeters(data.login.meters);

                queryClient.invalidateQueries({
                    queryKey: ['user']
                })

                navigate('/dashboard');
            }
        },

        onError: (error) => {
            toast.dismiss('LOADING');
            toast.error(error.message as string)
        },
        onMutate: (variables) => {
            toast.loading('Please wait', { toastId: 'LOADING'})
        }

    });

    return {
        ...mutation,
        isLoading: mutation.status === "pending"
    }
}

export const useRegister = () => {
    const mutation = useMutation({
        mutationFn: async(payload: SalesRegistrationPayload) => await salesService.register(payload), 
        onSuccess: async(response) => {
            console.log('Login successful:', response);
            toast.dismiss('LOADING');

            if(!response.ok){
                if(response.status === 401){
                    toast.error("Error: UnAuthorized Access")
                }
                if(response.status === 500){
                    toast.error("Error: Server Error")
                }
            }

            const data = await response.json()

            if(data.status === "error"){
                toast.dismiss('LOADING');
                toast.error(data.message as string);
            }

            if(data.status === "success") {
                toast.success(data.message as string);

                queryClient.invalidateQueries({
                    queryKey: ['user']
                })

            }
        },
        onError: (error) => {
            console.error('Login error:', error);
            toast.dismiss('LOADING');
            toast.error("Something went wrong");
        },
        onMutate: (variables) => {
            toast.loading('Please wait', { toastId: 'LOADING' });
        },
    });

    return {
        ...mutation,
        isLoading: mutation.status === 'pending',
    };
}
