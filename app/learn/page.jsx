'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, PlayCircle } from 'lucide-react';

export default function LearnPage() {
  const { status } = useSession();
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState(1);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl sm:text-5xl animate-spin">🧮</div>
      </div>
    );
  }

  const levels = [
    { id: 1, title: 'Làm quen Soroban', icon: '🌱', lessons: 8, color: 'from-green-400 to-green-600', topics: ['Cấu tạo bàn tính', 'Biểu diễn số 0-9', 'Cộng đơn giản', 'Trừ đơn giản'] },
    { id: 2, title: 'Cộng trừ nâng cao', icon: '🌿', lessons: 12, color: 'from-blue-400 to-blue-600', topics: ['Số 2-3 chữ số', 'Cộng có nhớ', 'Trừ có nhớ', 'Kỹ thuật bàn 5'] },
    { id: 3, title: 'Nhân chia cơ bản', icon: '🌳', lessons: 15, color: 'from-purple-400 to-purple-600', topics: ['Bảng nhân', 'Nhân 1 chữ số', 'Chia đơn giản', 'Số thập phân'] },
    { id: 4, title: 'Tính nhẩm Anzan', icon: '🧠', lessons: 20, color: 'from-pink-400 to-pink-600', topics: ['Hình dung bàn tính', 'Flash Anzan', 'Tính nhẩm nhanh', 'Thử thách tốc độ'] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-bold">Quay lại Dashboard</span>
        </button>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Hành trình học tập 🚀</h2>
          <p className="text-sm sm:text-base text-gray-600">Chọn cấp độ phù hợp với bạn</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {levels.map((level) => (
            <div
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`group cursor-pointer bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all ${selectedLevel === level.id ? 'ring-4 ring-purple-500' : ''}`}
              tabIndex={0}
              role="button"
              aria-pressed={selectedLevel === level.id}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedLevel(level.id);
                }
              }}
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="text-5xl sm:text-6xl">{level.icon}</div>
                <div className={`px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r ${level.color} text-white rounded-full text-xs sm:text-sm font-bold`}>
                  {level.lessons} bài học
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{level.title}</h3>
              <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                {level.topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                    <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-r ${level.color}`} />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
              {level.id === selectedLevel && (
                <div className={`mt-4 sm:mt-6 w-full py-3 sm:py-4 bg-gradient-to-r ${level.color} text-white rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold shadow-lg flex items-center justify-center gap-2`}>
                  <PlayCircle size={20} className="sm:w-6 sm:h-6" />
                  Đã chọn
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hint for Floating Soroban */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-400 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-lg">
          <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🧮</div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            Luyện tập với Bàn tính Soroban
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-4">
            Click vào nút bàn tính ở góc dưới bên phải để mở bàn tính tương tác và luyện tập bất kỳ lúc nào!
          </p>
          <div className="flex items-center justify-center gap-2 text-amber-700 font-semibold">
            <span className="text-lg sm:text-xl">👉</span>
            <span className="text-sm sm:text-base">Xem ở góc dưới bên phải</span>
            <span className="text-2xl sm:text-3xl animate-bounce">🧮</span>
          </div>
        </div>
      </div>
    </div>
  );
}
