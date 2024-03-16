import React from 'react'

const LandingCard = ({props}) => {
  return (
    <div className='landing-card'>
        <h1>{props.icon}</h1>
        <h3> {props.title} </h3>  
        <p>{props.desc}</p>   
    </div>
  )
}

export default LandingCard