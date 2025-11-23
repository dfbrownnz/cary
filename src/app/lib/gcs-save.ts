'use server'; // <--- MANDATORY: This marks all exported functions as Server Actions

import { Storage } from '@google-cloud/storage';
 

export interface TaskRecord {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

const BUCKET_NAME: string = 'cary-tasks'; // cary-tasks
const FILE_NAME: string = 'tasks.json';
const storage = new Storage();

/**
 * Downloads the existing tasks.json file, appends a new record to the array, 
 * and uploads the updated array back to GCS.
 * * @param newRecord The new data object to be appended.
 */
export async function saveRecordToGCS(newRecord: TaskRecord): Promise<void> {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_NAME);

    let tasksArray: TaskRecord[] = [];

    try {
        // 1. ATTEMPT TO READ EXISTING FILE
        const [content] = await file.download();
        
        // ... success logic ...
        tasksArray = JSON.parse(content.toString());


    } catch (error) {
        // Use type assertion for GCS errors
        const gcsError = error as { code?: number; message: string; name: string };
        
        // --- CUSTOM ERROR CHECKING ---
        if (gcsError.code === 404) {
            // This is the error code for "Not Found"
            
            // Check if the bucket itself exists (optional, but adds precision)
            const exists = await bucket.exists();
            
            if (!exists[0]) {
                // Throw a specific error for the bucket
                throw new Error(`Bucket Not Found: Bucket '${BUCKET_NAME}' does not exist or is inaccessible.`);
            }
            
            // If the bucket exists, the file is simply missing (first run)
            console.log(`${FILE_NAME} not found. Initializing a new array.`);
            // DO NOT THROW HERE. Allow tasksArray to remain empty (or be initialized)
            // and proceed to append the new record.
            
        } else if (gcsError.message.includes('billing account') || gcsError.code === 403) {
            // --- CATCHING THE SPECIFIC BILLING/PERMISSION ISSUE ---
            throw new Error(`Permission Denied: Ensure billing is active and IAM role (Storage Object Admin) is granted.`);
            
        } else {
            // Re-throw any other critical errors (network, JSON parsing, etc.)
            throw new Error(`Fatal GCS Read Error: ${gcsError.message}`);
        }
    }

    // 2. MODIFY (APPEND) THE CONTENT
    tasksArray.push(newRecord);

    // 3. SAVE THE MODIFIED ARRAY BACK TO GCS
    const updatedJsonContent: string = JSON.stringify(tasksArray, null, 2);

    try {
        await file.save(updatedJsonContent, {
            contentType: 'application/json',
            // Setting a predefined public access control list
            predefinedAcl: 'bucketOwnerFullControl' 
        });

        console.log(`✅ New task appended and saved to gs://${BUCKET_NAME}/${FILE_NAME}. Total tasks: ${tasksArray.length}`);

    } catch (error) {
        const message = (error as Error).message;
        console.error(`❌ ERROR saving updated record to GCS: ${message}`);
        throw error;
    }
}

// --- Example Usage ---

const newTask: TaskRecord = {
    id: Date.now(), // Use timestamp for unique ID
    title: 'Append JSON to GCS',
    description: 'Test the updated read-modify-save logic.',
    isCompleted: false,
    createdAt: new Date(),
};

// Run the asynchronous function
saveRecordToGCS(newTask)
    .catch(err => console.error('Execution Failed:', err.message));
 