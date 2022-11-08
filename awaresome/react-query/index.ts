import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

// await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: fetchPosts })
