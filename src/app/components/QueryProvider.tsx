// app/components/QueryProvider.tsx
'use client'; // This directive is required for client components

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { ReactNode } from 'react';

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
// import { useState } from "react";


// Create a client instance outside of the component to prevent re-renders
const queryClient = new QueryClient();

interface QueryProviderProps {
  children: ReactNode;
}

// export function Providers({ children }: { children: React.ReactNode }) {
//   const [queryClient] = useState(() => new QueryClient());

//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
//     </QueryClientProvider>
//   );
// }

export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools is optional, but very helpful */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}