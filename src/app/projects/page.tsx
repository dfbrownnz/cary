// app/todos/page.tsx
import { QueryClient } from "@tanstack/react-query";
import {ProjectListPage} from "./ProjectListPage";
import { readProjectListFromGCS } from '../lib/gcs-save-project'

export default async function TodosPage() {
  
    const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["projectlistArray"],
    queryFn: readProjectListFromGCS,
  });

  
  return (
    
      // <TodosMain />
      <ProjectListPage />
    
  );
}