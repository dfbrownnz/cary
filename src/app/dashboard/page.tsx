// app/dashboard/page.tsx
'use client'; 

import React, { useState } from 'react'; // <-- Import useState
import { useQuery } from '@tanstack/react-query';

// Define the TypeScript interface for the data structure
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Define constants for pagination
const TODOS_PER_PAGE = 10;
const TOTAL_PAGES = 20; // Since there are 200 todos (200 / 10 = 20)

// 2. Define the asynchronous fetch function that accepts the page number
const fetchTodos = async (page: number): Promise<Todo[]> => {
  // Calculate the offset for the API call (page parameter is 1-indexed)
  const limit = TODOS_PER_PAGE;
  const start = (page - 1) * TODOS_PER_PAGE;
  
  // Use _limit and _start (or _page) for pagination simulation
  // JSON Server often supports _start & _limit for range
  const url = `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`; 
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function DashboardPage() {
  // State to manage the current page number
  const [page, setPage] = useState(1);
  
  // 3. Use the useQuery hook, passing the 'page' state as a dependency
  const { data: todos, isLoading, error } = useQuery<Todo[]>({
    queryKey: ['todos', page], // <-- Crucial: TanStack Query refetches when 'page' changes
    queryFn: () => fetchTodos(page), // <-- Pass the current page to the fetcher
    placeholderData: (previousData) => previousData, // Keep previous data visible while fetching
  });

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setPage(newPage);
    }
  };

  // --- Loading and Error States ---
  if (isLoading && !todos) { // Use !todos here to handle the placeholder data scenario
    return <div className="p-8 text-xl text-blue-600">Loading To-Do list...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-600">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Failed to load data: {error.message}</p>
      </div>
    );
  }

  // --- Success State ---
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-green-700">To-Do List Dashboard (Page {page})</h1>
      <p className="mb-4">Items on this page: **{todos ? todos.length : 0}**</p>
      
      <div className="space-y-3 mb-6">
        {/* Map over the fetched data and display it */}
        {todos?.map((todo) => (
          <div 
            key={todo.id} 
            className={`p-4 rounded shadow-sm border ${
              todo.completed ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
            }`}
          >
            <p className="font-semibold">{todo.title}</p>
            <p className="text-sm text-gray-600">
              Status: **{todo.completed ? 'Completed' : 'Pending'}** (ID: {todo.id})
            </p>
          </div>
        ))}
      </div>
      
      {/* 5. Pagination Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center font-semibold">
          Page {page} of {TOTAL_PAGES}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === TOTAL_PAGES}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}