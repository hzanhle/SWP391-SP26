import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import type { LeaderboardEntry } from '../../types';

// Mock data
const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'user1', userName: 'Alice Johnson', points: 1250, avatar: undefined },
  { rank: 2, userId: 'user2', userName: 'Bob Smith', points: 980, avatar: undefined },
  { rank: 3, userId: 'user3', userName: 'Charlie Brown', points: 850, avatar: undefined },
  { rank: 4, userId: 'user4', userName: 'Diana Prince', points: 720, avatar: undefined },
  { rank: 5, userId: 'user5', userName: 'Ethan Hunt', points: 650, avatar: undefined },
  { rank: 6, userId: 'user6', userName: 'Fiona Green', points: 580, avatar: undefined },
  { rank: 7, userId: 'user7', userName: 'You', points: 450, avatar: undefined },
];

const mockRewards = [
  { id: '1', title: 'Eco Warrior Badge', description: 'Complete 10 reports', pointsRequired: 200, icon: '🏆' },
  { id: '2', title: 'Green Champion', description: 'Complete 25 reports', pointsRequired: 500, icon: '🥇' },
  { id: '3', title: 'Eco Hero', description: 'Complete 50 reports', pointsRequired: 1000, icon: '👑' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const RewardsPage = () => {
  const userPoints = 450;
  const userRank = 7;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rewards & Leaderboard</h1>
        <p className="text-gray-600 mt-1">Earn points and compete with other citizens</p>
      </div>

      {/* User Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Your Points</p>
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-primary-600"
            >
              {userPoints}
            </motion.p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Your Rank</p>
            <p className="text-4xl font-bold text-secondary-600">#{userRank}</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Next Reward</p>
            <p className="text-lg font-semibold text-gray-900">
              {userPoints < 500 ? '500 points' : '1000 points'}
            </p>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Leaderboard</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {mockLeaderboard.map((entry) => (
              <motion.div
                key={entry.userId}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                  entry.userName === 'You'
                    ? 'bg-primary-50 border-2 border-primary-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-10 text-center">
                  <span
                    className={`text-lg font-bold ${
                      entry.rank <= 3 ? 'text-yellow-500' : 'text-gray-500'
                    }`}
                  >
                    {entry.rank}
                  </span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {entry.userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{entry.userName}</p>
                  {entry.userName === 'You' && (
                    <p className="text-xs text-primary-600">That's you!</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{entry.points}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Card>

        {/* Available Rewards */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Rewards</h2>
          <div className="space-y-4">
            {mockRewards.map((reward, index) => {
              const isUnlocked = userPoints >= reward.pointsRequired;
              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${
                    isUnlocked
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{reward.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{reward.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-medium text-gray-700">
                          {reward.pointsRequired} points
                        </span>
                        {isUnlocked && (
                          <span className="text-sm font-medium text-green-600">Unlocked! ✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

