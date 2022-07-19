import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Switch, Route, Link } from 'react-router-dom'
import Home from './Home/Home'
import PostDetalis from './PostDetalis/PostDetalis'
const queryClient = new QueryClient({
  defaultOptions:{
    refetchOnWindowFocus:true,
    refetchInterval:100
  }
})
function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
        <Switch>
          <Route path={"/:id"} exact component={Home} />
          <Route path={"/post/:id"} component={PostDetalis} />
        </Switch>
      </QueryClientProvider>
    </ChakraProvider>

  );
}

export default App;
