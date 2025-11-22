// app/dashboard/page.tsx
import React, { Suspense } from 'react'; // <-- Import Suspense

// Import the component containing the useSearchParams() hook logic
import DashboardPageContent from './DashboardPageContent'; 
// NOTE: You'll need to rename your existing default export and place it in a new file named DashboardPageContent.tsx

export default function DashboardPage() {
    return (
        // 1. Wrap the client component in Suspense
        <Suspense fallback={<div className="p-8">Loading current list context...</div>}>
            <DashboardPageContent />
        </Suspense>
    );
}