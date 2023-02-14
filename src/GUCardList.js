import 'composited-card'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'

export default function GUCardList({ cardList, doubleClickHandler }) {
  return (
    <Row xs={2} sm={2} xxl={4} xl={3} className='g-4'>
      {cardList.map((card, index) => (
        <Card
          key={index}
          bg='dark'
          style={{ borderWidth: '0px', cursor: 'no-drop' }}
          onClick={(e) => {
            if (e.detail == 2) {
              doubleClickHandler(e)
            }
          }}
        >
          <composited-card
            protoId={card.protoId}
            quality={card.quality}
            responsiveSrcsetSizes={card.responsiveSrcsetSizes}
            id={card.id}
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
      responsiveSrcsetSizes: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  doubleClickHandler: PropTypes.func.isRequired,
}
