'use server'; // <--- MANDATORY: This marks all exported functions as Server Actions

import { Storage } from '@google-cloud/storage';

import { ProjectListRecord } from './typeinterfaces';

// Define the ProjectListRecord interface here or import it from a shared file}

const BUCKET_NAME: string = 'cary-tasks'; // cary-tasks
const FILE_NAME: string = 'project_profile.json';

const storage = new Storage();

/**
 * Downloads the existing tasks.json file, appends a new record to the array, 
 * and uploads the updated array back to GCS.
 * * @param newRecord The new data object to be appended.
 */
export async function saveProjectListToGCS(newRecord: ProjectListRecord): Promise<void> {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_NAME);

    let tasksArray: ProjectListRecord[] = [];

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
            const exists = await bucket.exists();
            if (!exists[0]) {
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
    const projectNameExists = tasksArray.find((project) => project.projectName === newRecord.projectName);
    // 1. Find the index of the object with the matching projectId
    const indexToReplace = tasksArray.findIndex(item => item.projectName === newRecord.projectName);

    // 2. Check if an item was found (index will be -1 if not found)
    if (indexToReplace !== -1) {
        // 3. Replace the object at that index with newRecord
        tasksArray[indexToReplace] = newRecord;
        console.log(`Successfully replaced item at index ${indexToReplace}.`);
    } else {
        console.log(`No item found with projectId: ${ newRecord.projectName}`);
         tasksArray.push(newRecord);
    }
   

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


/**
 * Downloads the tasks.json file, parses it, and returns the array of ProjectListRecords.
 * @returns {Promise<ProjectListRecord[]>} An array of task records.
 */
export async function readProjectListFromGCS(): Promise<ProjectListRecord[]> {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_NAME);

    try {
        // Download the file content
        const [content] = await file.download();

        // Parse the JSON content
        const existingJson = content.toString('utf8');
        const tasksArray: ProjectListRecord[] = JSON.parse(existingJson);

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

// --- Example Usage ---

// const newTask: ProjectListRecord = {
//     id: Date.now(), // Use timestamp for unique ID
//     title: 'Append JSON to GCS',
//     description: 'Test the updated read-modify-save logic.',
//     isCompleted: false,
//     createdAt: getFormattedDateYYYMMDD() ,
// };

// Run the asynchronous function
// saveRecordToGCS(newTask)
//     .catch(err => console.error('Execution Failed:', err.message));
