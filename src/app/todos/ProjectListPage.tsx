"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { ProjectListRecord } from '../lib/typeinterfaces'
import ProjectListTable from "../components/ui/ProjectListTable";
import { readProjectListFromGCS, saveProjectListToGCS } from '../lib/gcs-save-project'

export function ProjectListPage() {
    const queryClient = useQueryClient();
    const projectListRcdBlank: ProjectListRecord = {
        projectId: '',
        projectName: '',
        applicationId: '',
        ownerName: ''

    }
    const [projectListRcd, setprojectListRcd] = useState<ProjectListRecord>(projectListRcdBlank);

    const { data: projectlistArray, isPending } = useQuery({
        queryKey: ["projectlistArray"],
        queryFn: readProjectListFromGCS,
    });

    // The mutation object
    const mutation = useMutation({
        mutationFn: saveProjectListToGCS, // This function receives the object
        onSuccess: () => {
            // Optional: Invalidate queries to refresh the todo list
            queryClient.invalidateQueries({ queryKey: ['projectlistArray'] });
        },
    });

    const handleFormSubandMutate = (projectListRcd: ProjectListRecord) => {
        const projectListNew: ProjectListRecord = {

            //projectId: projectListRcd.projectId + '_' + new Date().getTime(),
            projectId: '_' + new Date().getTime(),
            projectName: projectListRcd.projectName,
            applicationId: projectListRcd.applicationId,
            ownerName: projectListRcd.ownerName

        };
        mutation.mutate(projectListNew); 
    }

    if (isPending) return <div>Loading...</div>;

    const handleTaskRowClick = (ProjectList: ProjectListRecord) => {
        setprojectListRcd(ProjectList);
    };


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold mb-6">Project Groups</h1>

            <p> if projectName found it is updated otherwise a record is added </p>
            <div className="mt-8">
                <ProjectListTable
                    projectlistArray={projectlistArray ?? []}          // Pass the data array
                    onRowClick={handleTaskRowClick} // Pass the function handleChangeTaskDetail handleTaskRowClick
                />
            </div>

            <ProjectListForm initialRecord={projectListRcd} onSave={handleFormSubandMutate} />
        </div>
    );
}

// Define the initial state (can be empty for a new record, or pre-filled for editing)
const initialProjectState: ProjectListRecord = {
    projectId: '',
    projectName: '',
    applicationId: '',
    ownerName: '',
};

interface ProjectListFormProps {
    // A function to call when the form is submitted successfully
    initialRecord: ProjectListRecord;
    onSave: (newRecord: ProjectListRecord) => void;
}

export const ProjectListForm: React.FC<ProjectListFormProps> = ({ initialRecord, onSave }) => {
    const [project, setProject] = useState<ProjectListRecord>(initialRecord);
    useEffect(() => {
        setProject(initialRecord);
    }, [initialRecord]);

    // Generic handler for input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProject(prevProject => ({
            ...prevProject,
            [name]: value,
        }));
    };

    // Handler for form submission
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Prevent default browser form submission

        // Simple validation check (e.g., all fields must be filled)
        if (!project.projectId || !project.projectName || !project.applicationId || !project.ownerName) {
            alert('Please fill out all fields.');
            return;
        }

        // Call the parent component's save function
        onSave(project);

        // Reset the form after successful submission
        setProject(initialProjectState);
    };

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // Creates two equally sized columns
            gap: '15px',                     // Space between grid items
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%' // Increased to make the form wider
        }}>
            <div className="form-row">
                {/* Project ID Field */}
                <label>
                    Project ID:
                    <input
                        type="text"
                        name="projectId"
                        value={project.projectId}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </label>

                {/* Application ID Field */}
                <label>
                    Application ID:
                    <input
                        type="text"
                        name="applicationId"
                        value={project.applicationId}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </label>


            </div>
            <div className="form-row">
                {/* Project Name Field */}
                <label>
                    Project Name:
                    <input
                        type="text"
                        name="projectName"
                        value={project.projectName}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </label>
                {/* Owner Name Field */}
                <label>
                    Owner Name:
                    <input
                        type="text"
                        name="ownerName"
                        value={project.ownerName}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                Save Project
            </button>
        </form>
    );
};
