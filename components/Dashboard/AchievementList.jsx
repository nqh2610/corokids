'use client';

import { Trophy, Lock } from 'lucide-react';

/**
 * AchievementList - Danh sách thành tích gần đây
 */
export default function AchievementList({ achievements }) {
  const { total = 0, unlocked = 0, progress = 0, recent = [] } = achievements || {};

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">🏅</span>
          Thành tích
        </h3>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          {unlocked}/{total}
        </span>
      </div>

      {/* Progress bar tổng */}
      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right text-sm text-gray-500 mt-1">{progress}% hoàn thành</div>
      </div>

      {recent.length > 0 ? (
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-600 mb-2">Mở khóa gần đây:</div>
          {recent.map((achievement) => (
            <div 
              key={achievement.id}
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
            >
              <div className="text-3xl">
                {achievement.icon || '🏆'}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-800 truncate">{achievement.name}</h4>
                <p className="text-xs text-gray-500 truncate">{achievement.description}</p>
              </div>
              <div className="text-xs text-gray-400">
                {achievement.unlockedAt && formatTimeAgo(new Date(achievement.unlockedAt))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <Lock size={32} className="mx-auto mb-2 text-gray-300" />
          <p className="text-sm">Chưa có thành tích nào</p>
          <p className="text-xs text-gray-400 mt-1">Hoàn thành bài học để mở khóa!</p>
        </div>
      )}

      {/* Link xem tất cả */}
      {unlocked > 0 && (
        <button className="mt-4 w-full py-2 text-purple-600 text-sm font-medium hover:bg-purple-50 rounded-xl transition-colors">
          Xem tất cả thành tích →
        </button>
      )}
    </div>
  );
}

// Helper function để format thời gian
function formatTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;
  return date.toLocaleDateString('vi-VN');
}
