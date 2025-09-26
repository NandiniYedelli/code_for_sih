import React, { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Calendar } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const Leaderboard: React.FC = () => {
  const { state } = useUser();
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  // Mock leaderboard data (in a real app, this would come from an API)
  const leaderboardData = {
    weekly: [
      { id: 1, name: 'EcoExplorer', xp: 2450, level: 5, streak: 12, avatar: '🌿' },
      { id: 2, name: 'GreenGuardian', xp: 2200, level: 4, streak: 8, avatar: '🌱' },
      { id: 3, name: state.user.name, xp: state.user.totalXP, level: state.user.level, streak: state.user.streak, avatar: '🌍' },
      { id: 4, name: 'ClimateChamp', xp: 1800, level: 4, streak: 15, avatar: '⚡' },
      { id: 5, name: 'OceanSaver', xp: 1650, level: 3, streak: 6, avatar: '🌊' },
      { id: 6, name: 'SolarPowered', xp: 1500, level: 3, streak: 9, avatar: '☀️' },
      { id: 7, name: 'WindWatcher', xp: 1350, level: 3, streak: 4, avatar: '💨' },
      { id: 8, name: 'RecycleRanger', xp: 1200, level: 2, streak: 11, avatar: '♻️' }
    ],
    monthly: [
      { id: 1, name: 'EcoExplorer', xp: 8450, level: 8, streak: 25, avatar: '🌿' },
      { id: 2, name: 'ClimateChamp', xp: 7200, level: 7, streak: 22, avatar: '⚡' },
      { id: 3, name: 'GreenGuardian', xp: 6800, level: 6, streak: 18, avatar: '🌱' },
      { id: 4, name: state.user.name, xp: state.user.totalXP, level: state.user.level, streak: state.user.streak, avatar: '🌍' },
      { id: 5, name: 'OceanSaver', xp: 5650, level: 5, streak: 16, avatar: '🌊' }
    ],
    allTime: [
      { id: 1, name: 'EcoMaster', xp: 25450, level: 12, streak: 45, avatar: '👑' },
      { id: 2, name: 'PlanetProtector', xp: 22200, level: 11, streak: 38, avatar: '🌿' },
      { id: 3, name: 'ClimateHero', xp: 18800, level: 9, streak: 42, avatar: '⚡' },
      { id: 4, name: 'GreenLegend', xp: 16650, level: 8, streak: 35, avatar: '🌱' },
      { id: 5, name: state.user.name, xp: state.user.totalXP, level: state.user.level, streak: state.user.streak, avatar: '🌍' }
    ]
  };

  const currentLeaderboard = leaderboardData[timeFilter].sort((a, b) => b.xp - a.xp);
  const userRank = currentLeaderboard.findIndex(user => user.name === state.user.name) + 1;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRowColor = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200';
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-orange-50';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-slate-50';
    if (rank === 3) return 'bg-gradient-to-r from-amber-50 to-yellow-50';
    return 'bg-white';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
          <Trophy className="h-10 w-10 text-yellow-500 mr-3" />
          Leaderboard
        </h1>
        <p className="text-gray-600 text-lg">See how you rank against other eco-learners!</p>
      </div>

      {/* User Stats Card */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Your Current Ranking</h3>
            <div className="flex items-center space-x-6">
              <div>
                <div className="text-3xl font-bold">#{userRank}</div>
                <div className="text-green-100 text-sm">Current Rank</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{state.user.totalXP.toLocaleString()}</div>
                <div className="text-green-100 text-sm">Total XP</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{state.user.streak}</div>
                <div className="text-green-100 text-sm">Day Streak</div>
              </div>
            </div>
          </div>
          <div className="text-6xl">{state.user.name === 'Eco Warrior' ? '🌍' : '👤'}</div>
        </div>
      </div>

      {/* Time Filter */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-xl p-1 shadow-lg">
          {(['weekly', 'monthly', 'allTime'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                timeFilter === filter
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {filter === 'weekly' && 'This Week'}
              {filter === 'monthly' && 'This Month'}
              {filter === 'allTime' && 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
            {timeFilter === 'weekly' && 'Weekly Rankings'}
            {timeFilter === 'monthly' && 'Monthly Rankings'}
            {timeFilter === 'allTime' && 'All-Time Leaders'}
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {currentLeaderboard.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = user.name === state.user.name;
            
            return (
              <div
                key={user.id}
                className={`px-6 py-4 transition-all duration-200 hover:shadow-md ${getRowColor(rank, isCurrentUser)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(rank)}
                    </div>
                    <div className="text-3xl">{user.avatar}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-semibold ${isCurrentUser ? 'text-green-700' : 'text-gray-800'}`}>
                          {user.name}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              You
                            </span>
                          )}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">Level {user.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-gray-800">{user.xp.toLocaleString()}</div>
                      <div className="text-gray-500">XP</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-orange-600">{user.streak}</div>
                      <div className="text-gray-500">Streak</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Section */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Keep Learning, Keep Rising! 🚀</h3>
        <p className="text-purple-100 mb-4">
          Complete more courses and quizzes to climb the leaderboard and earn more XP!
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Daily learning boosts your rank</span>
          </div>
          <div className="flex items-center space-x-1">
            <Trophy className="h-4 w-4" />
            <span>Quiz completion = bonus XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};