import React from 'react'
import './statuscard.css'

/**
* @author
* @function StatusCard
**/

export const StatusCard = (props) => {
  return(
      <div className="status-card">
          <div className="status-card__icon">
              <i className={props.icon}></i>
          </div>

          <div className="status-card__info">
              <h3>{props.quantity}</h3>
              <span>{props.title}</span>
          </div>
      </div>
   )

 }