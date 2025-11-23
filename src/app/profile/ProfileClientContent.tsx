// app/profile/ProfileClientContent.tsx
'use client'; 

import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function ProfileClientContent() {
  const searchParams = useSearchParams();
  const listName = searchParams.get('listname'); 
  const manager = searchParams.get('manager'); 

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-2">Context from URL</h2>
      
      {/* Display the listname value if it exists */}
      {(listName || manager) ? (
        <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
          {listName && (
            <p className="font-medium text-blue-800">
              Active List Context: **{listName}**
            </p>
          )}
          {manager && (
            <p className="font-medium text-blue-800">
              Assigned Manager: **{manager}**
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No context parameters found in URL.</p>
      )}
    </div>
  );
}