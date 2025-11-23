// app/api/lists/route.ts (Server-side code)

// import prisma from '@/lib/db';
import prisma from '../../lib/db'
import { NextResponse } from 'next/server';

// Define the expected structure of a list item for type safety
interface ListRecord {
  list_id: number;
  list_name: string;
  list_value: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * Handles GET requests to /api/lists
 */
export async function GET() {
  try {
    // Prisma will connect, query the 'lists' table, and return the result.
    const records: ListRecord[] = await prisma.lists.findMany({
      // You can add filtering, sorting, or selecting specific fields here
      orderBy: {
        created_at: 'asc',
      },
      select: {
        list_id: true,
        list_name: true,
        list_value: true,
        created_at: true,
        updated_at: true,
      }
    });

    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { error: 'Failed to fetch data from the database.' },
      { status: 500 }
    );
  }
}