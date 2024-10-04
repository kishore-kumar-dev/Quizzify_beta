import React, { useState } from 'react';
import Navbar from './Navbar'; // Adjust the path as needed
import Footer from './Footer'; // Adjust the path as needed

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizTopic, setQuizTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleAddQuestion = () => {
    const newQuestion = { question: '', options: [], correctAnswer: '' };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);

    // Show the delete button if there's at least 1 question
    if (updatedQuestions.length >= 1) {
      setShowDeleteButton(true);
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);

    // Hide the delete button if no questions remain
    if (updatedQuestions.length === 0) {
      setShowDeleteButton(false);
    }

    alert('Question deleted!');
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    const newQuiz = {
      title: quizTitle,
      topic: quizTopic,
      questions: questions,
    };

    // Save to localStorage (or you can use API or state management)
    const existingQuizzes = JSON.parse(localStorage.getItem('userQuizzes')) || [];
    localStorage.setItem('userQuizzes', JSON.stringify([...existingQuizzes, newQuiz]));

    alert('Quiz submitted!');
    setQuizTitle('');
    setQuizTopic('');
    setQuestions([]);
    setShowDeleteButton(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 p-6">
        <div className="">
          <h2 className="text-3xl font-bold mb-6">Create a New Quiz</h2>

          <input
            type="text"
            placeholder="Quiz Title"
            value={quizTitle}
            onChange={(event) => setQuizTitle(event.target.value)}
            className="block w-full p-2 border border-gray-300 mb-2 rounded"
          />

          <input
            type="text"
            placeholder="Quiz Topic"
            value={quizTopic}
            onChange={(event) => setQuizTopic(event.target.value)}
            className="block w-full p-2 border border-gray-300 mb-2 rounded"
          />

          {questions.map((question, index) => (
            <div key={index} className="mb-6">
              <input
                type="text"
                placeholder="Enter question"
                value={question.question}
                onChange={(event) => handleQuestionChange(index, event)}
                className="block w-full p-2 border border-gray-300 mb-2 rounded"
              />
              <div>
                {Array(4).fill('').map((_, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={question.options[optionIndex] || ''}
                    onChange={(event) => handleOptionChange(index, optionIndex, event)}
                    className="block w-full p-2 border border-gray-300 mb-2 rounded"
                  />
                ))}
              </div>
              <input
                type="text"
                placeholder="Correct answer"
                value={question.correctAnswer}
                onChange={(event) => handleCorrectAnswerChange(index, event)}
                className="block w-full p-2 border border-gray-300 mb-2 rounded"
              />
            </div>
          ))}
          <button onClick={handleAddQuestion} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
            Add Question
          </button>
          {showDeleteButton && (
            <button onClick={handleDeleteQuestion} className="px-4 py-2 bg-gray-700 hover:bg-red-400 text-white rounded-lg ml-4">
              Delete Quiz
            </button>
          )}
          {showDeleteButton && (
            <button onClick={handleSubmit} className="px-4 py-2 bg-gray-900 text-white rounded-lg ml-4">
              Submit Quiz
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateQuiz;
