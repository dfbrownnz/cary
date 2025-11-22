// app/services/page.tsx
'use client'; // <-- Must be a client component

import React from 'react';
// 👇 Import the hook to read URL parameters
import { useSearchParams } from 'next/navigation'; 

export default function ServicesPageContent() {
  // Read all search parameters from the URL
  const searchParams = useSearchParams();
  
    // Read current URL parameters
  const currentQuarter = searchParams.get('listname') || 'No Quarter';
  // 👇 NEW: Read the 'manager' parameter
  const currentManager = searchParams.get('manager') || 'No Manager'; 

  // Convert parameters to a readable format (e.g., array of [key, value] pairs)
  const allParams = Array.from(searchParams.entries());

  // Optionally read a specific parameter, like 'listname' or 'serviceId'
  const serviceId = searchParams.get('serviceId') || 'none specified';

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4 text-purple-700">Our Core Services</h1>
      <p className="text-gray-700 mb-6">
        Explore the range of services we offer, all utilizing the same consistent application layout.
      </p>
      
      {/* 👇 Display the URL parameters here */}
      <div className="mb-6 p-4 border rounded bg-yellow-50">
        <h3 className="text-xl font-semibold mb-2">URL Parameters Found:</h3>
        {allParams.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 ml-4 text-gray-800">
            {allParams.map(([key, value]) => (
              <li key={key}>
                **{key}**: {value}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic">No URL parameters found.</p>
        )}
        <p className="mt-2 text-sm">
            Specific Parameter Example (serviceId): **{serviceId}**
        </p>
      </div>

      <ul className="space-y-4">
        <li className="p-4 border rounded shadow-md bg-white">
          <h3 className="text-xl font-semibold">Service 1: Data Analytics</h3>
          <p className="text-sm text-gray-600">Advanced tools for real-time data processing and reporting.</p>
        </li>
        <li className="p-4 border rounded shadow-md bg-white">
          <h3 className="text-xl font-semibold">Service 2: Cloud Infrastructure</h3>
          <p className="text-sm text-gray-600">Scalable and secure cloud deployment and management.</p>
        </li>
        <li className="p-4 border rounded shadow-md bg-white">
          <h3 className="text-xl font-semibold">Service 3: Custom Development</h3>
          <p className="text-sm text-gray-600">Tailor-made software solutions to meet your specific business needs.</p>
        </li>
      </ul>

         <p className="mt-4 text-sm text-gray-500">
        Current 'listname' URL Parameter: **{currentQuarter}**<br/>
        Current 'manager' URL Parameter: **{currentManager}** (Selecting either dropdown will redirect to /services)
      </p>
    </div>
  );
}