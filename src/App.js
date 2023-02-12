import Nav from './Nav'
import Fragment from './Fragment'
import Payback from './Payback'
import Search from './Search'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/fragment' />,
  },
  {
    path: '/fragment',
    element: <Fragment />,
  },
  {
    path: '/payback',
    element: <Payback />,
  },
  {
    path: '/search',
    element: <Search />,
  },
])

function App() {
  return (
    <div>
      <Nav />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
