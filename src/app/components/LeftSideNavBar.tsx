// app/components/LeftSideNavBar.tsx
'use client'; // <-- Must be a client component to use hooks

import React from 'react';
import Link from 'next/link'; 
// 👇 Import the hook to read URL parameters
import { useSearchParams } from 'next/navigation';

// Define the height to start below the header
const TOP_OFFSET_CLASS = 'top-16'; 

export default function LeftSideNavBar() {
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
    <aside className={`fixed ${TOP_OFFSET_CLASS} left-0 h-screen w-64 bg-gray-100 p-4 border-r border-gray-300 z-10 overflow-y-auto`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
      <nav>
        <ul className="space-y-2">
          
          {/* 👇 Use generateHref() for all links */}
          <li>
            <Link href={generateHref('/dashboard')} className="block p-2 rounded hover:bg-gray-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={generateHref('/settings')} className="block p-2 rounded hover:bg-gray-200">
              Settings
            </Link>
          </li>
          <li>
            <Link href={generateHref('/profile')} className="block p-2 rounded hover:bg-gray-200">
              Profile
            </Link>
          </li>
          <li>
            <Link href={generateHref('/messages')} className="block p-2 rounded hover:bg-gray-200">
              Messages (5)
            </Link>
          </li>
          <li>
            <Link href={generateHref('/gcs')} className="block p-2 rounded hover:bg-gray-200">
              gcs
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}