import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { QuizGame } from './QuizGame';

export const QuizzesTab: React.FC = () => {
  const { state } = useUser();
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const quizCategories = [
    {
      id: 'pollution',
      title: 'Pollution Basics',
      description: 'Test your knowledge about different types of pollution',
      icon: 'fas fa-smog',
      color: 'text-warning',
      badgeColor: 'bg-warning',
      questions: 10,
      duration: 5
    },
    {
      id: 'waste',
      title: 'Waste Management',
      description: 'Learn about recycling, composting, and waste reduction',
      icon: 'fas fa-recycle',
      color: 'text-success',
      badgeColor: 'bg-success',
      questions: 15,
      duration: 8
    },
    {
      id: 'energy',
      title: 'Renewable Energy',
      description: 'Explore solar, wind, and other clean energy sources',
      icon: 'fas fa-bolt',
      color: 'text-primary',
      badgeColor: 'bg-primary',
      questions: 12,
      duration: 6
    }
  ];

  if (activeQuiz) {
    return (
      <QuizGame 
        quizType={activeQuiz} 
        onComplete={() => setActiveQuiz(null)} 
      />
    );
  }

  return (
    <div className="section-card">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <i className="fas fa-brain me-3 text-info"></i>
        Environmental Knowledge Quizzes
      </h3>
      
      {/* Quiz Stats */}
      <div className="quiz-stats bg-gray-50 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{state.user.ecoPoints}</div>
            <small className="text-gray-600">Total Points</small>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{state.user.quizzesCompleted}</div>
            <small className="text-gray-600">Quizzes Completed</small>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{state.user.accuracyRate}%</div>
            <small className="text-gray-600">Accuracy Rate</small>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{state.user.streak}</div>
            <small className="text-gray-600">Day Streak</small>
          </div>
        </div>
      </div>

      {/* Quiz Categories */}
      <div className="grid lg:grid-cols-3 gap-6">
        {quizCategories.map((quiz) => (
          <div key={quiz.id} className="quiz-category-card" onClick={() => setActiveQuiz(quiz.id)}>
            <h5 className="text-lg font-semibold mb-2 flex items-center">
              <i className={`${quiz.icon} me-2 ${quiz.color}`}></i>
              {quiz.title}
            </h5>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="flex justify-between items-center">
              <span className={`badge ${quiz.badgeColor} text-white px-3 py-1 rounded-full text-sm`}>
                {quiz.questions} Questions • {quiz.duration} min
              </span>
              <button className="btn btn-sm btn-outline-primary px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                Take Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};