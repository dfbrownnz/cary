// TaskTable.tsx
import React from 'react';
import { TaskRecord } from '@/app/lib/typeinterfaces';
// Assuming these are imported from your shadcn/ui setup
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './table';   //'@/components/ui/table'; // Adjust import path as necessary

// Define the TaskRecord interface again for clarity
// interface TaskRecord {
//   id: number;
//   title: string;
//   description: string;
//   isCompleted: boolean;
//   createdAt: string; // e.g., "YYYYMMDD"
// }

// Define the component props
interface TaskTableProps {
  tasks: TaskRecord[]; 
  onRowClick: (task: TaskRecord) => void; 
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onRowClick }) => {

  // Function to handle the row click and pass the object back
  const handleRowClick = (task: TaskRecord) => {
    onRowClick(task); 
  };

  if (!tasks || tasks.length === 0) {
    return <p className="text-muted-foreground">No task records found.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-center">Status Date </TableHead>
          <TableHead className="text-right">Status Flag</TableHead>
          <TableHead className="text-right"> Group </TableHead>
          <TableHead className="text-right"> Project </TableHead>
          <TableHead className="text-right"> Application Id </TableHead>
          <TableHead className="text-right"> Application Name  </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          // 🟢 Shadcn TableRow acts as the clickable element
          <TableRow 
            key={task.taskid} 
            onClick={() => handleRowClick(task)}
            // Add a class for visual feedback that the row is clickable
            className="cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <TableCell className="font-medium">{task.taskid}</TableCell> 
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell className="font-medium">{task.description}</TableCell>
            <TableCell className="text-center">{task.statusdate}</TableCell>
            <TableCell className="text-right">{task.statusflag }</TableCell>
            <TableCell className="text-right">{task.group }</TableCell>
            <TableCell className="text-right">{task.projectid }</TableCell>
            <TableCell className="text-right">{task.applicationid }</TableCell>
            <TableCell className="text-right">{task.applicationname }</TableCell>

              {/* {task.statusflag ? '✅' : '⏳'} */}
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;