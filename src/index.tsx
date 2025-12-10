import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import "./styles/index.css";
import { AuthProvider } from './context/AuthProvider';
import { ContextProvider } from './context/ContextProvider';
import { toast } from 'react-toastify';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Only show toast for non-auth errors
      // if (query.queryKey[0] !== "auth") {
      //   toast.error(`Errords: ${error.message || "Something went wrong"}`);
      // }
    },
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
       // Don't retry on 4xx except 429
        if (error?.status >= 400 && error?.status < 500 && error?.status !== 429) {
          return false;
        }

        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,

      staleTime: 5 * 60 * 1000,         // 5 minutes
      gcTime: 30 * 60 * 1000,        // 30 minutes
    },
    mutations: {
      retry: 1,
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong");
      },
    },
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>

        <ContextProvider>
          <App />
        </ContextProvider>

      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);