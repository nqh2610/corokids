'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import SorobanBoard from '@/components/Soroban/SorobanBoard';

export default function LearnPage() {
  const { status } = useSession();
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showSoroban, setShowSoroban] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-spin">🧮</div>
      </div>
    );
  }

  const levels = [
    { id: 1, title: 'Lam quen Soroban', icon: '🌱', lessons: 8, color: 'from-green-400 to-green-600', topics: ['Cau tao ban tinh', 'Bieu dien so 0-9', 'Cong don gian', 'Tru don gian'] },
    { id: 2, title: 'Cong tru nang cao', icon: '🌿', lessons: 12, color: 'from-blue-400 to-blue-600', topics: ['So 2-3 chu so', 'Cong co nho', 'Tru co nho', 'Ky thuat ban 5'] },
    { id: 3, title: 'Nhan chia co ban', icon: '🌳', lessons: 15, color: 'from-purple-400 to-purple-600', topics: ['Bang nhan', 'Nhan 1 chu so', 'Chia don gian', 'So thap phan'] },
    { id: 4, title: 'Tinh nham Anzan', icon: '🧠', lessons: 20, color: 'from-pink-400 to-pink-600', topics: ['Hinh dung ban tinh', 'Flash Anzan', 'Tinh nham nhanh', 'Thu thach toc do'] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 mb-6 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all">
          <ArrowLeft size={20} />
          <span className="font-bold">Quay lai Dashboard</span>
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Hanh trinh hoc tap 🚀</h2>
          <p className="text-gray-600">Chon cap do phu hop voi ban</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {levels.map((level) => (
            <div
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`group cursor-pointer bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all ${selectedLevel === level.id ? 'ring-4 ring-purple-500' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-6xl">{level.icon}</div>
                <div className={`px-4 py-2 bg-gradient-to-r ${level.color} text-white rounded-full text-sm font-bold`}>
                  {level.lessons} bai hoc
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{level.title}</h3>
              <div className="space-y-2 mb-4">
                {level.topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-600">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${level.color}`} />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
              {level.id === selectedLevel && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSoroban(true);
                  }}
                  className={`mt-6 w-full py-4 bg-gradient-to-r ${level.color} text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2`}
                >
                  <PlayCircle size={24} />
                  Bat dau hoc
                </button>
              )}
            </div>
          ))}
        </div>

        {showSoroban && (
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-gray-800">Ban tinh tuong tac 🧮</h3>
              <button
                onClick={() => setShowSoroban(false)}
                className="px-6 py-3 bg-gray-200 rounded-full font-bold hover:bg-gray-300 transition-all"
              >
                ✕ Dong
              </button>
            </div>
            <SorobanBoard />
          </div>
        )}
      </div>
    </div>
  );
}
