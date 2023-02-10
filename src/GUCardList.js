import React from 'react'
import 'composited-card';
import Container from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { Card, CardGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function GUCardList({ cardList }) {

    var displayList = []

    for (var i in cardList) {
        displayList.push(
            
            <Card key={i} bg="dark" style={{ "border-width": "0px" }}>
                <composited-card
                    protoId={cardList[i].protoId}
                    quality={cardList[i].quality}
                    responsiveSrcsetSizes={cardList[i].responsiveSrcsetSizes}
                ></composited-card>
            </Card>
        )
    }

    return (
        <Row xs={2} md={4} className="g-4">
            {displayList}
        </Row>
    )
}
