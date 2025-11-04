import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache:new QueryCache({
    onError: (error) => {
        console.error("Query error:", error);
     }
   }),
   mutationCache:new MutationCache({
      onError: (error, variables, context) => {
        console.error("Mutation error:", error, { variables, context });
      },
   }),
  defaultOptions: {
    queries: {
        staleTime:10 * 60 * 1000,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        refetchOnReconnect:false
      },
       mutations: {
        
     
      },
    },
   
});
export default queryClient;
