import React from 'react';
import { TrendingUp, Target, Zap, Calendar, BookOpen, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface DashboardProps {
  onCourseSelect: (course: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onCourseSelect }) => {
  const { state } = useUser();

  const featuredCourses = [
    {
      id: 'renewable-energy',
      title: 'Renewable Energy Revolution',
      description: 'Discover the power of solar, wind, and hydroelectric energy',
      progress: 0,
      xpReward: 150,
      difficulty: 'Intermediate',
      duration: '45 min',
      icon: '⚡'
    },
    {
      id: 'ocean-conservation',
      title: 'Ocean Conservation',
      description: 'Protect our seas and marine life ecosystems',
      progress: 0,
      xpReward: 200,
      difficulty: 'Advanced',
      duration: '60 min',
      icon: '🌊'
    },
    {
      id: 'sustainable-living',
      title: 'Sustainable Living',
      description: 'Practical tips for an eco-friendly lifestyle',
      progress: 0,
      xpReward: 100,
      difficulty: 'Beginner',
      duration: '30 min',
      icon: '🌱'
    }
  ];

  const stats = [
    { label: 'Total XP', value: state.user.totalXP.toLocaleString(), icon: TrendingUp, color: 'text-green-600' },
    { label: 'Current Level', value: state.user.level, icon: Target, color: 'text-blue-600' },
    { label: 'Day Streak', value: state.user.streak, icon: Zap, color: 'text-orange-600' },
    { label: 'Courses Done', value: state.user.coursesCompleted.length, icon: BookOpen, color: 'text-purple-600' }
  ];

  const recentAchievements = state.achievements
    .filter(achievement => achievement.unlocked)
    .slice(-3);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome back, <span className="text-green-600">{state.user.name}</span>! 🌍
        </h1>
        <p className="text-gray-600 text-lg">Ready to learn something amazing about our planet today?</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Level Progress</h3>
          <span className="text-sm text-gray-500">{state.user.xp}/{500} XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(state.user.xp / 500) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {state.user.xpToNext} XP until Level {state.user.level + 1}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Featured Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Featured Courses</h2>
          <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
            View All →
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <div 
              key={course.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => onCourseSelect(course)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{course.icon}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {course.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{course.duration}</span>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>{course.xpReward} XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Award className="h-6 w-6 text-yellow-500 mr-2" />
          Recent Achievements
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};