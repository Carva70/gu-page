import { Table, Container, Form, Alert } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
const pageUrl =
  'https://api.coingecko.com/api/v3/simple/price?ids=gods-unchained&vs_currencies=USD&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=18'

export default function Payback() {
  const tableHeadings = [
    'USD',
    'GODS',
    'Efficient (3W/day)',
    'Average (5W/day)',
    'Perfect (10W/day)',
  ]
  const coefficients = [
    [0.0024, 0.0032, 0.0052],
    [0.0143, 0.019, 0.0309],
    [0.0736, 0.0981, 0.1594],
  ]
  const cardQuality = ['Shadow', 'Gold', 'Diamond']
  const [cardPriceUSD, setCardPriceUSD] = useState([0.27, 1.65, 8.5])
  const [showAlert, setShowAlert] = useState(true)
  const [price, setPrice] = useState(0)
  const cardPrice = cardPriceUSD.map((e) => e / price)

  useEffect(() => {
    axios
      .get(pageUrl)
      .then((res) => setPrice(res.data['gods-unchained']['usd']))
      .catch((error) => {
        console.error('Algo ha petado fuertemente', error)
      })
  }, [])

  return (
    <Container className='mt-4'>
      {showAlert && (
        <Alert variant='info' onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Note</Alert.Heading>
          <p>
            This page calculates the estimated time it takes for a player to earn back the cost of a
            specific card given the USD price.
          </p>
        </Alert>
      )}
      <Table responsive bordered hover variant='dark'>
        <thead>
          <tr>
            <th></th>
            {tableHeadings.map((e, i) => (
              <th key={i}>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 3 }).map((_, i) => (
            <tr key={i}>
              <td key={1}>{cardQuality[i]}</td>
              <td key={2}>
                <Form.Control
                  type='number'
                  size='sm'
                  className='bg-dark text-light'
                  style={{ color: 'white', border: '0px' }}
                  value={cardPriceUSD[i]}
                  onChange={(e) => {
                    let copyPriceUSD = cardPriceUSD.slice()
                    copyPriceUSD[i] = parseFloat(e.target.value)
                    setCardPriceUSD(copyPriceUSD)
                  }}
                ></Form.Control>
              </td>
              <td key={3}>{cardPrice[i].toFixed(2)}</td>
              {Array.from({ length: 3 }).map((_, j) => (
                <td key={4 + j}>{(cardPrice[i] / coefficients[i][j]).toFixed(3)} days</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
