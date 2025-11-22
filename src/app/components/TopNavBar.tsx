// app/components/TopNavBar.tsx
'use client'; // <-- Must be a client component to use hooks

import React from 'react';
import Link from 'next/link';
// 👇 Import the hook to read URL parameters
import { useSearchParams } from 'next/navigation';

export default function TopNavBar() {
  // Read all search parameters from the URL
  const searchParams = useSearchParams();
  
  // Convert the parameters to a string to append to new links
  const paramsString = searchParams.toString(); 

  // Function to generate the full URL with existing parameters
  const generateHref = (path: string) => {
    // Check if we have any parameters to append
    if (paramsString) {
      return `${path}?${paramsString}`;
    }
    return path;
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 text-white z-10 p-4 shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold">App Logo</div>
        <ul className="flex space-x-6">
          {/* 👇 Use generateHref() for all links */}
          <li>
            <Link href={generateHref('/')} className="hover:text-blue-200">
              Home
            </Link>
          </li>
          <li>
            <Link href={generateHref('/about')} className="hover:text-blue-200">
              About
            </Link>
          </li>
          <li>
            <Link href={generateHref('/services')} className="hover:text-blue-200">
              Services
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}