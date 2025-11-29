// gcs/page.tsx

'use client';

import { useState, useTransition, useEffect } from 'react';
import { saveRecordToGCS } from '../lib/gcs-save' // '@/lib/gcs-save'; // Adjust import path if needed
import { readRecordsFromGCS } from '../lib/gcs-read'; // <-- Import the new read function

import { useQuery } from '@tanstack/react-query';
import { getFormattedDateYYYMMDD } from '../lib/date'

import { TaskRecord } from '../lib/typeinterfaces'

// Import Shadcn Table Components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableFooter,
    TableRow,
} from '../components/ui/table'; // Adjust path if needed

// Note: You should define TaskRecord in a shared types file (e.g., types/index.ts)
// interface TaskRecord {
//     id: number;
//     title: string;
//     description: string;
//     isCompleted: boolean;
//     createdAt: Date;
// }

//export default function GcsPage() {
function TaskForm({ onTaskSaved }: { onTaskSaved: () => void }) {
    // State for form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // State for managing pending status and feedback
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState('');

    const handleSaveTask = () => {
        // Logic to collect data and POST the new record
        console.log('Posting new record...');

        //   e.preventDefault();

        if (!title || !description) {
            setMessage('Title and Description are required.');
            return;
        }


        const newRecord: TaskRecord = {
            taskid: Date.now(), // Use current timestamp for a unique ID
            title: title,
            description: description,
            statusflag: ' gcs page ', // Default value
            statusdate: getFormattedDateYYYMMDD(),
            group: '',
            applicationid: '',
            applicationname: '',
            projectid: '',
        };

        // Start the server action within a transition
        startTransition(async () => {
            setMessage('Saving task...');
            try {
                await saveRecordToGCS(newRecord);
                setMessage('✅ Task successfully saved to GCS!');
                // Clear form fields on success
                setTitle('');
                setDescription('');
            } catch (error) {
                console.error('GCS Save Error:', error);
                setMessage(`❌ Error saving: ${(error as Error).message}`);
            }
        });
    };


    const handleSubmit = (e: React.FormEvent) => {

    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>

                {/* Title Input */}
                <div>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Task Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isPending}
                        required
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd' }}
                    />
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
                        disabled={isPending}
                        required
                        rows={4}
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd' }}
                    />
                </div>
                
                <button onClick={handleSaveTask} className={`p-2 rounded text-white ${isPending ? 'bg-gray-400' : 'bg-blue-900'}`}>
                    {isPending ? 'Saving to GCS...' : 'Save Task Record'}
                </button>


            </form>


            {message && (
                <p style={{
                    marginTop: '20px',
                    padding: '10px',
                    border: `1px solid ${message.startsWith('❌') ? 'red' : 'green'}`,
                    backgroundColor: message.startsWith('❌') ? '#fdd' : '#dfd'
                }}>
                    {message}
                </p>
            )}

        </div>
    )


};



// --- Main Page Component ---
export default function GcsPage() {
    const [tasks, setTasks] = useState<TaskRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Step 1: Define the function that fetches the data.
    // It must return a Promise that resolves to the data.
    // const fetchTasks = async () => {
    //     // might not be in the required app/api/tasks/route.ts structure).
    //     const response = await fetch('/api/tasks'); // Replace with your actual GCS API endpoint
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    // };

    // const {
    //     data: tasks, // The fetched data (your task records)
    //     isLoading,   // A boolean for when the fetch is running for the first time
    //     isError,     // A boolean if the fetch failed
    //     error,       // The error object if the fetch failed
    // } = useQuery({
    //     queryKey: ['gcsTasks'], // A unique key for this query's cache
    //     queryFn: fetchTasks,    // The function that performs the fetching
    // });

    // if (isLoading) {
    //     return <div>Loading tasks...</div>;
    // }

    // if (isError) {
    //     return <div>Error loading tasks: {error.message}</div>;
    // }

    const fetchTasks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const records = await readRecordsFromGCS();
            setTasks(records);
        } catch (e) {
            setError(`Failed to load tasks: ${(e as Error).message}`);
            setTasks([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        // <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
        <div className="container mx-auto **max-w-7xl** mb-8">
            <h1>Add New Task to GCS</h1>
            <TaskForm onTaskSaved={fetchTasks} />

            <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Task Records from GCS</h2>

            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

            {isLoading ? (
                <div>Loading tasks...</div>
            ) : tasks.length === 0 ? (
                <div>No tasks found in GCS bucket (tasks.json is empty or missing).</div>
            ) : (
                // --- SHADCN TABLE IMPLEMENTATION ---
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-center">Completed</TableHead>
                            <TableHead className="text-right">Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.taskid}>
                                <TableCell className="font-medium">{task.taskid}</TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description.substring(0, 50)}...</TableCell>
                                <TableCell className="text-center">
                                    {task.statusflag}
                                </TableCell>
                                <TableCell className="text-right">
                                    {/* {new Date(task.createdAt).toLocaleDateString()}
                                     */}
                                    {(task.statusdate)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell className="text-right">Stats</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            )}

            <section>

                <p className="text-gray-600">

                </p>
            </section>
        </div>
    );
}