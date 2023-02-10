import { useState, useEffect } from 'react'
import axios from 'axios'
import 'composited-card'
import { Card, InputGroup, Container, ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import GUCardList from './GUCardList'

export default function Search() {
  var sizes = '(min-width: 600px) 160px, 320px'
  const [cardList, setCardList] = useState([])
  const [search, setSearch] = useState('')
  const [allCards, setAllCards] = useState([])
  const [quality, setQuality] = useState(5)

  var pageUrl = 'https://api.godsunchained.com/v0/proto?perPage=10'
  var allCardsUrl = 'https://api.godsunchained.com/v0/proto?perPage=1550'

  useEffect(() => {
    axios.get(allCardsUrl).then((res) => {
      setAllCards(res.data.records)
    })
  }, [allCardsUrl, pageUrl])

  // eslint-disable-next-line no-unused-vars
  function deleteHandler() {
    var copyList = cardList.slice()
    copyList.pop()
    setCardList(copyList)
  }

  function listClickHandler(e) {
    var copyList = cardList.slice()
    copyList.push({ protoId: e.target.id, quality: quality, responsiveSrcsetSizes: sizes })
    setCardList(copyList)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <InputGroup className='my-3 mb-3 text-light'>
              <Form.Control
                style={{ borderColor: '#444' }}
                className='bg-dark text-light'
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search'
                value={search}
              ></Form.Control>
              <Form.Select
                style={{ borderColor: '#444' }}
                className='bg-dark text-light'
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
              >
                {['Diamond', 'Gold', 'Shadow', 'Meteorite', 'Plain'].map((e, i) => (
                  <option key={i} value={1 + i}>
                    {e}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <GUCardList cardList={cardList} />
        </Col>
        <Col>
          <ListGroup
            variant='dark'
            style={{ position: 'absolute', overflowY: 'scroll', height: '100%' }}
            className='w-25'
          >
            {allCards
              .filter((e) => {
                return e.name.toLowerCase().includes(search.toLowerCase())
              })
              .map((e, index) => (
                <ListGroup.Item
                  key={index}
                  className='bg-dark w-100'
                  action
                  id={e.id}
                  onClick={(e) => listClickHandler(e)}
                >
                  <Card id={e.id} style={{ 'border-width': '0px', 'background-color': '#ccc' }}>
                    <Card.Body id={e.id}>
                      <Card.Title id={e.id}>{e.name}</Card.Title>
                      {e.attack.Valid ? (
                        <Button id={e.id} variant='danger'>
                          {' '}
                          ⚔ {e.attack.Int64}
                        </Button>
                      ) : (
                        ''
                      )}
                      {e.health.Valid ? (
                        <Button id={e.id} variant='success'>
                          {' '}
                          🛡️ {e.health.Int64}
                        </Button>
                      ) : (
                        ''
                      )}
                      {e.mana != '' ? (
                        <Button id={e.id} variant='warning'>
                          {' '}
                          ⚡️ {e.mana}
                        </Button>
                      ) : (
                        ''
                      )}
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}
