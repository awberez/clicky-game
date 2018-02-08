import React from "react";
import "./GameChoice.css";

const GameChoice = props => (          
	<div className="text-center">
		<div className="btn-group" role="group" aria-label="...">
			<button 
				className="btn btn-primary btn-lg" 
				disabled={props.gameCards === 8 ? 'disabled' : ''} 
				onClick={()=>{props.chooseDifficulty(8)}}
			>
			EASY
			</button>
			<button 
				className="btn btn-danger btn-lg" 
				disabled={props.gameCards === 12 ? 'disabled' : ''} 
				onClick={()=>{props.chooseDifficulty(12)}}
			>
			HARD
			</button>
		</div>
  	</div>
);

export default GameChoice;