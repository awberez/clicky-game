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

  chooseDifficulty = totalCards => { this.setState({ totalCards, score: 0 }, () => { this.setState({ cards: this.cardMaker() }); }); }

  cardMaker = () => {
    let cards = [];
    for (let i = 0; i < this.state.totalCards; i++) {
      let color = this.state.totalCards === this.state.easy ? easyColors[i] : this.randomColor(cards),
      card = { "id": i, "color": color, "alreadyClicked": false };
      cards.push(card);
    }
    return cards;
  }

  randomColor = cards => {
    let newColor = "#000000".replace(/0/g, () => { return(~~(Math.random()*16)).toString(16); });
    return cards.find( card => { return card.color === newColor; }) ? this.randomColor(cards) : newColor;
  }

  selectCard = id => {
    let cards = this.arrRandomize(this.state.cards), score = this.state.score, guessMade,
    topScore = this.state.totalCards === this.state.easy ? { name: 'topScoreEasy', val: this.state.topScoreEasy } : { name: 'topScoreHard', val: this.state.topScoreHard };
    cards.forEach( card => { if (card.id === id) card.alreadyClicked ? (score = 0, guessMade = 'incorrect') : (score++, guessMade = 'correct', card.alreadyClicked = true) });
    this.setState({
      score, 
      cards: score === this.state.totalCards || score === 0 ? this.cardMaker() : cards,
      [topScore.name]: topScore.val < score ? score : topScore.val, 
      [guessMade]: true 
    }, () => { setTimeout(() => { this.setState({ [guessMade]: false }); }, 300)});
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
            <h1>MEMORY GAME</h1>
            <h3>Don't click the same color twice!</h3> 
            <GameChoice 
              chooseDifficulty={this.chooseDifficulty}
              totalCards={this.state.totalCards}
              easy={this.state.easy}
              hard={this.state.hard}
            />
            {!this.state.totalCards 
              ? <h4>(Select a Difficulty)</h4> 
              : <Score
                  score={this.state.score}
                  topScore={this.state.totalCards === this.state.easy ? this.state.topScoreEasy : this.state.topScoreHard}
                  correct={this.state.correct}
                  incorrect={this.state.incorrect}
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
