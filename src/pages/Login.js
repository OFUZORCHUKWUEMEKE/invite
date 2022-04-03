import {Form,Container,Button,Col,Row} from 'react-bootstrap'
import './Login.css'
import {Link,useNavigate} from 'react-router-dom'
import { useState} from 'react'
import {useLoginUserMutation} from '../services/appApi'

const Login = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const [loginUser,{isLoading,error}] =useLoginUserMutation()
    const handleLogin = (e)=>{
        e.preventDefault()
        loginUser({email,password}).then(({data})=>{
           if(data){
               navigate('/chat')
           }
        })
    }
    return(
    <Container>
        <Row>
         <Col md={5} className="login__bg">
             <img src="/img/invite3.jpg"/>
         </Col>
         <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
            <Form onSubmit={handleLogin} style={{width:'80%',maxWidth:500}}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                 <Form.Label>Email address</Form.Label>
                 <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                 <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
      
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"onChange={(e)=>setPassword(e.target.value)} value={password} required /> 
               </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
               </Form.Group>
                <Button variant="primary" type="submit">
                   Login
                </Button>
                <div className="py-4">
                    <p classsName="text-center">
                        Dont have an Account <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
              </Form>
            </Col>
          </Row>         
        </Container>
    )
}

export default Login