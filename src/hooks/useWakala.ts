// src/hooks/useWakalas.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify'; // Assuming you use react-toastify for notifications
import { WakalaCreatePayload, WakalaData } from '../types/wakalaType';
import { wakalaService } from '../services/wakalaServices';
import { queryClient } from '..';

export const useWakalas = () => {
  return useQuery<WakalaData[], Error>({
    queryKey: ['wakalas'],
    queryFn: async () => {
      const data = wakalaService.get()
      return data
    },
    staleTime: 5 * 60 * 1000,
    // cacheTime: 10 * 60 * 1000, 
    retry: 1,
  });
};

export const useCreateWakala = () => {
  return useMutation({
    mutationFn: async (payload: WakalaCreatePayload) => wakalaService.create(payload),
    onSuccess: () => {
      toast.dismiss("LOADING")
      queryClient.invalidateQueries({ queryKey: ['wakalas'] });
      toast.success('Wakala created successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create wakala: ${error.message}`);
    },
    onMutate: (variable) => {
      toast.loading('Please wait', { toastId: 'LOADING' });

    }
  });
};

export const useDeleteWakala = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await wakalaService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wakalas'] });
      toast.success('Wakala deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete wakala: ${error.message}`);
    },
  });
};

export const useAddFloatToWakala = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, float }: { id: string; float: number }) => wakalaService.addFloat(id, { float }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wakalas'] });
      toast.success('Float added successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to add float: ${error.message}`);
    },
  });
};