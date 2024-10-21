// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('http://localhost:5000/api/questions');
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const selectOption = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="container">
      <h1>Quick Quiz Challenge</h1>
      {!showResults ? (
        <div className="quiz-container">
          <h2>{questions[currentQuestionIndex]?.question}</h2>
          <ul className="options">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <li
                key={index}
                className="option"
                onClick={() => selectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <button className="btn" onClick={restartQuiz}>Next</button>
        </div>
      ) : (
        <div className="result-container">
          <h2>Your Score: {score}</h2>
          <button className="btn" onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default App;
