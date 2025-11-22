// app/components/QueryProvider.tsx
'use client'; // This directive is required for client components

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { ReactNode } from 'react';

// Create a client instance outside of the component to prevent re-renders
const queryClient = new QueryClient();

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools is optional, but very helpful */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}