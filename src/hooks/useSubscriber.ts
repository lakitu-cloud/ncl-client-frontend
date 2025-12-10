import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { toast } from "react-toastify";
import { queryClient } from "..";
import { useApp } from "../context/ContextProvider";
import { subscriberService } from "../services/subServices";
import { SubscriberCreatePayload, SubscriberUpdatePayload } from "../types/subscriberTypes";

export const useGetSubs = (options?: UseQueryOptions) => {
    return useQuery({
        queryKey: ['subscriber'],
        queryFn: async () => {
           const data = await subscriberService.get()
            toast.dismiss("LOADING");
            return data;
        },
        retry: 3,
        ...options,
    });

}



export const useAddSubs = () => {
      const { setIsButtonPress, meters } = useApp();
    
    const mutation = useMutation({
        mutationFn: async (payload: SubscriberCreatePayload) => subscriberService.create(payload),
        onSuccess: () => {
            toast.dismiss("LOADING")
            // toast.success(data.message as string);
            queryClient.invalidateQueries({
                queryKey: ['subscriber']
            })
            setIsButtonPress(false)
        },
        onError(error) {
            toast.dismiss("LOADING")
            toast.error(error.message as string);
            
        },
        onMutate: (variable) => {
            toast.loading('Please wait', { toastId: 'LOADING' });

        }
    })

    return {
        ...mutation,
    }
}

export const useDeleteSubs = () => {
    const mutation = useMutation({
        mutationFn: async(id: string) => subscriberService.delete(id),
        onSuccess: (data) => {
            toast.dismiss("LOADING")

            window.location.reload();

            queryClient.invalidateQueries({
                queryKey: ['subscriber']
            })
        },
        onError: (error) => {
            toast.dismiss("LOADING")
            toast.success(error.message as string);

            queryClient.invalidateQueries({
                queryKey: ['subscriber']
            })
        },
        onMutate(variables) {
            toast.loading('Please wait', { toastId: 'LOADING' });
        },
        
    })

    return {
        ...mutation
    }
}


export const useAssignSub = () => {
    const mutation = useMutation({
        mutationFn: async (variables: { id: string; serial: string }) =>  subscriberService.assign(variables.id, variables.serial),
        onSuccess: (data) => {
            toast.dismiss("LOADING")

            if (data.status === "success"){
                toast.success("Updated")
                queryClient.invalidateQueries({
                    queryKey: ['subscriber']
                })
            }

            if (data.status === "error"){
                toast.error("Error")
            }
            
        },
        onError: (error) => {
            toast.dismiss("LOADING")
            toast.error(error.message as string);

            queryClient.invalidateQueries({
                queryKey: ['subscriber']
            })
        },

        onMutate: (variable) => {
            toast.loading('Please wait', { toastId: 'LOADING' });
        }
    })

    return {
        ...mutation
    }
}

export const useUpdateSub = () => {
    const mutation = useMutation({
        mutationFn: async (payload: SubscriberUpdatePayload) => subscriberService.update(payload),
        onSuccess: () => {
            toast.dismiss("LOADING")

            queryClient.invalidateQueries({
                queryKey: ['subscriber']
            })
        },
        onError: (error) => {
            toast.dismiss("LOADING")
            toast.success(error.message as string);

            queryClient.invalidateQueries({
                queryKey: ['subscriber']
            })
        },

        onMutate: (variable) => {
            toast.loading('Please wait', { toastId: 'LOADING' });
        }
    })

    return {
        ...mutation
    }
}