import React, { Component } from "react";
import GameCard from "./components/GameCard";
import GameChoice from "./components/GameChoice";
import Score from "./components/Score";
import easyColors from "./easyColors.json";
import "./App.css";

class App extends Component {
  state = {
    cards: [],
    easy: easyColors.length,
    hard: easyColors.length + 4,
    topScoreEasy: 0,
    topScoreHard: 0,
  }

  chooseDifficulty = (totalCards) => {
    this.setState({ totalCards }, () => { this.cardMaker(); });
  }

  cardMaker = () => {
    this.setState({ cards: [], score: 0 }, () => {
      let cards = [];
      for (let i=0; i < this.state.totalCards; i++) {
        let color = this.state.totalCards === this.state.easy ? easyColors[i] : this.randomColor(cards),
        card = { "id": i, "color": color, "clicked": false };
        cards.push(card);
      }
      this.setState({ cards });
    });
  }

  randomColor = (cards) => {
    let newColor = "#000000".replace(/0/g, () => { return(~~(Math.random()*16)).toString(16); });
    return cards.find( card => { return card.color === newColor; }) ? this.randomColor(cards) : newColor;
  }

  selectCard = id => {
    let cards = this.arrRandomize(this.state.cards), score = this.state.score, topScoreEasy = this.state.topScoreEasy, topScoreHard = this.state.topScoreHard;
    cards.forEach( card => { if (card.id === id) card.clicked === false ? (card.clicked = true, score++) : score = 0; });
    this.state.totalCards === this.state.easy 
      ? this.setState({ topScoreEasy: (topScoreEasy < score) ? score : topScoreEasy }) 
      : this.setState({ topScoreHard: (topScoreHard < score) ? score : topScoreHard });
    this.state.totalCards === score 
      ? (alert("You Win!"), this.cardMaker()) 
      : score === 0 
        ? (alert("You Lose!"), this.cardMaker()) 
        : this.setState({ cards, score });
  }

  arrRandomize = arr => {
    let n = arr.length - 1, tempArr = [];
    for (let i = 0; i < n; i++) tempArr.push(arr.splice(~~(Math.random()*arr.length),1)[0]);
    tempArr.push(arr[0]);
    return tempArr;
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
            <h1>Clicky Game</h1>
            <GameChoice 
              chooseDifficulty={this.chooseDifficulty}
              totalCards={this.state.totalCards}
              easy={this.state.easy}
              hard={this.state.hard}
            />
            {!this.state.totalCards 
              ? <h3>Select a Difficulty</h3> 
              : this.state.totalCards === this.state.easy
                ? <Score
                    score={this.state.score}
                    topScore={this.state.topScoreEasy}
                  />
                : <Score
                    score={this.state.score}
                    topScore={this.state.topScoreHard}
                  />
            }
            <div className="row">
              {this.state.cards.map(card => (
                <GameCard
                  selectCard={this.selectCard}
                  id={card.id}
                  key={card.id}
                  color={card.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
