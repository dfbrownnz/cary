// app/todos/page.tsx
import { QueryClient } from "@tanstack/react-query";
// import { getTodos } from '../app/lib/todos'
import { getTodos } from '../lib/todos'  // lib\todos.ts
// import { TodosClient } from  './TodosClient'
import { TodosMain } from  './TodosMain'
// import {ProjectListPage} from './ProjectList'
// import { ReadableStreamDefaultController } from "stream/web";
import {ProjectListPage} from "./ProjectListPage";



export default async function TodosPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  
  return (
    
      // <TodosMain />
      <ProjectListPage />
    
  );
}