// app/todos/actions.ts
"use server";

import { revalidatePath } from "next/cache";


import { saveRecordToGCS } from './gcs-save'
import { TaskRecord } from './typeinterfaces';

import { getFormattedDateYYYMMDD } from "./date";


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

// const formattedTimestamp = getFormattedDate(); 
// Example output: "202511271342"
