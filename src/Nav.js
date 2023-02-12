import Container from 'react-bootstrap/Container'
import BNav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'

const pageUrl =
  'https://api.coingecko.com/api/v3/simple/price?ids=gods-unchained&vs_currencies=USD&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=18'

export default function Nav() {
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
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>GU Calculator</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <BNav className='me-auto'>
              <BNav.Link href='/#/fragment'>Fragment Calculator</BNav.Link>
              <BNav.Link href='/#/payback'>Payback Calculator</BNav.Link>
              <BNav.Link href='/#/search'>Search Card</BNav.Link>
            </BNav>
            <BNav className='justify-content-end'>
              <BNav.Link className='justify-content-end' eventKey='disabled' disabled>
                GODS: <b>${price.toFixed(6)} </b>
              </BNav.Link>
            </BNav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
