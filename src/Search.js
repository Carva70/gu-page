import { useState, useEffect } from 'react'
import axios from 'axios'
import 'composited-card'
import { Card, InputGroup, Container, ListGroup } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import GUCardList from './GUCardList'
import Alert from 'react-bootstrap/Alert'

export default function Search() {
  const sizes = '(min-width: 600px) 160px, 320px'
  const qualities = ['Diamond', 'Gold', 'Shadow', 'Meteorite', 'Plain']
  const gods = ['all', 'neutral', 'light', 'death', 'nature', 'war', 'magic', 'deception']
  const tribes = ['all', 'nether', 'aether', 'atlantean', 'viking', 'olympian', 'anubian', 'amazon']
  const rarities = ['all', 'common', 'rare', 'epic', 'legendary', 'mythic']
  const types = ['creature', 'spell', 'weapon']
  const sets = {
    all: 'All',
    welcome: 'Welcome',
    core: 'Core',
    genesis: 'Genesis',
    trial: 'Trial of the Gods',
    order: 'Divine Order',
    mortal: 'Mortal Judgement',
    verdict: "Light's Verdict",
    wander: 'Winter Wanderlands',
    etherbots: 'Etherbots',
    promo: 'Promo',
    mythic: 'Mythic',
  }

  const [showAlert, setShowAlert] = useState(true)
  const [cardList, setCardList] = useState([])
  const [search, setSearch] = useState('')
  const [allCards, setAllCards] = useState([])
  const [quality, setQuality] = useState(0)
  const [god, setGod] = useState(0)
  const [set, setSet] = useState(0)
  const [rarity, setRarity] = useState(0)
  const [tribe, setTribe] = useState(0)
  const [mana, setMana] = useState(0)
  const [type, setType] = useState(0)

  const textFilter = (card) =>
    card.name.toLowerCase().includes(search.toLowerCase()) &&
    (god == 0 || god == 'all' || card.god == god) &&
    (set == 0 || set == 'all' || card.set == set) &&
    (rarity == 0 || rarity == 'all' || card.rarity == rarity) &&
    (tribe == 0 || tribe == 'all' || card.tribe['String'] == tribe) &&
    (type == 0 || type == 'all' || card.type == type) &&
    (mana == 0 || mana == 'all' || card.mana == mana || (mana == 10 && card.mana > 10))

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
    if (quality == 0) {
      return
    }
    copyList.push({ protoId: e.target.id, quality: quality, responsiveSrcsetSizes: sizes })
    setCardList(copyList)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Container>
            {showAlert && (
              <Alert variant='info' onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>Usage</Alert.Heading>
                <p>
                  Click on the list in the right to add a card, use the selection above to filter
                  the cards in the list
                </p>
              </Alert>
            )}
          </Container>

          <Form>
            <InputGroup className='my-3 mb-3 text-light'>
              <Form.Select
                style={{ borderColor: '#444' }}
                className='bg-dark text-light'
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                isInvalid={quality === 0}
              >
                <option disabled value={0}>
                  Quality
                </option>
                {qualities.map((e, i) => (
                  <option key={i} value={1 + i}>
                    {e}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                style={{ borderColor: '#444' }}
                className='bg-dark text-light'
                value={god}
                onChange={(e) => setGod(e.target.value)}
              >
                <option disabled value={0}>
                  God
                </option>
                {gods.map((e, i) => (
                  <option key={i} value={e}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </option>
                ))}
              </Form.Select>
              <Form.Label visuallyHidden>asdf</Form.Label>
              <Form.Select
                style={{ borderColor: '#444' }}
                className='bg-dark text-light'
                value={set}
                onChange={(e) => setSet(e.target.value)}
              >
                <option disabled value={0}>
                  Set
                </option>
                {Object.keys(sets).map((setItem, i) => (
                  <option key={i} value={setItem}>
                    {sets[setItem]}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                style={{ borderColor: '#444' }}
                className='bg-dark text-light'
                value={rarity}
                onChange={(e) => setRarity(e.target.value)}
              >
                <option disabled value={0}>
                  Rarity
                </option>
                {rarities.map((e, i) => (
                  <option key={i} value={e}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                style={{ borderColor: '#444' }}
                className='bg-dark text-light'
                value={tribe}
                onChange={(e) => setTribe(e.target.value)}
              >
                <option disabled value={0}>
                  Tribe
                </option>
                {tribes.map((e, i) => (
                  <option key={i} value={e}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <InputGroup className='my-3 mb-3 text-light'>
              <Form.Select
                style={{ borderColor: '#444' }}
                className='bg-dark text-light'
                value={mana}
                onChange={(e) => setMana(e.target.value)}
              >
                <option disabled key={11} value={0}>
                  Mana
                </option>
                <option key={0} value={'all'}>
                  All
                </option>
                {[...Array(9)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
                <option key={10} value={10}>
                  +10
                </option>
              </Form.Select>
              <Form.Select
                style={{ borderColor: '#444' }}
                className='bg-dark text-light'
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option disabled value={0}>
                  Type
                </option>
                <option key={4} value={'all'}>
                  All
                </option>
                {types.map((e, i) => (
                  <option key={i} value={e}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </option>
                ))}
              </Form.Select>
              <Form.Control
                style={{ borderColor: '#444' }}
                className='bg-dark text-light'
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search'
                value={search}
              ></Form.Control>
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
            style={{
              position: 'absolute',
              overflowY: 'scroll',
              height: '80%',
              width: '30%',
              minWidth: '150px',
              maxWidth: '300px',
            }}
          >
            {allCards
              .filter(textFilter)
              .slice(0, 30)
              .map((e, index) => (
                <ListGroup.Item
                  key={index}
                  className='bg-dark w-100'
                  action
                  id={e.id}
                  onClick={(e) => listClickHandler(e)}
                >
                  <Card id={e.id} style={{ borderWidth: '0px', backgroundColor: '#ccc' }}>
                    <Card.Body id={e.id}>
                      <Card.Title id={e.id}>{e.name}</Card.Title>
                      <Row md='1' xs='3' id={e.id}>
                        <Col style={{ width: '65px' }} id={e.id}>
                          {e.mana != '' ? (
                            <Card id={e.id} className='bg-warning' style={{ borderWidth: '0px' }}>
                              {' '}
                              ⚡️ {e.mana}
                            </Card>
                          ) : (
                            ''
                          )}
                        </Col>
                        <Col style={{ width: '65px' }} id={e.id}>
                          {e.attack.Valid ? (
                            <Card id={e.id} className='bg-danger' style={{ borderWidth: '0px' }}>
                              {' '}
                              ⚔ {e.attack.Int64}
                            </Card>
                          ) : (
                            ''
                          )}
                        </Col>
                        <Col style={{ width: '65px' }} id={e.id}>
                          {e.health.Valid ? (
                            <Card id={e.id} className='bg-success' style={{ borderWidth: '0px' }}>
                              {' '}
                              🛡️ {e.health.Int64}
                            </Card>
                          ) : (
                            ''
                          )}
                        </Col>
                      </Row>
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
