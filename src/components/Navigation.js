import React from 'react'
import {useSelector} from 'react-redux'
import {useLogoutUserMutation} from '../services/appApi'
import {Navbar,Container,Nav,NavDropdown,Button} from 'react-bootstrap' 
import {LinkContainer} from 'react-router-bootstrap'
const Navigation = () => {
  const [logoutUser] = useLogoutUserMutation()
  const user = useSelector((state)=>state.user)

  const handlelogout = async(e)=>{
     e.preventDefault()
     await logoutUser(user)
    //  redirect to home page
    window.location.replace("/") 
  }
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Invite</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {!user && (
                  <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
          )}
          <LinkContainer to="/chat">
             <Nav.Link>Chat</Nav.Link>
          </LinkContainer>
          {user && (
              <NavDropdown title={<> <img src={user.picture} style={{width:30,height:30,marginRight:10,objectFit:'cover',borderRadius:'50%'}}/> 
              {user.name}              
               </>} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Item>
                  <Button variant="danger" onClick={handlelogout}>
                    LogOut 
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
          )}
        
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation;