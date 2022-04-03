import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const rooms = ["first room","second room","third room"]
  const user = useSelector((state)=>state.user)
  if(!user){
    <>
    </>
  }
  return (
    <>
      <h2 className='py-2'>Available rooms</h2>
      <ListGroup className='py-4'>
         {rooms.map((room,idx)=>(
           <ListGroup.Item key={idx}>
                {room}
           </ListGroup.Item>
         ))}
      </ListGroup>
    </>
    
  )
}

export default Sidebar