import { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Container, Card, CardGroup } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

const pageUrl = 'https://api.godsunchained.com/v0/'

export default function Stats() {
  const [userId, setuserId] = useState()
  const [userRank, setUserRank] = useState()
  const [userProp, setuserProp] = useState()
  const [gameModeList, setGameModeList] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    if (userId != '' && userId != undefined) {
      axios
        .get(pageUrl + 'rank?user_id=' + userId)
        .then((res) => {
          setUserRank(res.data.records)
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          setUserRank()
          console.error('Algo ha petado fuertemente', error)
        })
    }
  }, [userId])

  useEffect(() => {
    setLoading(true)
    if (userId == '') {
      return
    }
    axios
      .get(pageUrl + 'properties?user_id=' + userId)
      .then((res) => {
        setuserProp(res.data.records)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setuserProp()
        console.error('Algo ha petado fuertemente', error)
      })
  }, [userId])

  useEffect(() => {
    axios
      .get(pageUrl + 'mode')
      .then((res) => setGameModeList(res.data))
      .catch((error) => {
        setuserProp()
        console.error('Algo ha petado fuertemente', error)
      })
  }, [userId])

  return (
    <Container className='mt-3 mb-3'>
      <Form.Control
        onChange={(e) => setuserId(e.target.value)}
        type='number'
        className='mt-3 mb-3'
      ></Form.Control>
      {userId != '' && userId != undefined ? (
        <>
          <Card className='mt-3 mb-3'>
            {loading ? (
              <Spinner animation='border' role='status'></Spinner>
            ) : (
              <>
                {userProp && userRank ? (
                  <>
                    <Card.Header>
                      <Card.Title>Name: {userProp[0].username}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        Level: {userProp[0].xp_level}{' '}
                        <small className='text-muted'>
                          (XP to next Level: {userProp[0].xp_to_next})
                        </small>
                      </Card.Text>
                      <Card.Text>XP: {userProp[0].total_xp}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Text>Won Matches: {userProp[0].won_matches}</Card.Text>
                      <Card.Text>Lost Matches: {userProp[0].total_xp}</Card.Text>
                    </Card.Footer>
                  </>
                ) : (
                  'not found'
                )}
              </>
            )}
          </Card>
          {userProp && userRank && !loading ? (
            <CardGroup>
              {userRank.map((e, i) => (
                <Card key={i}>
                  <Card.Header>
                    <Card.Title>
                      {gameModeList.filter((gm) => gm.id == e.game_mode)[0].name}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Text>Rating</Card.Text>
                      </Col>
                      <Col>
                        <Card.Text>{e.rating}</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Card.Text>Level</Card.Text>
                      </Col>
                      <Col>
                        <Card.Text>{e.rank_level}</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Card.Text>W Points</Card.Text>
                      </Col>
                      <Col>
                        <Card.Text>{e.win_points}</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Card.Text>L Points</Card.Text>
                      </Col>
                      <Col>
                        <Card.Text>{e.loss_points}</Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
          ) : (
            ''
          )}
        </>
      ) : (
        <div className='text-light'>Enter an ID</div>
      )}
    </Container>
  )
}
