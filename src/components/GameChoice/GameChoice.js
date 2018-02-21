import React from "react";
import "./GameChoice.css";

const GameChoice = props => (          
	<div className="text-center">
		<div className="btn-group" role="group" aria-label="...">
			<button 
				className="btn btn-primary btn-lg" 
				disabled={props.totalCards === props.easy ? 'disabled' : ''} 
				onClick={()=>{props.chooseDifficulty(props.easy)}}
			>
			EASY
			</button>
			<button 
				className="btn btn-danger btn-lg" 
				disabled={props.totalCards === props.hard ? 'disabled' : ''} 
				onClick={()=>{props.chooseDifficulty(props.hard)}}
			>
			HARD
			</button>
			<div>
		</div>
  	</div>
);

export default GameChoice;