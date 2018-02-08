import React from "react";
import "./GameCard.css";

const GameCard = props => (          
	<div className="col-xs-3">
  		<div className="card" style={{background: props.color}} onClick={() => props.selectCard(props.id)}></div>
  	</div>
);

export default GameCard;