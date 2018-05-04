import React, { Component } from 'react'
import './Card.css'



const Card = ({ card, handleFlip }) => {
  let style = {
    backgroundColor: card.flipped || card.isMatched ? card.color : '#111'
  }
  return (
    <div className='card' style={style} onClick={() => handleFlip(card.id)}>
    </div>
  )
}

export default Card