import React, { useState } from 'react';
import { User, Award, BookOpen, Calendar, TrendingUp, CreditCard as Edit3, Save, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const Profile: React.FC = () => {
  const { state } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(state.user.name);

  const handleSave = () => {
    // In a real app, this would update the user's profile
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(state.user.name);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Total XP', value: state.user.totalXP.toLocaleString(), icon: TrendingUp, color: 'text-green-600' },
    { label: 'Current Level', value: state.user.level, icon: Award, color: 'text-blue-600' },
    { label: 'Courses Completed', value: state.user.coursesCompleted.length, icon: BookOpen, color: 'text-purple-600' },
    { label: 'Day Streak', value: state.user.streak, icon: Calendar, color: 'text-orange-600' }
  ];

  const recentActivity = [
    { action: 'Completed', item: 'Climate Change Basics Quiz', xp: 150, time: '2 hours ago' },
    { action: 'Unlocked', item: 'Climate Champion Badge', xp: 0, time: '3 hours ago' },
    { action: 'Completed', item: 'Renewable Energy Course', xp: 200, time: '1 day ago' },
    { action: 'Started', item: 'Ocean Conservation Module', xp: 0, time: '2 days ago' },
    { action: 'Completed', item: 'Recycling Fundamentals Quiz', xp: 120, time: '3 days ago' }
  ];

  const progressToNextLevel = (state.user.xp / 500) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm">
              {state.user.name.charAt(0)}
            </div>
            <div>
              {isEditing ? (
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter your name"
                  />
                  <button
                    onClick={handleSave}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-3xl font-bold">{state.user.name}</h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
              )}
              <p className="text-green-100 text-lg">Environmental Learning Enthusiast</p>
              <div className="flex items-center space-x-4 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Level {state.user.level}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{state.user.badges.length} Badges</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{state.user.streak} Day Streak</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold mb-1">{state.user.totalXP.toLocaleString()}</div>
            <div className="text-green-100">Total XP Earned</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Level {state.user.level}</span>
            <span>{state.user.xp}/500 XP</span>
            <span>Level {state.user.level + 1}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="h-3 bg-white rounded-full transition-all duration-700"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
          <p className="text-green-100 text-sm mt-2">
            {500 - state.user.xp} XP until next level
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Stats Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Statistics */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
              Statistics
            </h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="font-medium text-gray-700">{stat.label}</span>
                  </div>
                  <span className="font-bold text-gray-800">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Award className="h-6 w-6 text-yellow-500 mr-2" />
              Badges ({state.user.badges.length})
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {state.achievements
                .filter(achievement => achievement.unlocked)
                .map((badge) => (
                  <div 
                    key={badge.id}
                    className="aspect-square bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl flex flex-col items-center justify-center p-2 hover:shadow-md transition-shadow"
                    title={badge.title}
                  >
                    <span className="text-2xl mb-1">{badge.icon}</span>
                    <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                      {badge.title}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Main Content Column */}
        <div className="lg:col-span-2">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="h-6 w-6 text-blue-600 mr-2" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      activity.action === 'Completed' ? 'bg-green-100 text-green-700' :
                      activity.action === 'Unlocked' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {activity.action === 'Completed' ? '✓' :
                       activity.action === 'Unlocked' ? '🏆' : '▶'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {activity.action} {activity.item}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  {activity.xp > 0 && (
                    <div className="text-right">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                        +{activity.xp} XP
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Learning Goals</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Weekly Learning Streak</span>
                  <span>{state.user.streak}/7 days</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="h-2 bg-white rounded-full"
                    style={{ width: `${Math.min((state.user.streak / 7) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Courses This Month</span>
                  <span>{state.user.coursesCompleted.length}/5 courses</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="h-2 bg-white rounded-full"
                    style={{ width: `${Math.min((state.user.coursesCompleted.length / 5) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};