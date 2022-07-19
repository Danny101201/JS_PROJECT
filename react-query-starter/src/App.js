import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { RQSuperHeroe } from './components/RQSuperHeroe'
import { RQParallel } from './components/RQParallel'
import { DynamicParallel } from './components/DynamicParallel'
import { DependentQuery } from './components/DependentQuery'
import { PaginatedQuery } from './components/PaginatedQuery'
import { InfiniteQuery } from './components/InfiniteQuery'

import { QueryClient, QueryClientProvider, useQuery, QueryCache } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => toast.error(`Something went wrong: ${error.message}`),
    onSuccess: data => {
      return JSON.stringify(data)
    }
  })
})
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={2}
      />
      {/* Same as */}
      <ToastContainer />
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
              <li>
                <Link to='/RQParallel'>RQParallel</Link>
              </li>
              <li>
                <Link to='/DynamicParallel'>DynamicParallel</Link>
              </li>
              <li>
                <Link to='/DependentQuery'>DependentQuery</Link>
              </li>
              <li>
                <Link to='/PaginatedQuery'>PaginatedQuery</Link>
              </li>
              <li>
                <Link to='/InfiniteQuery'>InfiniteQuery</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path='/PaginatedQuery'>
              <PaginatedQuery />
            </Route>
            <Route path='/InfiniteQuery'>
              <InfiniteQuery />
            </Route>
            <Route path='/super-heroes'>
              <SuperHeroesPage />
            </Route>
            <Route path='/DependentQuery'>
              <DependentQuery email="vishwas@example.com" />
            </Route>
            <Route path='/DynamicParallel'>
              <DynamicParallel heroIds={[1, 3]} />
            </Route>
            <Route path='/RQParallel'>
              <RQParallel />
            </Route>
            <Route path='/rq-super-heroes/:id'>
              <RQSuperHeroe></RQSuperHeroe>
            </Route>
            <Route path='/rq-super-heroes'>
              <RQSuperHeroesPage />
            </Route>
            <Route exact path='/'>
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen="false" position="bottom-right"></ReactQueryDevtools>
    </QueryClientProvider>
  )
}

export default App
