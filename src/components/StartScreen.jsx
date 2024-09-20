import React from 'react';
import '../styles/StartScreen.css';
import '../styles/global.css';

function StartScreen({ username, setUsername, category, setCategory, difficulty, setDifficulty, startQuiz, scoreboard }) {
  return (
    // <div className="start-screen-container">
    <div className="start-screen">
      <input 
        type="text" 
        id="username" 
        placeholder="Enter your name" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <select 
        id="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="9">General Knowledge</option>
        <option value="11">Entertainment: Film</option>
        <option value="17">Science & Nature</option>
        <option value="23">History</option>
        <option value="27">Animals</option>
      </select>
      <select 
        id="difficulty-select"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button id="start-btn" onClick={startQuiz}>Start</button>
      <div className="scoreboard">
        {scoreboard.length > 0 ? (
          scoreboard.map((score, index) => (
            <div key={index} className="scoreboard-item">
              <span className="scoreboard-rank">{index + 1}.</span>
              <span className="scoreboard-username">{score.name}</span>
              <span className="scoreboard-score scoreboard-score bg-slate-500 rounded-2xl w-6 h-6">{score.score}</span>
            </div>
          ))
        ) : (
          <div>No scores yet</div>
        )}
      </div>
    </div>
    // </div>
  );
}

export default StartScreen;
