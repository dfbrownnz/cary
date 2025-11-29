// lib/data.ts
// This is a dummy data fetching function


'use server';

import { readRecordsFromGCS } from './gcs-read'

import { revalidatePath } from "next/cache";


import { saveRecordToGCS } from './gcs-save'
import { TaskRecord } from './typeinterfaces';

// import { Storage } from '@google-cloud/storage';

// // Define the TaskRecord interface here or import it from a shared file
// interface TaskRecord {
//   id: number;
//   title: string;
//   description: string;
//   isCompleted: boolean;
//   createdAt: Date;
// }

// const BUCKET_NAME: string = 'cary-tasks';
// const FILE_NAME: string = 'tasks.json';
// const storage = new Storage();


export const getProjectListArray = async () => {
  console.log("FETCHING TODOS ON SERVER - lib/todos.ts ");

  return readRecordsFromGCS()

//   return [
//     { id: 1, text: "Learn Server Components" },
//     { id: 2, text: "Use TanStack Query" },
//   ];
};

export const getTodos = async () => {
  console.log("FETCHING TODOS ON SERVER - lib/todos.ts ");

  return readRecordsFromGCS()

//   return [
//     { id: 1, text: "Learn Server Components" },
//     { id: 2, text: "Use TanStack Query" },
//   ];
};

/**
 * Downloads the tasks.json file, parses it, and returns the array of TaskRecords.
 * @returns {Promise<TaskRecord[]>} An array of task records.
 */
// export async function LOCALreadRecordsFromGCS(): Promise<TaskRecord[]> {
//   const bucket = storage.bucket(BUCKET_NAME);
//   const file = bucket.file(FILE_NAME);

//   try {
//     // Download the file content
//     const [content] = await file.download();
    
//     // Parse the JSON content
//     const existingJson = content.toString('utf8');
//     const tasksArray: TaskRecord[] = JSON.parse(existingJson);
    
//     return tasksArray;

//   } catch (error) {
//     const gcsError = error as { code?: number; message: string; name: string };
    
//     if (gcsError.code === 404) {
//       // If the file is not found, return an empty array gracefully
//       console.log(`${FILE_NAME} not found. Returning empty array.`);
//       return [];
//     }
    
//     // Re-throw other critical errors (billing, permission, network)
//     throw new Error(`GCS Read Error: ${gcsError.message}`);
//   }
// }


const saveTodo = async (TaskRecordLocal: TaskRecord) => {
  console.log("lib/ todos-create.ts SAVING TODO ON SERVER:", TaskRecordLocal.title );
  return saveRecordToGCS(TaskRecordLocal) 
  // return { id: Date.now(), title : TaskRecordLocal.title };
};

//export async function createTodoAction(formData: FormData) {
export async function createTodoAction(TaskRecordLocal: TaskRecord) {
    // let TaskRecordLocal : TaskRecord = { 
    //     id: Date.now()  ,
    //     title: '',
    //     description: '',
    //     isCompleted: false,
    //     createdAt: getFormattedDateYYYMMDD() ,
    // }
    console.log('todos-create.ts | createTodoAction|' + TaskRecordLocal.title + '|')
//  if (TaskRecordLocal.title?.includes('Append JSON to GCS') ) throw new Error("title is the default");

  //TaskRecordLocal.title = formData.get("todo") as string;
  // TaskRecordLocal.title = formData.title
  //TaskRecord
  // if (!TaskRecordLocal.title) throw new Error("Todo text is required");

  try {
    await saveTodo(TaskRecordLocal);
    revalidatePath("/todos");
    return { success: true };
  } catch {
    return { error: "Failed to create todo." };
  }
}