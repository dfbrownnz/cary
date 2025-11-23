// app/about/AboutPageContent.tsx
'use client'; 

import React from 'react';
import { useSearchParams } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../components/ui/table"  // "@/components/ui/table"

export default function AboutPageContent() {
  const searchParams = useSearchParams();
  const listName = searchParams.get('listname') || 'No List Context';
  const manager = searchParams.get('manager') || 'Not Assigned';

  
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Application Context</h2>
      
      <p className="mb-2">This application is designed to manage tasks and context across multiple projects.</p>
      
      <div className="mt-4 p-4 border rounded bg-blue-50">
        <p className="text-sm font-medium text-blue-800">
          Current Active List: **{listName}**
        </p>
        <p className="text-sm font-medium text-blue-800">
          Active Manager: **{manager}**
        </p>
      </div>
      
      <p className="mt-4 text-sm text-gray-600">
        This information is dynamically read from the URL parameters using the <span className="font-mono">useSearchParams()</span> hook.
      </p>

     <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  );
}