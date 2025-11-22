// app/profile/page.tsx
'use client'; // <-- Must be a client component

import React from 'react';


export default function ProfilePage() {

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">User Profile</h1>
      <p className="text-gray-700 mb-6">
        View and edit your personal information.
      </p>

   
      
      <div className="mt-6 p-4 border rounded shadow-sm w-96">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </div>
    </div>
  );
}