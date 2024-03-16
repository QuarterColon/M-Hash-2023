import React from 'react'

const PropCard = (props) => {
  return (
    <div className="resp-text" style={{ backgroundColor: "blanchedalmond" }}>

            <h1 style={{paddingLeft: "25px"}}>{props.score*100} %</h1>

          <p style={{padding: "0 12.5px 0 12.5px"}}>{props.reply}</p>
        </div>
  )
}

export default PropCard