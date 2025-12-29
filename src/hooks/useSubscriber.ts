import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { toast } from "react-toastify";
import { queryClient } from "..";
import { useApp } from "../context/ContextProvider";
import { subscriberService } from "../services/subServices";
import { useDebounce } from 'use-debounce'; 
import { SubscriberCreatePayload, SubscriberPayload, SubscriberUpdatePayload } from "../types/subscriberTypes";
import { useMemo } from "react";

export const useGetSubs = ( options?: UseQueryOptions< SubscriberPayload[], Error, SubscriberPayload[], ['subscriber'] >) => {
  return useQuery({
    queryKey: ['subscriber'],
    queryFn: async () => {
      const response = await subscriberService.get();
      
      if (response.subscribers) {
        return response.subscribers;
      }
      throw new Error(response.message || 'Failed to fetch subscribers');
    },
    retry: 3,
    staleTime: 5 * 60 * 1000, 
    ...options,
  });
};

export const useGetSubsById = (subscriberId: string) => {
    
    return useQuery({
        queryKey: ['subscriber'],
        queryFn: async () => {
            const data = await subscriberService.getById(subscriberId as string)
            return data
        }
    })
}

export const useAddSubs = () => {
    const mutation = useMutation({
        mutationFn: async (payload: SubscriberCreatePayload) => subscriberService.create(payload),
        onSuccess: () => {
            toast.dismiss("LOADING")
            // toast.success(data.message as string);
            queryClient.invalidateQueries({
                queryKey: ['subscriber']
            })
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


// // Search subscribers
export const useSearchSubscribers = (query: string) => {
  const debouncedQuery = useDebounce(query, 300)[0];
  return useQuery<SubscriberPayload[]>({
    queryKey: ['subscribers', 'search', debouncedQuery],
    queryFn: () => subscriberService.search(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
  });
};

export const useSubscriberStats = () => {
  const { data: subscriber = [], isLoading, isError, error } = useGetSubs();

  const stats = useMemo(() => {
    if (isLoading || !subscriber.length) {
      return {
        total: 0,
        token: 0,
        active: 0,
        inactive: 0,
      };
    }

    let active = 0;
    let token = 0;
    let inactive = 0;

    subscriber.forEach((subscriber: SubscriberPayload) => {
      const type = subscriber.type?.toLowerCase();
      const status = subscriber.status?.toLowerCase();

      if (type === 'token') token++;
      if (type === 'active') active++;
      if (status === 'inactive' || status === 'locked') inactive++;
    });

    return {
      total: subscriber.length,
      active,
      token,
      inactive,
    };
  }, [subscriber, isLoading]);

  return { stats, isLoading, isError, error, subscriber };
};

