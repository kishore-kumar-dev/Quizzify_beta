import React from 'react';
import '../styles/QuizScreen.css';
// import '../styles/global.css';

function QuizScreen({ questions, currentQuestionIndex, timeLeft, selectAnswer, selectedAnswer }) {
  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const totalQuestions = questions.length;

  return (
    <div id="display-container">
      <div className="header">
        <div id="time-remaining">
          Time Remaining: {timeLeft}s
        </div>
        <div id="question-number">
          Question {questionNumber}/{totalQuestions}
        </div>
      </div>
      <div className="question">{currentQuestion.question}</div>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option ${selectedAnswer === option ? 'selected' : ''}`}
            onClick={() => selectAnswer(option)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizScreen;
