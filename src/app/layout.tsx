// app/layout.tsx
import React, { ReactNode, Suspense } from 'react'; // <-- Import Suspense
import './globals.css'; 
import TopNavBar from './components/TopNavBar';
import LeftSideNavBar from './components/LeftSideNavBar'; 
import QueryProvider from './components/QueryProvider';

export const metadata = {
  title: 'Todos',
  description: 'A simple Next.js application with fixed navigation.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {/* Wrap everything that relies on useSearchParams() inside a Suspense boundary */}
        <Suspense fallback={<div>Loading Navigation...</div>}> 
          <QueryProvider> 
            {/* 1. Top Navigation Bar (uses useSearchParams() indirectly) */}
            <TopNavBar />

            {/* 2. Main Content Wrapper */}
            <div className="flex flex-1 min-h-screen">
              
              {/* 3. Left Side Navigation Bar (uses useSearchParams() directly) */}
              <LeftSideNavBar /> 
              
              {/* Main Content Area */}
              <main className="flex-1 pt-16 pl-64 overflow-y-auto"> 
                {children}
              </main>
            </div>
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}