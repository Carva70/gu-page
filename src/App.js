import Nav from './Nav'
import Fragment from './Fragment'
import Payback from './Payback'
import Search from './Search'

import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom'

const router = createHashRouter([
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
    path: '/builder',
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
