// app/profile/page.tsx
import React, { Suspense } from 'react';
import prisma from '../../../lib/db'  // '@/lib/db'; // Import Prisma client
import ProfileClientContent from './ProfileClientContent'; // Client component for interactive elements

// Define a type for the data you expect from the database
interface UserProfile {
  id: number;
  name: string;
  email: string;
}


// Function to fetch data (runs on the server)
async function fetchUserProfile(): Promise<UserProfile> {
    // This is placeholder data; replace with your actual Prisma query
    // Example query using a hardcoded ID for demonstration:
    const user = await prisma.user.findUnique({
        where: { id: 1 },
        select: { id: true, name: true, email: true }
    });
    
    // Fallback if user doesn't exist
    if (!user) {
        return { id: 0, name: 'Guest User', email: 'guest@example.com' };
    }
    
    // Ensure the returned structure matches the type
    return user as UserProfile;
}

export default async function ProfilePage() {
    // 1. Fetch data on the server
    const profileData = await fetchUserProfile();

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">User Profile</h1>
            
            {/* Display Server-fetched data */}
            <div className="mt-6 p-4 border rounded shadow-sm w-96 bg-gray-50">
                <p>Name: **{profileData.name}**</p>
                <p>Email: **{profileData.email}**</p>
            </div>
            
            {/* 2. Render the client component wrapped in Suspense */}
            <Suspense fallback={<p className="mt-4 text-sm text-gray-500">Loading context...</p>}>
                <ProfileClientContent />
            </Suspense>
        </div>
    );
}