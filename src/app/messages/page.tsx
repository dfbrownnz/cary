// app/messages/page.tsx
import React, { Suspense } from 'react';
import MessageTableContent from './MessageTableContent'; // Import the new component

export default function MessagesPage() {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6 text-purple-700">Messages Inbox</h1>
            
            {/* Wrap the client component in Suspense */}
            <Suspense fallback={<div className="text-lg text-gray-500">Loading inbox...</div>}>
                <MessageTableContent />
            </Suspense>
        </div>
    );
}