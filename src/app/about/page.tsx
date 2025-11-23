// app/about/page.tsx
import React, { Suspense } from 'react'; 
import AboutPageContent from './AboutPageContent';

export default function AboutPage() {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6 text-green-700">About Our Service</h1>
            
            {/* Wrap the component that uses useSearchParams() in Suspense.
              The fallback provides content while the client-side context loads.
            */}
            <Suspense fallback={<div className="text-lg text-gray-500">Loading dynamic context...</div>}>
                <AboutPageContent />
            </Suspense>
            
            <hr className="my-8" />
            
            <section>
                <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
                <p className="text-gray-600">
                    
something like this?
https://ui.shadcn.com/examples/tasks

the code can be found at:
https://github.com/shadcn-ui/ui/tree/main/apps/www/app/(app)/examples/tasks
                </p>
            </section>
        </div>
    );
}