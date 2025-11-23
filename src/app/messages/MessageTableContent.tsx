// app/messages/MessageTableContent.tsx
'use client'; 

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// 1. Define the Data Structure (Interface)
interface Message {
  id: number;
  subject: string;
  sender: string;
  date: string;
  status: 'Read' | 'Unread' | 'Draft';
}

// 2. Sample Data for the Table
const defaultData: Message[] = [
  { id: 1, subject: 'Project Status Update', sender: 'David', date: '2025-11-20', status: 'Unread' },
  { id: 2, subject: 'Weekly Sync Agenda', sender: 'Sarah', date: '2025-11-19', status: 'Read' },
  { id: 3, subject: 'Review Q1 Budget', sender: 'Manager', date: '2025-11-22', status: 'Draft' },
];

// 3. Define the Column Helper
const columnHelper = createColumnHelper<Message>();

const columns = [
  columnHelper.accessor('subject', {
    header: () => <span>Subject</span>,
    cell: info => <span className="font-medium text-blue-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor('sender', {
    header: 'Sender',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: info => info.getValue(),
    sortingFn: 'datetime',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => (
      <span className={`px-2 py-1 text-xs font-semibold rounded ${
        info.getValue() === 'Unread' ? 'bg-red-100 text-red-800' : 
        info.getValue() === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 
        'bg-green-100 text-green-800'
      }`}>
        {info.getValue()}
      </span>
    ),
  }),
];


export default function MessageTableContent() {
  const searchParams = useSearchParams();
  const listName = searchParams.get('listname') || 'None';
  
  // Memoize data to prevent re-creation on every render
  const data = useMemo(() => defaultData, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Messages List (Context: {listName})</h2>
      
      {/* Table Structure */}
      <div className="overflow-x-auto border rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}