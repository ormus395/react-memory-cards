import React, { Component } from 'react';
import './Board.css'
import Cards from './Cards/Cards'
import Card from '../components/Card'

let shuffled = (cards) => {
  let m = cards.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);

    t = cards[m]
    cards[m] = cards[i]
    cards[i] = t
  }
  return cards
}
class Board extends Component {
  state = {
    cards: [],
    selectedCards: [],
    matchSequence: false
  }

  componentDidMount() {
    this.setState({
      cards: shuffled(Cards),
      selectedCards: [],
      matchSequence: false
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkMatch()
  }

  flipCard = (id) => {
    let deckCopy = [...this.state.cards];
    let flipped;
    let selected;
    for (let i = 0; i < deckCopy.length; i++) {
      if (deckCopy[i].id === id) {
        flipped = deckCopy[i]
        flipped.flipped = true
        deckCopy[i] = flipped
        selected = flipped
      }
    }
    this.setState((prevState, props) => {
      let newSelectedCards = [...this.state.selectedCards, selected]
      return { ...prevState, cards: deckCopy, selectedCards: newSelectedCards }
    })
  }

  checkMatch = () => {
    if (this.state.selectedCards.length === 2) {
      if (this.state.selectedCards[0].matchSet === this.state.selectedCards[1].matchSet) {
        let newMatchSet = this.state.cards.map(card => {
          if (card.matchSet === this.state.selectedCards[0].matchSet) {
            card.isMatched = true;
            return card
          } else {
            return card
          }
        })
        this.setState({
          ...this.state,
          cards: newMatchSet,
          selectedCards: []
        })
      } else {
        let deckCopy = this.state.cards.map(card => {
          if (card.isMatched) {
            return card
          } else {
            card.flipped = false
            return card
          }
        })
        return setTimeout(() => {
          this.setState({
            ...this.state,
            cards: deckCopy,
            selectedCards: []
          })
        }, 500)

      }
    }
  }

  render() {
    let deck = this.state.cards.map(card => <Card key={card.id} card={card} handleFlip={this.flipCard} />)
    return (
      <div className="board">
        {deck}
      </div>
    )
  }
}

export default Board