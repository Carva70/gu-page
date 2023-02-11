import { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from './Nav'
import Fragment from './Fragment'
import Payback from './Payback'
import Search from './Search'

const pageUrl =
  'https://api.coingecko.com/api/v3/simple/price?ids=gods-unchained&vs_currencies=USD&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=18'

function App() {
  const [price, setPrice] = useState(0)
  const [page, setPage] = useState('fragment')

  const displayPage = { fragment: <Fragment />, payback: <Payback />, search: <Search /> }

  useEffect(() => {
    axios
      .get(pageUrl)
      .then((res) => setPrice(res.data['gods-unchained']['usd']))
      .catch((error) => {
        console.error('Algo ha petado fuertemente', error)
      })
  }, [])

  const handler = (name) => setPage(name)

  return (
    <div>
      <Nav price={parseFloat(price.toFixed(6))} onClickNavItem={handler} />
      <div>{displayPage[page]}</div>
    </div>
  )
}

export default App
