// TaskTable.tsx
import React from 'react';
import { ProjectListRecord } from '@/app/lib/typeinterfaces';
// Assuming these are imported from your shadcn/ui setup
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './table';   //'@/components/ui/table'; // Adjust import path as necessary

interface TaskTableProps {
  projectlistArray: ProjectListRecord[]; 
  onRowClick: (projectList: ProjectListRecord) => void; 
}

const ProjectListTable: React.FC<TaskTableProps> = ({ projectlistArray, onRowClick }) => {

  // Function to handle the row click and pass the object back
  const handleRowClick = (projectList: ProjectListRecord) => {
    onRowClick(projectList); 
  };

  if (!projectlistArray || projectlistArray.length === 0) {
    return <p className="text-muted-foreground">No task records found.</p>;
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-200 text-black font-bold">
          <TableHead className="w-[100px]">Project Id</TableHead>
          <TableHead>Project Name</TableHead>
          <TableHead className="text-center">Application Id</TableHead>
          <TableHead className="text-right">Application Name</TableHead>
          <TableHead className="text-right">Project Lead</TableHead>
          <TableHead className="text-right">Onboaridng Quarter</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {projectlistArray.map((projectList) => (
          // 🟢 Shadcn TableRow acts as the clickable element
          <TableRow 
            key={projectList.projectId} 
            onClick={() => handleRowClick(projectList)}
            // Add a class for visual feedback that the row is clickable
            // className="cursor-pointer hover:bg-muted/50 transition-colors"
            className="cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <TableCell className="font-medium">{projectList.projectId}</TableCell> 
            <TableCell className="font-medium">{projectList.projectName}</TableCell> 
            <TableCell className="font-medium text-center">{projectList.applicationId}</TableCell> 
            <TableCell className="font-medium text-right">{projectList.applicationName}</TableCell> 
            <TableCell className="font-medium text-right">{projectList.projectLead}</TableCell> 
            <TableCell className="font-medium text-right">{projectList.onboardingQuarter}</TableCell>   
        

              
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export default ProjectListTable;
