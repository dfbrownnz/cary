// app/profile/page.tsx
'use client'; // <-- Must be a client component

import React from 'react';
import { useSearchParams } from 'next/navigation'; // <-- Import the hook

export default function ProfilePage() {
  const searchParams = useSearchParams();
  
  // Read the 'listname' parameter from the URL
  const listName = searchParams.get('listname'); 

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">User Profile</h1>
      <p className="text-gray-700 mb-6">
        View and edit your personal information.
      </p>

      {/* 👇 Display the listname value if it exists */}
      {listName && (
        <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="font-medium text-blue-800">
            Active List Context: **{listName}**
          </p>
        </div>
      )}
      
      <div className="mt-6 p-4 border rounded shadow-sm w-96">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </div>
    </div>
  );
}