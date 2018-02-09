import React from "react";
import "./Score.css";

const Score = props => (
	<div className="row">
		<div className="col-lg-3 col-lg-offset-3 col-md-4 col-md-offset-2 col-sm-5 col-sm-offset-1 col-xs-6">
			<h3>Your Score: {props.score}</h3>
		</div>
		<div className="col-lg-3 col-md-4 col-sm-5 col-xs-6">
			<h3>Best Score: {props.topScore}</h3>
		</div>
	</div>
);

export default Score;