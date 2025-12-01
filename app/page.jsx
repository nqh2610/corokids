'use client';

import Link from 'next/link';
import { PlayCircle, BookOpen, Trophy, Zap } from 'lucide-react';
import SorobanBoard from '@/components/Soroban/SorobanBoard';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-3xl sm:text-4xl">🧮</div>
            <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">SoroKids</div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <Link href="/login" className="px-3 sm:px-6 py-2 text-sm sm:text-base text-purple-600 font-bold hover:bg-purple-50 rounded-full transition-all">Đăng nhập</Link>
            <Link href="/register" className="px-3 sm:px-6 py-2 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-all">Đăng ký</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Improved */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-24">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-block mb-6 sm:mb-8">
              <div className="text-6xl sm:text-7xl lg:text-9xl">🧮</div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">SoroKids</span>
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-4 sm:mb-6 font-black px-4 leading-tight">
              Tính nhẩm nhanh hơn máy tính<br className="hidden sm:block"/>trong 6 tháng! 🚀
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 px-4 max-w-2xl mx-auto">
              Phương pháp Soroban từ Nhật Bản giúp con phát triển tư duy toán học và tăng khả năng tập trung
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 sm:mb-12 px-4">
              <Link href="/register" className="group px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-lg sm:text-xl font-black shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all flex items-center justify-center gap-3">
                <PlayCircle size={24} className="sm:w-7 sm:h-7" />
                <span>Dùng thử MIỄN PHÍ</span>
              </Link>
              <a href="#demo" className="group px-8 sm:px-12 py-4 sm:py-5 bg-white text-purple-600 rounded-full text-lg sm:text-xl font-black shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all border-2 border-purple-200">
                Xem Demo
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-sm sm:text-base text-gray-600 font-semibold">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Học thử 7 ngày miễn phí</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Không cần thẻ tín dụng</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Hủy bất cứ lúc nào</span>
              </div>
            </div>
          </div>

          {/* Giới thiệu Soroban - Simplified */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-center mb-6 sm:mb-8 text-gray-800">Soroban là gì?</h2>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="text-center md:text-left">
                <div className="text-7xl sm:text-8xl mb-4 sm:mb-6">🧮</div>
                <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                  <strong className="text-blue-600">Soroban</strong> là bàn tính Nhật Bản được sử dụng để dạy toán cho trẻ em hơn 500 năm nay.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="font-bold text-gray-800 text-sm">Tính nhanh</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">🧠</div>
                    <div className="font-bold text-gray-800 text-sm">Tư duy logic</div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">💪</div>
                    <div className="font-bold text-gray-800 text-sm">Tập trung cao</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="font-bold text-gray-800 text-sm">Trí nhớ tốt</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                <h3 className="text-2xl sm:text-3xl font-black mb-6">Điểm khác biệt của SoroKids</h3>
                <ul className="space-y-4 text-base sm:text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">🎮</span>
                    <span><strong>Game hóa học tập</strong> - Con học mà vui</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">🏆</span>
                    <span><strong>Thi đấu trực tuyến</strong> - Động lực cao</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">📊</span>
                    <span><strong>Báo cáo chi tiết</strong> - Phụ huynh yên tâm</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tính năng */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Tính năng nổi bật</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-gray-800">Học tập có hệ thống</h3>
              <p className="text-sm sm:text-base text-gray-600">4 cấp độ từ cơ bản đến nâng cao, phù hợp mọi lứa tuổi</p>
            </div>
            <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-gray-800">Luyện tập hàng ngày</h3>
              <p className="text-sm sm:text-base text-gray-600">Bài tập tự động, kiểm tra tức thì, theo dõi tiến độ</p>
            </div>
            <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-pink-500 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-gray-800">Bảng xếp hạng</h3>
              <p className="text-sm sm:text-base text-gray-600">Thi đấu với bạn bè, tăng động lực học tập</p>
            </div>
          </div>

          {/* Interactive Soroban Demo - Premium Design */}
          <div id="demo" className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 lg:p-14 shadow-2xl mb-8 sm:mb-12 border border-blue-100">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-200/20 to-amber-200/20 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-block mb-4">
                  <div className="relative">
                    <div className="text-6xl sm:text-7xl mb-3 animate-bounce">🧮</div>
                    <div className="absolute inset-0 blur-xl opacity-50 animate-pulse">🧮</div>
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                    Trải nghiệm Soroban ngay!
                  </span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4 font-medium">
                  Không cần đăng ký - Khám phá phép màu tính toán Nhật Bản 🇯🇵
                </p>
              </div>

              {/* Soroban Board with Premium Container */}
              <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/50">
                  <SorobanBoard />
                </div>
              </div>

              {/* Modern How to use Cards */}
              <div className="max-w-3xl mx-auto">
                <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-5 text-center flex items-center justify-center gap-2">
                    <span className="text-2xl">💡</span>
                    Hướng dẫn nhanh
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-white/95 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform">👆</div>
                        <p className="font-bold text-gray-800 text-sm sm:text-base mb-1">Click vào hạt</p>
                        <p className="text-xs sm:text-sm text-gray-600">Di chuyển lên/xuống</p>
                      </div>
                    </div>
                    <div className="bg-white/95 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform">🔴</div>
                        <p className="font-bold text-gray-800 text-sm sm:text-base mb-1">Hạt đỏ</p>
                        <p className="text-xs sm:text-sm text-gray-600">Giá trị = 5 đơn vị</p>
                      </div>
                    </div>
                    <div className="bg-white/95 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform">🟡</div>
                        <p className="font-bold text-gray-800 text-sm sm:text-base mb-1">Hạt vàng</p>
                        <p className="text-xs sm:text-sm text-gray-600">Giá trị = 1 đơn vị</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Tips */}
                  <div className="mt-6 bg-white/20 backdrop-blur rounded-xl p-4 border border-white/30">
                    <p className="text-white text-sm sm:text-base text-center font-semibold">
                      ✨ <strong>Mẹo:</strong> Kết hợp hạt đỏ và hạt vàng để tạo các số từ 0-9 trên mỗi cột!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-center mb-10 sm:mb-12 text-gray-800">
              Phụ huynh nói gì về SoroKids? ⭐
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    H
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">Chị Hương</div>
                    <div className="text-sm text-gray-600">Mẹ bé Minh Anh, 8 tuổi</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Con tôi học được 3 tháng đã tính nhẩm nhanh hơn hẳn. Điểm toán ở trường cũng tăng từ 7 lên 9. Rất hài lòng với SoroKids!"
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-purple-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    T
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">Anh Tuấn</div>
                    <div className="text-sm text-gray-600">Bố bé Bảo Nam, 7 tuổi</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Giao diện game hóa khiến con thích học hơn nhiều. Con giờ chủ động xin học Soroban mỗi ngày. Đáng đồng tiền bát gạo!"
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-pink-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    L
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">Chị Linh</div>
                    <div className="text-sm text-gray-600">Mẹ bé Quỳnh Anh, 9 tuổi</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Tính năng báo cáo tiến độ rất chi tiết. Tôi có thể theo dõi con học đến đâu. Giáo viên hỗ trợ nhiệt tình, giải đáp nhanh!"
                </p>
              </div>
            </div>
          </div>

          {/* CTA - Improved */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl p-10 sm:p-16 text-white text-center shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
                Bắt đầu hành trình học Soroban ngay hôm nay! 🚀
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-10 px-4 max-w-3xl mx-auto">
                Dùng thử <strong>MIỄN PHÍ 7 ngày</strong> - Không cần thẻ tín dụng
              </p>
              <Link href="/register" className="inline-block px-10 sm:px-16 py-4 sm:py-6 bg-white text-purple-600 rounded-full text-xl sm:text-2xl font-black hover:scale-105 transition-all shadow-2xl hover:shadow-white/50">
                Đăng ký ngay
              </Link>
              <p className="mt-6 text-sm sm:text-base text-white/80">
                ⏰ Ưu đãi đặc biệt: Giảm 50% cho 100 học viên đầu tiên!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-12">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">🧮</div>
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">SoroKids</div>
              </div>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Nền tảng học Soroban trực tuyến hàng đầu Việt Nam. Phát triển tư duy toán học cho trẻ từ 5-12 tuổi.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all hover:scale-110" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-500 rounded-full flex items-center justify-center transition-all hover:scale-110" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-all hover:scale-110" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Liên kết */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Liên kết</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Trang chủ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Về chúng tôi</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Khóa học</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bảng giá</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Hỗ trợ */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hướng dẫn sử dụng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Điều khoản sử dụng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Liên hệ</a></li>
              </ul>
            </div>

            {/* Liên hệ */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Liên hệ</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:hello@sorokids.vn" className="hover:text-white transition-colors">hello@sorokids.vn</a>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <a href="tel:0123456789" className="hover:text-white transition-colors">0123 456 789</a>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>Hà Nội, Việt Nam</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center sm:text-left">© 2025 SoroKids. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
