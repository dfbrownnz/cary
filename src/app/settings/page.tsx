// app/settings/page.tsx
'use client'; 

import React, { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 

export default function SettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Read current URL parameters
  const currentQuarter = searchParams.get('listname') || '2025Q4';
  // 👇 NEW: Read the 'manager' parameter
  const currentManager = searchParams.get('manager') || 'Sarah'; 

  // Function to create and update the new search parameters AND redirect
  const updateUrlParams = useCallback(
    (name: string, value: string) => {
      // Get all current parameters
      const params = new URLSearchParams(searchParams.toString());
      
      // Set the new parameter
      params.set(name, value);
      
      // Navigate to the /services path with all updated parameters
      router.push(`/settings?${params.toString()}`);
    },
    [router, searchParams]
  );
  
  // Handler for the Quarter dropdown change
  const handleQuarterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrlParams('listname', event.target.value);
  };
  
  // 👇 NEW: Handler for the Project Manager dropdown change
  const handleManagerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrlParams('manager', event.target.value);
  };
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Application Settings</h1>
      <p className="text-gray-700 mb-6">
        Manage your user preferences and application configuration here.
      </p>

      {/* Quarter Select Dropdown (Existing) */}
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="quarter-select" className="font-semibold text-gray-800">
          Select Quarter:
        </label>
        <select 
          id="quarter-select" 
          name="quarter" 
          className="p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={currentQuarter} 
          onChange={handleQuarterChange}
        >
          <option value="2025Q4">2025Q4</option>
          <option value="2026Q1">2026Q1</option>
        </select>
      </div>

      {/* 👇 NEW: Project Manager Select Dropdown */}
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="manager-select" className="font-semibold text-gray-800">
          Project Manager:
        </label>
        <select 
          id="manager-select" 
          name="manager" 
          className="p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={currentManager} // Use the current 'manager' parameter
          onChange={handleManagerChange} // Use the new handler
        >
          <option value="Sarah">Sarah</option>
          <option value="David">David</option>
          <option value="Aisha">Aisha</option>
        </select>
      </div>
      {/* 👆 END NEW DROPDOWN */}
      
      <p className="mt-4 text-sm text-gray-500">
        Current 'listname' URL Parameter: **{currentQuarter}**<br/>
        Current 'manager' URL Parameter: **{currentManager}** (Selecting either dropdown will redirect to /services)
      </p>
    </div>
  );
}