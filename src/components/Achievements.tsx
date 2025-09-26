import React from 'react';
import { Lock, CheckCircle, TrendingUp } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const Achievements: React.FC = () => {
  const { state } = useUser();

  const unlockedAchievements = state.achievements.filter(a => a.unlocked);
  const lockedAchievements = state.achievements.filter(a => !a.unlocked);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Achievements</h1>
        <p className="text-gray-600 text-lg">
          You've unlocked {unlockedAchievements.length} of {state.achievements.length} achievements
        </p>
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-lg inline-block">
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{unlockedAchievements.length}</div>
              <div className="text-sm text-gray-500">Unlocked</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{state.user.totalXP.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total XP</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{state.user.level}</div>
              <div className="text-sm text-gray-500">Level</div>
            </div>
          </div>
        </div>
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            Unlocked Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unlockedAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{achievement.icon}</span>
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                <div className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full inline-block">
                  Completed ✓
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Lock className="h-8 w-8 text-gray-400 mr-3" />
            Locked Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg opacity-75">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl grayscale">{achievement.icon}</span>
                  <Lock className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                
                {achievement.progress !== undefined && achievement.maxProgress && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300"
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full inline-block">
                  {achievement.progress !== undefined 
                    ? `${Math.round((achievement.progress! / achievement.maxProgress!) * 100)}% Complete`
                    : 'Locked'
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievement Tips */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-8 w-8 mr-3" />
          <h3 className="text-2xl font-bold">Achievement Tips</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Daily Learning</h4>
            <p className="text-blue-100 text-sm">Complete lessons daily to build your streak and unlock streak-based achievements.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quiz Master</h4>
            <p className="text-blue-100 text-sm">Take quizzes after each course to test your knowledge and earn bonus XP.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Course Explorer</h4>
            <p className="text-blue-100 text-sm">Try courses from different categories to unlock diverse learning achievements.</p>
          </div>
        </div>
      </div>
    </div>
  );
};