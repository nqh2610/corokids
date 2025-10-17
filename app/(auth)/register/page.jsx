'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, UserCircle, Chrome } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Đã xảy ra lỗi');
        return;
      }

      router.push('/login?registered=true');
    } catch (error) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧮</div>
            <h2 className="text-3xl font-bold text-gray-800">Đăng ký</h2>
            <p className="text-gray-600 mt-2">Tạo tài khoản mới</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-3 mb-6"
          >
            <Chrome size={24} className="text-blue-500" />
            Đăng ký bằng Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                <User size={18} className="inline mr-2" />Họ tên
              </label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none" placeholder="Nguyễn Văn A" required />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                <UserCircle size={18} className="inline mr-2" />Tên đăng nhập
              </label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none" placeholder="nguyenvana" required />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                <Mail size={18} className="inline mr-2" />Email
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none" placeholder="email@example.com" required />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                <Lock size={18} className="inline mr-2" />Mật khẩu
              </label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none" placeholder="••••••" required />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Xác nhận mật khẩu</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none" placeholder="••••••" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50">
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Đã có tài khoản? <Link href="/login" className="text-purple-600 font-bold hover:underline">Đăng nhập</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
