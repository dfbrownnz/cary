import { QueryClient } from "@tanstack/react-query";
import { getTodos } from '../lib/todos'  // lib\todos.ts
import { TodosMain } from  './TodosMain'



export default async function TodosPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  
  return (
    
      <TodosMain />
      // <ProjectListPage />
    
  );
}