// lib/gcs-read.ts

'use server';

import { Storage } from '@google-cloud/storage';

import { TaskRecord } from '../lib/typeinterfaces'
// Define the TaskRecord interface here or import it from a shared file
// interface TaskRecord {
//   id: number;
//   title: string;
//   description: string;
//   isCompleted: boolean;
//   createdAt: Date;
// }

const BUCKET_NAME: string = 'cary-tasks';
const FILE_NAME: string = 'tasks.json';
const storage = new Storage();

/**
 * Downloads the tasks.json file, parses it, and returns the array of TaskRecords.
 * @returns {Promise<TaskRecord[]>} An array of task records.
 */
export async function readRecordsFromGCS(): Promise<TaskRecord[]> {
  const bucket = storage.bucket(BUCKET_NAME);
  const file = bucket.file(FILE_NAME);

  try {
    // Download the file content
    const [content] = await file.download();
    
    // Parse the JSON content
    const existingJson = content.toString('utf8');
    const tasksArray: TaskRecord[] = JSON.parse(existingJson);
    
    return tasksArray;

  } catch (error) {
    const gcsError = error as { code?: number; message: string; name: string };
    
    if (gcsError.code === 404) {
      // If the file is not found, return an empty array gracefully
      console.log(`${FILE_NAME} not found. Returning empty array.`);
      return [];
    }
    
    // Re-throw other critical errors (billing, permission, network)
    throw new Error(`GCS Read Error: ${gcsError.message}`);
  }
}