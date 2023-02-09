import React, { useState } from 'react';
import 'composited-card';
import { Container } from 'react-bootstrap';
import GUCardList from './GUCardList';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import { InputGroup } from 'react-bootstrap';


export default function Search() {
  var sizes = "(min-width: 600px) 160px, 320px"
  const [cardList, setCardList] = useState([])
  const [searchList, setSearchList] = useState([])
  const [search, setSearch] = useState("")
  const [allCards, setAllCards] = useState([])

  var pageurl = "https://api.godsunchained.com/v0/proto?perPage=10"
  var allCardsUrl = "https://api.godsunchained.com/v0/proto?perPage=1550"

  useEffect(() => {
    axios.get(pageurl)
      .then(res => {
        setCardList(res.data.records.map((e) => (
          {
            "protoId": e.id,
            "quality": 3,
            responsiveSrcsetSizes: sizes
          }
        )))
      })
  }, [pageurl])

  useEffect(() => {
    axios.get(allCardsUrl)
      .then(res => {
        setAllCards(res.data.records)
      })
  }, [pageurl])
  console.log(allCards)

  function deleteHandler() {
    var copyList = cardList.slice();
    copyList.pop();
    setCardList(copyList);
  }


  return (
    <Container>
      <Row>
        <Col xs={8}>
          <Button onClick={() => { deleteHandler() }}>Prueba</Button>
        </Col>
        <Col>
          <Form>
            <InputGroup className='my-3'>
              <Form.Control
                placeholder='Search'
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

        </Col>
      </Row>



    </Container>
  )
}
