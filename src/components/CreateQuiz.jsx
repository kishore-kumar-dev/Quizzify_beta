import React, { useState, useEffect } from 'react';
// import Floca from './Floca'; // Adjust the path based on your project structure
// import Floca from './Floca'; // Adjust the path based on your project structure
import Navbar from './Navbar'; // Adjust the path as needed
import Footer from './Footer'; // Adjust the path as needed
import { useNavigate, useLocation } from 'react-router-dom';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizToEdit } = location.state || {}; // Get quiz data if editing

  const [quizTitle, setQuizTitle] = useState(quizToEdit ? quizToEdit.title : '');
  const [quizTopic, setQuizTopic] = useState(quizToEdit ? quizToEdit.topic : '');
  const [questions, setQuestions] = useState(quizToEdit ? quizToEdit.questions : []);
  const [showDeleteButton, setShowDeleteButton] = useState(quizToEdit ? true : false);

  useEffect(() => {
    if (quizToEdit) {
      setQuizTitle(quizToEdit.title);
      setQuizTopic(quizToEdit.topic);
      setQuestions(quizToEdit.questions);
    }
  }, [quizToEdit]);

  const handleAddQuestion = () => {
    const newQuestion = { question: '', options: [], correctAnswer: '' };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    setShowDeleteButton(true);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
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

    // Update local storage
    const existingQuizzes = JSON.parse(localStorage.getItem('userQuizzes')) || [];
    
    if (quizToEdit) {
      // Update existing quiz
      const updatedQuizzes = existingQuizzes.map((quiz) =>
        quiz.title === quizToEdit.title ? newQuiz : quiz
      );
      localStorage.setItem('userQuizzes', JSON.stringify(updatedQuizzes));
      alert('Quiz updated!');
    } else {
      // Add new quiz
      localStorage.setItem('userQuizzes', JSON.stringify([...existingQuizzes, newQuiz]));
      alert('Quiz submitted!');
    }

    // Reset form
    setQuizTitle('');
    setQuizTopic('');
    setQuestions([]);
    setShowDeleteButton(false);
    navigate('/admin-dashboard'); // Redirect to admin dashboard
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 p-6">
        <div className="">
          <h2 className="text-3xl font-bold mb-6">{quizToEdit ? 'Edit Quiz' : 'Create a New Quiz'}</h2>

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
              <button
                onClick={() => handleDeleteQuestion(index)}
                className="mt-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-800"
              >
                Delete Question
              </button>
            </div>
          ))}
          <button onClick={handleAddQuestion} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
            Add Question
          </button>
          {showDeleteButton && (
            <button onClick={handleSubmit} className="px-4 py-2 bg-gray-900 text-white rounded-lg ml-4">
              {quizToEdit ? 'Update Quiz' : 'Submit Quiz'}
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateQuiz;
