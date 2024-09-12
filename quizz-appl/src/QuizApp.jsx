import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ScoreScreen from './components/ScoreScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function QuizApp() {
  const [gameState, setGameState] = useState('start');
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    loadScoreboard();
  }, []);

  useEffect(() => {
    let timer;
    if (gameState === 'quiz' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      selectAnswer(null);
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  const fetchQuestions = async (amount = 5, category = '', difficulty = 'medium') => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results.map(question => ({
        question: decodeURIComponent(question.question),
        options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
        answer: decodeURIComponent(question.correct_answer)
      }));
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Failed to load questions. Please try again later.');
      return [];
    }
  };

  const startQuiz = async () => {
    if (username.trim() === '') {
      alert('Please enter your name to start the quiz');
      return;
    }

    if (category === '') {
      alert('Please select a category to start the quiz');
      return;
    }
  

    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    const upperUsername = username.toUpperCase();
    const existingUser = scores.find(item => item.name.toUpperCase() === upperUsername);
    
    if (existingUser) {
      setScore(existingUser.score);  
    } else {
      setScore(0);  
    }

    const fetchedQuestions = await fetchQuestions(5, category, difficulty);
    setQuestions(fetchedQuestions);
    setGameState('quiz');
    setCurrentQuestionIndex(0);
    setTimeLeft(10);
    setSelectedAnswer(null); 
  };

  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestionIndex].answer;
    if (correct) setScore(score + 1);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(10);
        setSelectedAnswer(null); 
      } else {
        endQuiz();
      }
    }, 1000);
  };

  const endQuiz = () => {
    setGameState('score');
    saveScore();
    loadScoreboard();
  };

  const saveScore = () => {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    const upperUsername = username.toUpperCase();
    const existingScoreIndex = scores.findIndex(item => item.name.toUpperCase() === upperUsername);
    
    if (existingScoreIndex !== -1) {
      if (score > scores[existingScoreIndex].score) {
        scores[existingScoreIndex].score = score;
      }
    } else {
      scores.push({ name: upperUsername, score });
    }
    
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 5);
    
    localStorage.setItem('scores', JSON.stringify(topScores));
  };

  const loadScoreboard = () => {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    setScoreboard(scores);
  };

  const clearAllScores = () => {
    localStorage.removeItem('scores');
    setScoreboard([]); 
    alert('Scoreboard has been cleared!');
    setGameState('start');
  };

  const restartQuiz = () => {
    setGameState('start');
    setUsername('');
    setCategory('');
    setDifficulty('medium');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(10); 
    setSelectedAnswer(null); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 p-6">
    <div className="quiz-app-container">
    <div className="quiz-app">
      {gameState === 'start' && (
        <StartScreen 
          username={username}
          setUsername={setUsername}
          category={category}
          setCategory={setCategory}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          startQuiz={startQuiz}
          scoreboard={scoreboard}
        />
      )}
      {gameState === 'quiz' && (
        <QuizScreen 
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          timeLeft={timeLeft}
          selectAnswer={selectAnswer}
          selectedAnswer={selectedAnswer}
        />
      )}
      {gameState === 'score' && (
        <ScoreScreen 
          score={score}
          scoreboard={scoreboard}
          restartQuiz={restartQuiz}
          clearAllScores={clearAllScores}
        />
        
      )}
    </div>
    </div>
    </main>
    <Footer />
    </div>
    
  );
}


export default QuizApp;
