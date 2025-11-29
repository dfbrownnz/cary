// app/todos/TodosClient.tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos , createTodoAction } from '../lib/todos' // lib\todos.ts
// import { createTodoAction } from '../lib/todos-create'
import { useState } from "react";

import { TaskRecord } from '../lib/typeinterfaces'
import { getFormattedDateYYYMMDD } from "../lib/date";
import { get } from "http";
import TaskToDoForm from "./TaskToDoForm";
import TaskTable from "../components/ui/TaskTable";


export function TodosMain() {
    const queryClient = useQueryClient();
    const [newTodo, setnewTodo] = useState<TaskRecord[]>([]);

    const [taskRecords, setTaskRecords] = useState<TaskRecord[]>(/* ... data ... */);
    const [selectedTask, setSelectedTask] = useState<TaskRecord | undefined>(undefined);
    const [task, settask] = useState<TaskRecord>({
        taskid: Date.now(),
        title: '',
        description: '',
        statusflag: '',
        statusdate: getFormattedDateYYYMMDD(),
        group: '',
        applicationid: '',
        applicationname: '',
        projectid: '',
    });

    const { data: todos, isPending } = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
    });

    // The mutation object
    const mutation = useMutation({
        mutationFn: createTodoAction, // This function receives the object
        onSuccess: () => {
            // Optional: Invalidate queries to refresh the todo list
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });


  // The simplified submission handler
  const handleAddTodo = ( ) => {
    console.log('TodosClient.tsx  | simpleTask |', task)

    // 1. Create the full TaskRecord object with ID and date
    const newTaskRecord: TaskRecord = {
      taskid: Date.now(), // Use current timestamp for a unique ID
      title: task.title + '-new' ,
      description: task.description,
      statusflag: task.statusflag,
      statusdate: task.statusdate,
      group: task.group,
      applicationid: task.applicationid,
      applicationname: task.applicationname,
      projectid: task.projectid,
    };

    // setnewTodo((prevRecords: any) => [...prevRecords, newTaskRecord]);
    console.log('handleAddTodo|newTodo|' , newTaskRecord )

    // 4. Trigger the mutation with the newTodo object
     mutation.mutate(newTaskRecord);
    // mutation.mutate();

  };
    if (isPending) return <div>Loading...</div>;

    const handleTaskRowClick = (simpleTask: TaskRecord) => {
        setSelectedTask(simpleTask);

        const newTaskRecord: TaskRecord = {
            taskid: simpleTask.taskid, // Use current timestamp for a unique ID
            title: simpleTask.title,
            description: simpleTask.description,
            statusflag: simpleTask.statusflag,
            statusdate: simpleTask.statusdate,
            group: simpleTask.group,
            applicationid: simpleTask.applicationid,
            applicationname: simpleTask.applicationname,
            projectid: simpleTask.projectid,
        };
        settask(newTaskRecord)
    };


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold mb-6">My Todos</h1>

            {/* <TaskToDoFormLocal taskRecordSelected={task ?? []} handleFormSubmit={handleSubmit} /> */}
            <pre>{JSON.stringify(task, null, 2)}</pre>
   
               <button onClick={handleAddTodo} className="bg-blue-700 hover:bg-blue-800  text-white py-2 rounded px-4">
          Save Task Record
        </button>
            <div className="mt-8">
                <TaskTable
                    tasks={todos ?? []}          // Pass the data array
                    onRowClick={handleTaskRowClick} // Pass the function handleChangeTaskDetail handleTaskRowClick
                />
            </div>

        </div>
    );
}
