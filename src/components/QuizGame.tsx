import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

interface QuizGameProps {
  quizType: string;
  onComplete: () => void;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
  hint: string;
}

const quizData: Record<string, { title: string; questions: Question[] }> = {
  pollution: {
    title: "Pollution Basics Quiz",
    questions: [
      {
        question: "What is the primary cause of global warming?",
        options: ["Ocean currents", "Greenhouse gas emissions", "Solar radiation", "Wind patterns"],
        correct: 1,
        hint: "Think about gases like CO2 and methane that trap heat in the atmosphere."
      },
      {
        question: "Which of these is NOT a renewable energy source?",
        options: ["Solar power", "Wind energy", "Coal", "Hydroelectric power"],
        correct: 2,
        hint: "Look for the energy source that gets used up and cannot be replenished naturally."
      },
      {
        question: "What percentage of Earth's water is freshwater?",
        options: ["50%", "25%", "10%", "Less than 3%"],
        correct: 3,
        hint: "Most of Earth's water is in the oceans - freshwater is surprisingly scarce!"
      }
    ]
  },
  waste: {
    title: "Waste Management Quiz",
    questions: [
      {
        question: "How long does it take for plastic bottles to decompose?",
        options: ["1 year", "10 years", "100 years", "450+ years"],
        correct: 3,
        hint: "Plastic takes much longer than most people think to break down naturally."
      },
      {
        question: "Which of these can be composted?",
        options: ["Plastic bags", "Fruit peels", "Glass bottles", "Metal cans"],
        correct: 1,
        hint: "Look for organic materials that can decompose naturally."
      }
    ]
  },
  energy: {
    title: "Renewable Energy Quiz",
    questions: [
      {
        question: "Which country generates the most solar energy?",
        options: ["USA", "Germany", "China", "Japan"],
        correct: 2,
        hint: "This country has invested heavily in solar panel manufacturing and installation."
      },
      {
        question: "What is the cleanest form of energy?",
        options: ["Nuclear", "Solar", "Natural gas", "Hydroelectric"],
        correct: 1,
        hint: "This energy source produces no emissions during operation and is infinitely renewable."
      }
    ]
  }
};

export const QuizGame: React.FC<QuizGameProps> = ({ quizType, onComplete }) => {
  const { dispatch } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quiz = quizData[quizType];
  const currentQuestion = quiz?.questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentQuestion.correct) {
      setScore(prev => prev + 10);
      setCorrectAnswers(prev => prev + 1);
      dispatch({ type: 'ADD_ECO_POINTS', payload: 10 });
      showPointsAnimation('+10 Points!');
    }

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowHint(false);
      } else {
        setQuizCompleted(true);
        dispatch({ type: 'COMPLETE_QUIZ' });
      }
    }, 2000);
  };

  const showPointsAnimation = (text: string) => {
    // Create points animation element
    const animation = document.createElement('div');
    animation.className = 'points-animation';
    animation.textContent = text;
    document.body.appendChild(animation);
    
    setTimeout(() => {
      if (document.body.contains(animation)) {
        document.body.removeChild(animation);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
    setScore(0);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  if (quizCompleted) {
    const accuracy = Math.round((correctAnswers / quiz.questions.length) * 100);
    
    return (
      <div className="section-card">
        <div className="quiz-flashcard text-center">
          <h3 className="text-2xl font-bold mb-4">
            <i className="fas fa-trophy text-warning me-2"></i>
            Quiz Complete!
          </h3>
          <div className="grid grid-cols-3 gap-4 mt-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-success">{score}</div>
              <small className="text-gray-600">Points Earned</small>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-info">{correctAnswers}/{quiz.questions.length}</div>
              <small className="text-gray-600">Correct Answers</small>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{accuracy}%</div>
              <small className="text-gray-600">Accuracy</small>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              className="btn btn-secondary px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              onClick={resetQuiz}
            >
              Retry Quiz
            </button>
            <button
              className="btn btn-success px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={onComplete}
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-card">
      <div className="quiz-flashcard">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-semibold">{quiz.title}</h5>
          <div className="flex space-x-2">
            <span className="badge bg-info text-white px-3 py-1 rounded-full">
              {currentQuestionIndex + 1}/{quiz.questions.length}
            </span>
            <span className="badge bg-success text-white px-3 py-1 rounded-full">
              Points: {score}
            </span>
          </div>
        </div>
        
        <div>
          <h6 className="text-lg font-medium mb-4">{currentQuestion.question}</h6>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "quiz-option w-full p-4 text-left border-2 rounded-xl transition-all duration-200 ";
              
              if (showResult) {
                if (index === currentQuestion.correct) {
                  buttonClass += "correct border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                  buttonClass += "incorrect border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                }
              } else if (selectedAnswer === index) {
                buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
              } else {
                buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  {option}
                </button>
              );
            })}
          </div>
          
          {showHint && (
            <div className="hint-box show bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <i className="fas fa-lightbulb me-2 text-yellow-600"></i>
              <span className="text-yellow-800">{currentQuestion.hint}</span>
            </div>
          )}
          
          <div className="flex justify-between mt-4">
            <button
              className="btn btn-outline-warning px-4 py-2 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors"
              onClick={() => setShowHint(true)}
              disabled={showHint}
            >
              <i className="fas fa-lightbulb me-1"></i>
              Hint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};