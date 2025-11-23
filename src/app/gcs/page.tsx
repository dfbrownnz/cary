// gcs/page.tsx

'use client'; 

import { useState, useTransition } from 'react';
import { saveRecordToGCS } from '../lib/gcs-save' // '@/lib/gcs-save'; // Adjust import path if needed

// Note: You should define TaskRecord in a shared types file (e.g., types/index.ts)
interface TaskRecord {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
}

export default function GcsPage() {
    // State for form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    // State for managing pending status and feedback
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title || !description) {
            setMessage('Title and Description are required.');
            return;
        }

        const newRecord: TaskRecord = {
            id: Date.now(), // Unique ID generation
            title: title,
            description: description,
            isCompleted: false,
            createdAt: new Date(),
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

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Add New Task to GCS</h1>
            
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

                {/* Submission Button */}
                <button
                    type="submit"
                    disabled={isPending}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        backgroundColor: isPending ? '#ccc' : '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isPending ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isPending ? 'Saving to GCS...' : 'Save Task Record'}
                </button>
            </form>

            {/* Feedback Message */}
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
    );
}