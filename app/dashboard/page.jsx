'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Star, Trophy, Zap, LogOut, BookOpen, Target, Users } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/users/profile');
      const data = await response.json();
      setUserData(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (status === 'loading' || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-spin">🧮</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🧮</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SoroKids</h1>
              <p className="text-sm text-gray-600">Xin chào, {userData?.name}!</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-all"
          >
            <LogOut size={20} />
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Star className="text-white" size={40} />
              <div className="text-right">
                <div className="text-4xl font-bold">{userData?.totalStars || 0}</div>
                <div className="text-sm opacity-90">Sao</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="text-white" size={40} />
              <div className="text-right">
                <div className="text-4xl font-bold">{userData?.level || 1}</div>
                <div className="text-sm opacity-90">Cấp độ</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Zap className="text-white" size={40} />
              <div className="text-right">
                <div className="text-4xl font-bold">{userData?.streak || 0}</div>
                <div className="text-sm opacity-90">Streak</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Star className="text-white" size={40} />
              <div className="text-right">
                <div className="text-4xl font-bold">{userData?.diamonds || 0}</div>
                <div className="text-sm opacity-90">Kim cương</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => router.push('/learn')}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all text-left"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Học tập</h3>
            <p className="text-gray-600">Khám phá các bài học Soroban</p>
          </button>

          <button
            onClick={() => router.push('/practice')}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all text-left"
          >
            <div className="text-6xl mb-4">💪</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Luyện tập</h3>
            <p className="text-gray-600">Rèn luyện kỹ năng tính toán</p>
          </button>

          <button
            onClick={() => router.push('/leaderboard')}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all text-left"
          >
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Bảng xếp hạng</h3>
            <p className="text-gray-600">So tài với bạn bè</p>
          </button>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Tiến độ học tập</h3>
          <div className="space-y-4">
            {[
              { level: 1, name: 'Làm quen Soroban', progress: 100, color: 'bg-green-500' },
              { level: 2, name: 'Cộng trừ nâng cao', progress: 75, color: 'bg-blue-500' },
              { level: 3, name: 'Nhân chia cơ bản', progress: 40, color: 'bg-purple-500' },
              { level: 4, name: 'Tính nhẩm Anzan', progress: 10, color: 'bg-pink-500' },
            ].map((item) => (
              <div key={item.level} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-700">Level {item.level}: {item.name}</span>
                  <span className="text-gray-600">{item.progress}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
