import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface QuizProps {
  quizData: any;
  onComplete: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ quizData, onComplete }) => {
  const { dispatch } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = quizData?.questions || [];
  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    setShowResult(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        // Award XP and potentially unlock achievements
        const xpEarned = calculateXP();
        dispatch({ type: 'ADD_XP', payload: xpEarned });
      }
    }, 2000);
  };

  const calculateXP = () => {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correct
    ).length;
    const baseXP = 50;
    const bonusXP = (correctAnswers / questions.length) * 100;
    return Math.round(baseXP + bonusXP);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const getScore = () => {
    const correct = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correct
    ).length;
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  if (!quizData) {
    return <div>Loading quiz...</div>;
  }

  if (quizCompleted) {
    const score = getScore();
    const xpEarned = calculateXP();

    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="mb-6">
            {score.percentage >= 80 ? (
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            ) : (
              <Award className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">Great job completing the {quizData.title}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{score.correct}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{score.percentage}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">+{xpEarned}</div>
              <div className="text-sm text-gray-600">XP Earned</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Retry Quiz</span>
            </button>
            <button
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCorrect = showResult && selectedAnswers[currentQuestion] === currentQ.correct;
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-500">{quizData.title}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option: string, index: number) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-xl transition-all duration-200 ";
              
              if (showResult) {
                if (index === currentQ.correct) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswers[currentQuestion] && index !== currentQ.correct) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                }
              } else if (selectedAnswers[currentQuestion] === index) {
                buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
              } else {
                buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && index === currentQ.correct && (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                    {showResult && index === selectedAnswers[currentQuestion] && index !== currentQ.correct && (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`mb-6 p-4 rounded-lg ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-start space-x-3">
              {isCorrect ? (
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              )}
              <div>
                <h4 className={`font-semibold mb-2 ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </h4>
                <p className="text-gray-700">{currentQ.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0 || showResult}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {showResult ? (
            <div className="text-center">
              <div className="text-sm text-gray-500">
                {currentQuestion < questions.length - 1 ? 'Next question in' : 'Calculating results'} 2s...
              </div>
            </div>
          ) : (
            <button
              onClick={handleNext}
              disabled={!hasAnswered}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};