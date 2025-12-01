'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Trophy, Zap, Target, Clock, Star } from 'lucide-react';
import { useToast } from '@/components/Toast/ToastContext';
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';

export default function PracticePage() {
  const { status } = useSession();
  const router = useRouter();
  const toast = useToast();

  const [mode, setMode] = useState(null); // null, 'addition', 'subtraction', 'multiplication', 'division', 'mixed'
  const [difficulty, setDifficulty] = useState(1); // 1-5
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [sessionStats, setSessionStats] = useState({ stars: 0, correct: 0, total: 0, startTime: Date.now() });
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const timerRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  // Optimized timer using ref to avoid re-renders
  useEffect(() => {
    if (problem && result === null) {
      intervalRef.current = setInterval(() => {
        timerRef.current += 1;
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [problem, result]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="text-5xl sm:text-6xl animate-spin">🧮</div>
      </div>
    );
  }

  const generateProblem = (modeType, diff) => {
    const ranges = {
      1: { min: 1, max: 20 },
      2: { min: 10, max: 50 },
      3: { min: 20, max: 100 },
      4: { min: 50, max: 200 },
      5: { min: 100, max: 500 }
    };

    const range = ranges[diff];
    let num1, num2, op, answer;

    switch (modeType) {
      case 'addition':
        num1 = Math.floor(Math.random() * (range.max - range.min)) + range.min;
        num2 = Math.floor(Math.random() * (range.max - range.min)) + range.min;
        op = '+';
        answer = num1 + num2;
        break;
      case 'subtraction':
        num1 = Math.floor(Math.random() * (range.max - range.min)) + range.min;
        num2 = Math.floor(Math.random() * num1) + 1;
        op = '-';
        answer = num1 - num2;
        break;
      case 'multiplication':
        num1 = Math.floor(Math.random() * 12) + 2;
        num2 = Math.floor(Math.random() * 12) + 2;
        op = '×';
        answer = num1 * num2;
        break;
      case 'division':
        num2 = Math.floor(Math.random() * 10) + 2;
        answer = Math.floor(Math.random() * 20) + 1;
        num1 = num2 * answer;
        op = '÷';
        break;
      case 'mixed':
        const ops = ['+', '-', '×', '÷'];
        op = ops[Math.floor(Math.random() * ops.length)];
        return generateProblem(op === '+' ? 'addition' : op === '-' ? 'subtraction' : op === '×' ? 'multiplication' : 'division', diff);
    }

    return { num1, num2, op, answer, startTime: Date.now() };
  };

  const startMode = (selectedMode) => {
    setMode(selectedMode);
    const newProblem = generateProblem(selectedMode, difficulty);
    setProblem(newProblem);
    setAnswer('');
    setResult(null);
    timerRef.current = 0;
  };

  const checkAnswer = async () => {
    if (!answer) {
      toast.warning('Vui lòng nhập đáp án!');
      return;
    }

    const timeTaken = timerRef.current;
    const isCorrect = parseInt(answer) === problem.answer;

    setResult(isCorrect);

    // Update streak
    if (isCorrect) {
      setStreak(prev => prev + 1);
      if (streak + 1 >= 5) {
        setShowConfetti(true);
        toast.success(`🎉 Streak ${streak + 1}! Tuyệt vời!`, 2000);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        toast.success('Chính xác! 👏');
      }
    } else {
      setStreak(0);
      toast.error('Chưa đúng, cố gắng lần sau nhé!');
    }

    // Save to database
    try {
      const response = await fetch('/api/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseType: mode,
          difficulty,
          problem: `${problem.num1} ${problem.op} ${problem.num2}`,
          userAnswer: answer,
          correctAnswer: problem.answer.toString(),
          isCorrect,
          timeTaken
        })
      });

      const data = await response.json();
      if (data.success) {
        setSessionStats(prev => ({
          ...prev,
          stars: prev.stars + (data.starsEarned || 0),
          correct: prev.correct + (isCorrect ? 1 : 0),
          total: prev.total + 1
        }));

        if (data.starsEarned > 0) {
          toast.info(`Bạn nhận được ${data.starsEarned} ⭐`);
        }
      }
    } catch (error) {
      console.error('Error saving exercise:', error);
      toast.error('Không thể lưu kết quả. Vui lòng thử lại!');
    }
  };

  const nextProblem = () => {
    const newProblem = generateProblem(mode, difficulty);
    setProblem(newProblem);
    setAnswer('');
    setResult(null);
    timerRef.current = 0;
  };

  const changeDifficulty = (newDiff) => {
    setDifficulty(newDiff);
    if (mode) {
      const newProblem = generateProblem(mode, newDiff);
      setProblem(newProblem);
      setAnswer('');
      setResult(null);
      timerRef.current = 0;
    }
  };

  const handleExitMode = () => {
    if (sessionStats.total > 0) {
      setShowExitDialog(true);
    } else {
      setMode(null);
    }
  };

  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-bold">Quay lại Dashboard</span>
          </button>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 text-gray-800">Luyện tập hàng ngày 💪</h2>
            <p className="text-sm sm:text-base text-center text-gray-600">Chọn chế độ luyện tập phù hợp với bạn</p>
          </div>

          {/* Difficulty selector */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Độ khó</h3>
            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {[1, 2, 3, 4, 5].map(diff => (
                <button
                  key={diff}
                  onClick={() => changeDifficulty(diff)}
                  className={`py-2 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    difficulty === diff
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105 focus:ring-blue-400'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400'
                  }`}
                  aria-label={`Độ khó ${diff} sao`}
                >
                  {'⭐'.repeat(diff)}
                </button>
              ))}
            </div>
          </div>

          {/* Mode selection */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { mode: 'addition', title: 'Phép cộng', icon: '➕', color: 'from-green-400 to-green-600', desc: 'Luyện tập phép cộng' },
              { mode: 'subtraction', title: 'Phép trừ', icon: '➖', color: 'from-blue-400 to-blue-600', desc: 'Luyện tập phép trừ' },
              { mode: 'multiplication', title: 'Phép nhân', icon: '✖️', color: 'from-purple-400 to-purple-600', desc: 'Luyện tập bảng nhân' },
              { mode: 'division', title: 'Phép chia', icon: '➗', color: 'from-pink-400 to-pink-600', desc: 'Luyện tập phép chia' },
              { mode: 'mixed', title: 'Hỗn hợp', icon: '🎲', color: 'from-orange-400 to-red-600', desc: 'Kết hợp tất cả phép tính' }
            ].map(item => (
              <button
                key={item.mode}
                onClick={() => startMode(item.mode)}
                className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{item.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{item.desc}</p>
                <div className={`mt-3 sm:mt-4 py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r ${item.color} text-white rounded-full font-bold text-sm sm:text-base text-center`}>
                  Bắt đầu
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4 sm:p-6">
      {/* Exit Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        onConfirm={() => {
          setMode(null);
          setSessionStats({ stars: 0, correct: 0, total: 0, startTime: Date.now() });
        }}
        title="Thoát chế độ luyện tập?"
        message={`Bạn đã hoàn thành ${sessionStats.correct}/${sessionStats.total} bài. Bạn có chắc muốn thoát?`}
        confirmText="Thoát"
        cancelText="Tiếp tục"
        type="warning"
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={handleExitMode}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-bold">Đổi chế độ</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="bg-white px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg flex items-center gap-2 flex-1 sm:flex-none justify-center">
              <Zap size={18} className="sm:w-5 sm:h-5 text-orange-500" />
              <span className="text-sm sm:text-base font-bold">{streak} Streak</span>
            </div>
          </div>
        </div>

        {/* Problem card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl mb-6 sm:mb-8 relative overflow-hidden">
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-5xl sm:text-6xl animate-bounce">
                🎉
              </div>
            </div>
          )}

          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 px-4 sm:px-8 py-2 sm:py-4 rounded-full mb-4 sm:mb-6">
              <span className="text-base sm:text-xl font-bold text-gray-700">Độ khó: {'⭐'.repeat(difficulty)}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 mb-6 sm:mb-8">
            <div className="text-center">
              <div className="text-4xl sm:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 sm:mb-8">
                {problem?.num1} {problem?.op} {problem?.num2} = ?
              </div>

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={answer}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9-]/g, '');
                  setAnswer(value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (result === null) {
                      checkAnswer();
                    } else {
                      nextProblem();
                    }
                  }
                }}
                placeholder="Nhập đáp án"
                disabled={result !== null}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold text-center w-full max-w-md px-4 sm:px-8 py-3 sm:py-6 rounded-2xl sm:rounded-3xl border-4 border-blue-300 focus:border-purple-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                autoFocus
                aria-label="Nhập đáp án"
              />

              <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                {result === null ? (
                  <button
                    onClick={checkAnswer}
                    disabled={!answer}
                    className="px-8 sm:px-12 py-3 sm:py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-lg sm:text-xl lg:text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Kiểm tra
                  </button>
                ) : (
                  <button
                    onClick={nextProblem}
                    className="px-8 sm:px-12 py-3 sm:py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-lg sm:text-xl lg:text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Bài tiếp theo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Result */}
          {result !== null && (
            <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center ${result ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className="text-5xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4">{result ? '🎉' : '😢'}</div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{result ? 'Chính xác!' : 'Chưa đúng!'}</div>
              {!result && (
                <div className="text-lg sm:text-xl lg:text-2xl text-gray-700">Đáp án đúng: {problem.answer}</div>
              )}
              {result && (
                <div className="text-lg sm:text-xl lg:text-2xl text-green-700">+{10 * difficulty} ⭐</div>
              )}
            </div>
          )}
        </div>

        {/* Session stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-xl text-center">
            <Star size={24} className="sm:w-10 sm:h-10 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{sessionStats.stars}</div>
            <div className="text-xs sm:text-sm opacity-90">Sao kiếm được</div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-xl text-center">
            <Trophy size={24} className="sm:w-10 sm:h-10 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{sessionStats.correct}</div>
            <div className="text-xs sm:text-sm opacity-90">Đúng</div>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-xl text-center">
            <Target size={24} className="sm:w-10 sm:h-10 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{sessionStats.total}</div>
            <div className="text-xs sm:text-sm opacity-90">Tổng số</div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-xl text-center">
            <Zap size={24} className="sm:w-10 sm:h-10 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0}%
            </div>
            <div className="text-xs sm:text-sm opacity-90">Độ chính xác</div>
          </div>
        </div>
      </div>
    </div>
  );
}
