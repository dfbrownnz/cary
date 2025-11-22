// app/messages/page.tsx
import React from 'react';

export default function MessagesPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Messages Inbox</h1>
      <p className="text-gray-700">
        You have 5 unread messages.
      </p>
      <ul className="mt-6 space-y-3">
        <li className="p-3 bg-yellow-100 border-l-4 border-yellow-500">New Feature Announcement</li>
        <li className="p-3 bg-gray-50 border-l-4 border-gray-300">Project Update - Q4</li>
      </ul>
    </div>
  );
}