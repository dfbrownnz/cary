import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { TaskRecord } from '../lib/typeinterfaces'

// Use a union type if this handler is used for both input and textarea
type InputEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

// Define the component props
interface TaskFormProps {
  // 🟢 NEW: Optional prop to pass the selected task for editing
  taskRecordSelected?: TaskRecord;
  handleChangeTaskDetail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (task: TaskRecord) => void;
}
// Define the shape of our error state onTaskSubmit
interface FormErrors {
  title?: string;
  description?: string;
}

// const TaskToDoForm: React.FC<TaskFormProps> = ({ onTaskSubmit }) => {

const TaskToDoForm: React.FC<TaskFormProps> = ({
  taskRecordSelected,
  handleChangeTaskDetail,
  handleSubmit
}) => {
  // Use a helper function that can handle the different case conventions (ID vs taskid)
  // ... your component logic
  const getInitialValue = (field: string): string => {
    // Safely access the property or default to an empty string
    if (taskRecordSelected) {
      const keys = Object.keys(taskRecordSelected)
      if (keys.includes(field)) {
        console.log('yes ', field, keys)
        if (field === 'title') {
          const value = taskRecordSelected.title;
          // setTitle( value )
        }
      }
      else {
        console.log('no|' + field + '|', keys)
      }
      console.log('|taskRecordSelected|', taskRecordSelected, typeof (taskRecordSelected))
      // Use bracket notation to safely access properties if names are inconsistent
      const value = taskRecordSelected[field as keyof TaskRecord];

      console.log('getInitialValue|field|', field, value)

      return value ? String(value) : '';
    }
    return '';
  }

  const [task, setTask] = useState<TaskRecord>({
    taskid: Date.now(),
    title: '',
    description: '',
    statusflag: '',
    statusdate: '',
    group: '',
    applicationid: '',
    applicationname: '',
    projectid: '',
  });

  // Existing state fields
  const [title, setTitle] = useState(getInitialValue('title'));
  const [description, setDescription] = useState(getInitialValue('description'));

  // 🟢 NEW state fields for Group, Project ID, Application ID, and Application Name
  const [group, setGroup] = useState('');
  const [projectId, setProjectId] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [applicationName, setApplicationName] = useState('');

  const [statusflag, setStatusflag] = useState('');
  const [statusdate, setStatusdate] = useState('');


  const [errors, setErrors] = useState<FormErrors>({});



  // 1. Define an INTERMEDIATE handler for the native <form> element
  const handleFormSubmitLocal = (e: FormEvent) => {
    e.preventDefault();

    // 2. Prepare the TaskRecord object from your component's state/inputs
    // (Assuming you have logic to combine the inputs into the final object)
    //   const { name , value } = e.target;
    // setTask((prevTask) => ({
    //   ...prevTask,
    //   [name]: value,
    // }));

    // 3. Call the parent prop (handleSubmit) with the compiled data
    handleSubmit(task);
  };

  return (
    <div>


      <form onSubmit={handleFormSubmitLocal}>
        <h3>Add New Task to GCS</h3>

        {/* --- Task Title & Description (Existing Fields) --- */}
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Task Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            // onChange={(e) => setTitle(e.target.value)}
            onChange={handleChangeTaskDetail}

            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd' }}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
        </div>
        {/* Description Input */}
        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // onChange={handleChangeTaskDetail}
            // disabled={isPending}
            required
            rows={4}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd' }}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
        </div>

        {/* -------------------- 🟢 NEW INPUT FIELDS -------------------- */}

        {/* Group Input */}
        <div>
          {/* <label htmlFor="group">Group</label> */}
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Group
          </label>
          <input
            id="group"
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
        </div>

        {/* Project ID Input */}
        <div>
          <label htmlFor="projectId">Project ID</label>
          <input
            id="projectId"
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div>

        {/* Application ID Input */}
        <div>
          <label htmlFor="applicationId">Application ID</label>
          <input
            id="applicationId"
            type="text"
            value={applicationId}
            onChange={(e) => setApplicationId(e.target.value)}
          />
        </div>

        {/* Application Name Input */}
        <div>
          <label htmlFor="applicationName">Application Name</label>
          <input
            id="applicationName"
            type="text"
            value={applicationName}
            onChange={(e) => setApplicationName(e.target.value)}
          />
        </div>

        {/* Application Name Input */}
        <div>
          <label htmlFor="applicationName">Status Flag</label>
          <input
            id="Statusflag"
            type="text"
            value={statusflag}
            onChange={(e) => setStatusflag(e.target.value)}
          />
        </div>

        {/* Application Name Input */}
        <div>
          <label htmlFor="applicationName">Status Date</label>
          <input
            id="Statusdate"
            type="text"
            value={statusdate}
            onChange={(e) => setStatusdate(e.target.value)}
          />
        </div>


        {/* ---------------------------------------------------------------- */}

        {/* Submit Button */}
        {/* <button type="submit">[Save Task Record]</button> */}
        <button onClick={handleFormSubmitLocal} className="bg-blue-700 hover:bg-blue-800  text-white py-2 rounded px-4">
          Save Task Record
        </button>


        <pre>title|{JSON.stringify(title)}|</pre>
        <pre>{JSON.stringify(taskRecordSelected)}</pre>
      </form>
    </div>

  );
};


//};

export default TaskToDoForm;