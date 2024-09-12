import React from 'react';
import '../styles/ScoreScreen.css';
import '../styles/global.css';

function ScoreScreen({ score, scoreboard, restartQuiz, clearAllScores }) {
  return (
    <div className="score-screen ">
      <h2 className='text-4xl'>Your Score: {score}</h2>
      <button className="restart-btn bg-gray-800 w-28 h-8" onClick={restartQuiz}>Restart Quiz</button>
      <button className="clear-scores-btn bg-gray-800 w-32 h-8 " onClick={clearAllScores}>Clear All Scores</button>
      <div className="scoreboard">
        {scoreboard.length > 0 ? (
          scoreboard.map((score, index) => (
            <div key={index} className="scoreboard-item">
              <span className="scoreboard-rank">{index + 1}.</span>
              <span className="scoreboard-username">{score.name}</span>
              <span className="scoreboard-score">{score.score}</span>
            </div>
          ))
        ) : (
          <div>No scores yet</div>
        )}
      </div>
    </div>
  );
}

export default ScoreScreen;
