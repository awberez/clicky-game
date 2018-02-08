import React, { Component } from "react";
import GameCard from "./components/GameCard";
import GameChoice from "./components/GameChoice";
import Title from "./components/Title";
import "./App.css";

class App extends Component {
  state = {
    cards: [],
    topScoreEasy: 0,
    topScoreHard: 0,
  }

  chooseDifficulty = (cardNum) => {
    this.setState({ gameCards: cardNum, difficultySet: true }, () => { this.cardMaker(); });
  }

  cardMaker = () => {
    this.setState({ cards: [], score: 0 }, () => {
      let cardArr = [], colorArr = [], easyColors = ["#ff0000", "#0000ff", "#ffff00", "#ffffff", "#00ff00", "#FFA500", "#cc00ff", "#424242"];
      for (let i=0; i < this.state.gameCards; i++) {
        let color = this.state.gameCards === 8 ? easyColors[i] : this.randomColor(colorArr),
        card = { "id": i, "color": color, "clicked": false };
        colorArr.push(card.color);
        cardArr.push(card);
      }
      this.setState({ cards: cardArr });
    });
  }

  randomColor = (colorArr) => {
    let newColor = "#000000".replace(/0/g, () => { return(~~(Math.random()*16)).toString(16); });
    if (colorArr.includes(newColor)) this.randomColor(colorArr);
    return newColor;
  }

  selectCard = id => {
    let cards = this.arrRandomize(this.state.cards), score = this.state.score;
    cards.forEach( element => {
      if (element.id === id && element.clicked === false) {
        element.clicked = true;
        score++;
      }
      else if (element.id === id && element.clicked === true) score = 0;
    });
    if (this.state.gameCards === 8 && this.state.topScoreEasy < score) this.setState({ topScoreEasy: score });
    if (this.state.gameCards != 8 && this.state.topScoreHard < score) this.setState({ topScoreHard: score });
    score === 0 
      ? (alert("You Lose!"), this.cardMaker()) 
      : score === this.state.gameCards 
        ? (alert("You Win!"), this.cardMaker()) 
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
            <h1 className="text-center">Clicky Game</h1>
            {!this.state.difficultySet 
              ? <Title>Select a Difficulty</Title> 
              : this.state.gameCards === 8
                ? <React.Fragment> 
                    <Title>Score: {this.state.score}/8</Title>
                    <Title>Top Score: {this.state.topScoreEasy}</Title>
                  </React.Fragment>
                : <React.Fragment> 
                    <Title>Score: {this.state.score}/12</Title>
                    <Title>Top Score: {this.state.topScoreHard}</Title>
                  </React.Fragment>
            }
            <GameChoice 
              chooseDifficulty={this.chooseDifficulty}
              gameCards={this.state.gameCards}
            />
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
    );
  }
}

export default App;
