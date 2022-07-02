import React from 'react'

const Notification = ({ message }) => {
  if (!message) {    
    return null  
  }  

  return (    
    <div style={{color: 'red', border: '1px solid', margin: 5}}>    
      {message}    
    </div>  
  )   
}

export default Notification