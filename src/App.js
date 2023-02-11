import { useEffect, useState } from 'react'
import axios from 'axios'
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

const pageUrl =
  'https://api.coingecko.com/api/v3/simple/price?ids=gods-unchained&vs_currencies=USD&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=18'

function App() {
  const [price, setPrice] = useState(0)

  useEffect(() => {
    axios
      .get(pageUrl)
      .then((res) => setPrice(res.data['gods-unchained']['usd']))
      .catch((error) => {
        console.error('Algo ha petado fuertemente', error)
      })
  }, [])

  return (
    <div>
      <Nav price={parseFloat(price.toFixed(6))} />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
