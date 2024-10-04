import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the path
import Footer from './Footer'; // Adjust the path
import '../styles/AttemptQuiz.css';

const AttemptQuiz = () => {
  const location = useLocation(); // Receive quiz data from location state
  const { quiz } = location.state; // Destructure quiz from location state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleOptionChange = (questionIndex, selectedOption) => {
    setAnswers({
      ...answers,
      [questionIndex]: selectedOption,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('You have completed the quiz!');
      navigate('/user-dashboard'); // Redirect back to the user dashboard
    }
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="attempt-quiz-container">
          <div className="attempt-quiz">
            <div id="quiz-header">
              <h2 id="quiz-title">{quiz.title}</h2>
              <p id="quiz-topic">Topic: {quiz.topic}</p>
            </div>

            <div className="quiz-question">
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </div>

            <div className="quiz-options">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="option gap-6">
                  <label>
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      checked={answers[currentQuestionIndex] === option}
                      onChange={() => handleOptionChange(currentQuestionIndex, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={handleNextQuestion}
              id="next-question-btn"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AttemptQuiz;
