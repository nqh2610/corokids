import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '../components/SessionProvider';
import { ToastProvider } from '../components/Toast/ToastContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SoroKids - Học Soroban',
  description: 'Học tính toán nhanh với bàn tính Soroban',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <SessionProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
