import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import BNav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Nav({ price, onClickNavItem }) {
  return (
    <div>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>GU Calculator</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <BNav className='me-auto'>
              <BNav.Link onClick={() => onClickNavItem('fragment')}>Fragment Calculator</BNav.Link>
              <BNav.Link onClick={() => onClickNavItem('payback')}>Payback Calculator</BNav.Link>
              <BNav.Link onClick={() => onClickNavItem('search')}>Search Card</BNav.Link>
            </BNav>
            <BNav className='justify-content-end'>
              <BNav.Link className='justify-content-end' eventKey='disabled' disabled>
                GODS: <b>${price} </b>
              </BNav.Link>
            </BNav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

Nav.propTypes = {
  price: PropTypes.number.isRequired,
  onClickNavItem: PropTypes.func,
}
