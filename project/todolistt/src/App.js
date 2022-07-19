import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ChakraProvider, Heading, Flex, Input, Button, useColorMode, useColorModeValue } from "@chakra-ui/react"

import Home from './components/Home'
import PostDetail from './components/PostDetail'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      // refetchInterval:1
    },
  },
})
function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('gray.100', 'gray.200')
  console.log(bgColor)
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route exact path="/:id">
              <Home></Home>
            </Route>
            <Route exact path="/post/:id">
              <PostDetail></PostDetail>
            </Route>
          </Switch>
        </Router>
        <ReactQueryDevtools position="bottom-right"></ReactQueryDevtools>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
