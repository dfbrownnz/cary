// app/components/TopNavBar.tsx
import React from 'react';
import Link from 'next/link'; // <--- IMPORT THE LINK COMPONENT

export default function TopNavBar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 text-white z-10 p-4 shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold">App Logo</div>
        <ul className="flex space-x-6">
          {/* Change <a> to <Link> and use the 'href' prop */}
          <li>
            <Link href="/" className="hover:text-blue-200">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-200">About</Link>
          </li>
          <li>
            <Link href="/services" className="hover:text-blue-200">Services</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}