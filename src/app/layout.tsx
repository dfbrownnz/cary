// app/layout.tsx
import React, { ReactNode } from 'react';
import './globals.css'; 
import TopNavBar from './components/TopNavBar';
import LeftSideNavBar from './components/LeftSideNavBar'; 
import QueryProvider from './components/QueryProvider';

// 👇 1. Export Metadata Object
export const metadata = {
  title: 'Cary Todos',
  description: 'A simple Next.js application with fixed navigation.',
};

// Define the Props interface for the component
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // The <html> tag will use the title from the metadata object above
    <html lang="en">
      <body>
        <QueryProvider> 
          {/* 1. Top Navigation Bar */}
          <TopNavBar />

          {/* 2. Main Content Wrapper */}
          <div className="flex flex-1 min-h-screen">
            
            {/* 3. Left Side Navigation Bar */}
            <LeftSideNavBar /> 
            
            {/* Main Content Area */}
            <main className="flex-1 pt-16 pl-64 overflow-y-auto"> 
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}