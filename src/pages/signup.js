import {Form,Container,Button,Col,Row} from 'react-bootstrap'
import './signup.css'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useSignupUserMutation } from '../services/appApi'
const SignUp = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [image,setImage] = useState(null)
    const [uploadingImg,setUploadingImg] = useState(false)
    const [ImagePreview,setImagePreview] = useState(null)
    const [signupUser,{isLoading,error}]=useSignupUserMutation()
    const navigate = useNavigate()

    const validateImg = (e)=>{
           const file = e.target.files[0] 
           if(file.size >= 1048576){
               return alert("max file size is 1mb")
           }else{
               setImage(file)
               setImagePreview(URL.createObjectURL(file))
           }
    }
    const uploadImage = async () =>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','wgp6gwof')
        try{
            setUploadingImg(true)
            let res =await fetch('https://api.cloudinary.com/v1_1/dgwm7s0yy/image/upload',{method:'post',body:data}) 
            const urlData = await res.json()
            setUploadingImg(false)
            return urlData.url
        }catch(error){
            setUploadingImg(false)
            console.log(error)
        }

    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!image) return alert('please upload your profile picture')
        const url = await uploadImage(image)
        console.log(url)
        signupUser({email,name,password,picture:url}).then((data)=>{
          if(data){
            console.log(data) 
            navigate('/chat')
          }
        })
       
    }
    return(
        <Container>
        <Row>
         <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
            <Form style={{width:'80%',maxWidth:500}} onSubmit={handleSubmit}>
             <h3 className="text-center">Create Account</h3>
             <div className="signup-profile-pic__container">
                  <img src={ImagePreview || `/img/invite2.jpg`} className="signup-profile-pic"/>
                  <label htmlFor="image-upload" className="image-upload-label">
                      <i className="fas fa-plus-circle add-picture-icon"></i>
                  </label>
                  <input type="file" id="image-upload" hidden accept="image/png,image/jpeg" onChange={validateImg}/>
             </div> 
            <Form.Group className="mb-3" controlId="formBasic">
                 <Form.Label>Username</Form.Label>
                 <Form.Control type="text" placeholder="Enter Username" required onChange={(e)=> setName(e.target.value)} value={name}/>
                 {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                 <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required onChange={(e)=>setEmail(e.target.value)} value={email}/>
                 <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
      
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required placeholder="Password"onChange={(e)=>setPassword(e.target.value)} value={password} /> 
               </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
               </Form.Group>
                <Button variant="primary" type="submit">
                        {uploadingImg ? "Signing You Up" : "Sign Up"}
                </Button>
                <div className="py-4">
                    <p classsName="text-center">
                        Already Logged In <Link to="/signup">Login</Link>
                    </p>
                </div>
              </Form>
            </Col>
            <Col md={5} className="signup__bg">
             <img src="/img/invite5.jpg"/>
            </Col>
          </Row>         
        </Container>
    )
}

export default SignUp