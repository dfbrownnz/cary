// app/todos/TodosClient.tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos } from '../lib/todos' // lib\todos.ts
import { createTodoAction } from '../lib/todos-create'
import { useState } from "react";

import { TaskRecord } from '../lib/typeinterfaces'
import { getFormattedDateYYYMMDD } from "../lib/date";
import { get } from "http";
import TaskToDoForm from "./TaskToDoForm";
import TaskTable from "../components/ui/TaskTable";


export function TodosClient() {
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



  // from old working 
  const handleChangeTaskDetail = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    console.log('TodosClient.tsx  | handleChangeTaskDetail |', name, value)
    settask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  // from old working 
  const handleRowClick = (rowData: any) => {
    console.log('TodosClient.tsx  | handleRowClick |')
    settask(rowData)

  }

  // from old working 
  // const handleSubmit = ( e: React.FormEvent)=> {
  //   e.preventDefault();
  //   console.log( 'TodosClient.tsx  | handleSubmit |'  )
  //   mutation.mutate(task);
  // }

  const handleSubmit = (task: TaskRecord) => {
    console.log('TodosClient.tsx  | handleSubmit |')
    mutation.mutate(task);
  }

  const handleFormSubmit = (task: TaskRecord) => {
    console.log('TodosClient.tsx  | handleFormSubmit |')
    mutation.mutate(task);
  }


  // The simplified submission handler
  const handleAddTodo = (simpleTask: any) => {
    console.log('TodosClient.tsx  | simpleTask |', simpleTask)

    // 1. Create the full TaskRecord object with ID and date
    const newTaskRecord: TaskRecord = {
      taskid: Date.now(), // Use current timestamp for a unique ID
      title: simpleTask.title,
      description: simpleTask.description,
      statusflag: simpleTask.statusflag,
      statusdate: simpleTask.statusdate,
      group: simpleTask.group,
      applicationid: simpleTask.applicationid,
      applicationname: simpleTask.applicationname,
      projectid: simpleTask.projectid,
    };

    setnewTodo((prevRecords: any) => [...prevRecords, newTaskRecord]);

    // 4. Trigger the mutation with the newTodo object
    mutation.mutate(newTaskRecord);
    // mutation.mutate();

  };



  if (isPending) return <div>Loading...</div>;

  // 3. Define the callback function that TaskTable will call
  const handleTaskRowClick = (simpleTask: TaskRecord) => {
    console.log('Task Row Clicked:', simpleTask.taskid, simpleTask.title);

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

    // setnewTodo((prevRecords: any) => [...prevRecords, newTaskRecord]);
    // Example: Toggle the task's completion status
    // setTaskRecords(prevRecords => 
    //   prevRecords.map(task =>
    //     task.id === clickedTask.id
    //       ? { ...task, isCompleted: !task.isCompleted } // Toggle the status
    //       : task
    //   )
    // );

    // This is where you would usually trigger a mutation to save the change to the backend/GCS.
    // E.g., mutation.mutate({ ...clickedTask, isCompleted: !clickedTask.isCompleted });
  };

  // Define the component props
  // 1. Define the props interface to expect the function with the TaskRecord type
  interface TaskToDoFormLocalProps {
    taskRecordSelected: TaskRecord; // Assuming this is an array
    handleFormSubmit: (task: TaskRecord) => void; // ✅ Corrected Prop Type
  }
  //   handleChangeTaskDetail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSubmit: (task: TaskRecord) => void;
  const TaskToDoFormLocal: React.FC<TaskToDoFormLocalProps> = ({
    taskRecordSelected,
    handleFormSubmit
  }) => {

    type TaskRecordKey = keyof TaskRecord;
    /**
   * Returns the initial values for the form. If an existing task is provided, 
   * it maps the TaskRecord fields to the FormValues.
   * * @param existingTask The TaskRecord of the task being edited, or undefined/null for a new task.
   * @returns An object containing the initial values for the form inputs.
   */
    const getInitialValue = ( fieldName : any ): any => {
      // Check if an existing task object is available and valid
      if (taskRecordSelected  ) {
        const keys = Object.keys(taskRecordSelected)
        const key: TaskRecordKey =fieldName
        if (keys.includes(fieldName)) {
           const value = taskRecordSelected[ key ]
            return value ? String(value) : '';
        }
        else {
          console.log('no|' + fieldName + '|', keys)
           return  '';
        }
      }

      // If no existing task is provided (i.e., it's a new task), return empty defaults
      return ''
    };
    // Example state for form inputs
    // const [taskName, setTaskName] = useState(getInitialValue('title'));

    // State for each member of the TaskRecord
  const [taskId, setTaskId] = useState<number>(getInitialValue('taskid') as number);
  const [title, setTitle] = useState<string>(getInitialValue('title') as string);
  const [description, setDescription] = useState<string>(getInitialValue('description') as string);
  const [statusFlag, setStatusFlag] = useState<string>(getInitialValue('statusflag') as string);
  const [statusDate, setStatusDate] = useState<string>(getInitialValue('statusdate') as string);
  const [group, setGroup] = useState<string>(getInitialValue('group') as string);
  const [applicationId, setApplicationId] = useState<string>(getInitialValue('applicationid') as string);
  const [applicationName, setApplicationName] = useState<string>(getInitialValue('applicationname') as string);
  const [projectId, setProjectId] = useState<string>(getInitialValue('projectid') as string);
    
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
  {
    const { name, value } = event.target;
    console.log( '|handleChange|' , name , value )


    //    const newTaskRecord: TaskRecord = {
    //   taskid: simpleTask.taskid, // Use current timestamp for a unique ID
    //   title: simpleTask.title,
    //   description: simpleTask.description,
    //   statusflag: simpleTask.statusflag,
    //   statusdate: simpleTask.statusdate,

    //   group: simpleTask.group,
    //   applicationid: simpleTask.applicationid,
    //   applicationname: simpleTask.applicationname,
    //   projectid: simpleTask.projectid,
    // };
    // settask(newTaskRecord)

    settask(prevTask => ({
        ...prevTask, // Keep all other existing properties of the task
        [name]: value // Use the input's 'name' to set the correct state property
    }));
  }
    // 2. Define the internal onSubmit handler to process the event
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Stop the full page refresh

      // 3. Extract form data into the desired TaskRecord structure
      const newTask: TaskRecord = {
        "taskid": new Date().getTime(),
        "title": title,
        "description": "Test the updated read-modify-save logic.",
        "statusflag": "idk",
        "statusdate": "20251127",
        "group": "approval",
        "applicationid": "123-1",
        "applicationname": "Application 1",
        "projectid": "seq1"
      }

      // 4. Call the prop function with the structured data
      handleFormSubmit(newTask);

      // Optional: Reset the form
      // setTaskName('');
    };

    return (
      // 5. Use the internal onSubmit handler on the <form> element
      <div>
        {/* <pre>{JSON.stringify(task, null, 2)}</pre> */}

        <form onSubmit={onSubmit}>

          {/* <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New Task Name"
          /> */}

{/* taskid (Read-only/Hidden since it's generated by Date.now()) */}
  <div>
    <label htmlFor="taskid">Task ID:</label>
    <input
      type="number"
      id="taskid"
      name="taskid"
      value={taskId}
            onChange={handleChange}
       // Usually read-only for editing existing records
    />
  </div>

  {/* title (Text Input) */}
  <div>
    <label htmlFor="title">Title:</label>
    <input
      type="text"
      id="title"
      name="title"
      value={title}
      onChange={handleChange}
    />
  </div>

  {/* description (Textarea) */}
  <div>
    <label htmlFor="description">Description:</label>
    <textarea
      id="description"
      name="description"
      value={description}
      onChange={handleChange}
      rows={3}
    />
  </div>

  {/* statusflag (Text/Select Input - adjust type as needed) */}
  <div>
    <label htmlFor="statusflag">Status Flag:</label>
    <input
      type="text" // Or use a <select> for predefined statuses
      id="statusflag"
      name="statusflag"
      value={statusFlag}
      onChange={handleChange}
    />
  </div>

  {/* statusdate (Date Input, formatted YYYYMMDD) */}
  <div>
    <label htmlFor="statusdate">Status Date:</label>
    <input
      type="text" // Using 'text' if your format is YYYYMMDD, or 'date' if you need the picker
      id="statusdate"
      name="statusdate"
      value={statusDate}
      onChange={handleChange}
      placeholder="YYYYMMDD"
    />
  </div>

  {/* group (Text Input) */}
  <div>
    <label htmlFor="group">Group:</label>
    <input
      type="text"
      id="group"
      name="group"
      value={group}
      onChange={handleChange}
    />
  </div>

  {/* applicationid (Text Input) */}
  <div>
    <label htmlFor="applicationid">Application ID:</label>
    <input
      type="text"
      id="applicationid"
      name="applicationid"
      value={applicationId}
      onChange={handleChange}
    />
  </div>

  {/* applicationname (Text Input) */}
  <div>
    <label htmlFor="applicationname">Application Name:</label>
    <input
      type="text"
      id="applicationname"
      name="applicationname"
      value={applicationName}
      onChange={handleChange}
    />
  </div>

  {/* projectid (Text Input) */}
  <div>
    <label htmlFor="projectid">Project ID:</label>
    <input
      type="text"
      id="projectid"
      name="projectid"
      value={projectId}
      onChange={handleChange}
    />
  </div>
          <button type="submit">Save Task</button>
        </form>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">My Todos</h1>

      {/* <TaskForm onTaskSaved={fetchTasksDummy}  newTodo /> */}

      {/* <TaskToDoForm taskRecordSelected={selectedTask ?? []}  onTaskSubmit={handleAddTodo} /> */}
      {/* <TaskToDoForm taskRecordSelected={task ?? []}  handleChangeTaskDetail={handleChangeTaskDetail} handleSubmit={handleSubmit} /> */}

      <TaskToDoFormLocal taskRecordSelected={task ?? []} handleFormSubmit={handleSubmit} />
      {/* <pre>{JSON.stringify(task, null, 2)}</pre> */}

      {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}

      {/* We've added mt-8 (margin-top: 2rem or 32px)
               to push the table down away from the form.  tasks={todos ?? []}   
            */}

      <div className="mt-8">
        <TaskTable
          tasks={todos ?? []}          // Pass the data array
          onRowClick={handleTaskRowClick} // Pass the function handleChangeTaskDetail handleTaskRowClick
        />
      </div>

    </div>
  );
}
