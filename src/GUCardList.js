import 'composited-card'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'

export default function GUCardList({ cardList }) {
  return (
    <Row xs={2} md={4} className='g-4'>
      {cardList.map((card, index) => (
        <Card key={index} bg='dark' style={{ 'border-width': '0px' }}>
          <composited-card
            protoId={card.protoId}
            quality={card.quality}
            responsiveSrcsetSizes={card.responsiveSrcsetSizes}
          ></composited-card>
        </Card>
      ))}
    </Row>
  )
}

GUCardList.propTypes = {
  cardList: PropTypes.arrayOf(
    PropTypes.shape({
      protoId: PropTypes.string.isRequired,
      quality: PropTypes.number.isRequired,
      responsiveSrcsetSizes: PropTypes.number.isRequired,
    }),
  ).isRequired,
}
