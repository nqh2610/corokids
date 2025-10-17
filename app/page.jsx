'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlayCircle, BookOpen, Trophy, Zap } from 'lucide-react';

export default function HomePage() {
  const [floatOffset, setFloatOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatOffset(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🧮</div>
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">SoroKids</div>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-6 py-2 text-purple-600 font-bold hover:bg-purple-50 rounded-full transition-all">Đăng nhập</Link>
            <Link href="/register" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-all">Đăng ký</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <div className="inline-block animate-bounce mb-6">
              <div className="text-8xl">🧮</div>
            </div>
            <h1 className="text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">SoroKids</span>
            </h1>
            <p className="text-3xl text-gray-700 mb-4 font-semibold">Học Toán Tư Duy Siêu Nhanh với Bàn Tính Soroban!</p>
            <p className="text-xl text-gray-600 mb-8">Phương pháp học tính nhẩm thần kỳ từ Nhật Bản 🇯🇵</p>
            <div className="flex justify-center gap-4 mb-12">
              <Link href="/register" className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all flex items-center gap-3">
                <PlayCircle size={28} />
                Bắt đầu học ngay!
              </Link>
            </div>
            <div className="flex justify-center gap-8 mb-12">
              <div className="bg-white/80 backdrop-blur rounded-2xl px-8 py-4 shadow-lg">
                <div className="text-3xl font-bold text-blue-600">5,247</div>
                <div className="text-sm text-gray-600">Học viên</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl px-8 py-4 shadow-lg">
                <div className="text-3xl font-bold text-purple-600">12,893</div>
                <div className="text-sm text-gray-600">Bài tập</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl px-8 py-4 shadow-lg">
                <div className="text-3xl font-bold text-pink-600">98%</div>
                <div className="text-sm text-gray-600">Hài lòng</div>
              </div>
            </div>
          </div>

          {/* Giới thiệu Soroban */}
          <div className="bg-white rounded-3xl p-12 shadow-2xl mb-12">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Soroban là gì?</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-8xl mb-6 text-center">🧮</div>
                <p className="text-lg text-gray-700 mb-4"><strong>Soroban</strong> là bàn tính Nhật Bản - một công cụ học toán truyền thống giúp trẻ em:</p>
                <ul className="space-y-3 text-gray-700">
                  <li>✓ Tính toán nhanh và chính xác</li>
                  <li>✓ Phát triển tư duy logic</li>
                  <li>✓ Tăng cường trí nhớ</li>
                  <li>✓ Cải thiện khả năng tập trung</li>
                  <li>✓ Rèn luyện kỹ năng giải quyết vấn đề</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">Tại sao chọn SoroKids?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>🎮 <strong>Game hóa</strong> - Học mà vui như chơi game</li>
                  <li>📚 <strong>Từ cơ bản đến nâng cao</strong> - 4 cấp độ hoàn chỉnh</li>
                  <li>🏆 <strong>Thi đấu</strong> - So tài với bạn bè toàn quốc</li>
                  <li>📊 <strong>Theo dõi tiến độ</strong> - Báo cáo chi tiết cho phụ huynh</li>
                  <li>🧠 <strong>Tính nhẩm Anzan</strong> - Tính toán không cần bàn tính</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tính năng */}
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Tính năng nổi bật</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <BookOpen className="w-16 h-16 text-blue-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Học tập có hệ thống</h3>
              <p className="text-gray-600">4 cấp độ từ cơ bản đến nâng cao, phù hợp mọi lứa tuổi</p>
            </div>
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <Zap className="w-16 h-16 text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Luyện tập hàng ngày</h3>
              <p className="text-gray-600">Bài tập tự động, kiểm tra tức thì, theo dõi tiến độ</p>
            </div>
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <Trophy className="w-16 h-16 text-pink-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Bảng xếp hạng</h3>
              <p className="text-gray-600">Thi đấu với bạn bè, tăng động lực học tập</p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Sẵn sàng bắt đầu?</h2>
            <p className="text-xl mb-8">Tham gia cùng hàng ngàn học viên đang học Soroban!</p>
            <Link href="/register" className="inline-block px-12 py-5 bg-white text-purple-600 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-2xl">Đăng ký miễn phí</Link>
            <p className="mt-6 text-sm opacity-90">Tài khoản demo: demo@sorokids.com / 123456</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 SoroKids. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}
