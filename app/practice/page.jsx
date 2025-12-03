'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Trophy, Zap, Clock, SkipForward, Home, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/Toast/ToastContext';
import SorobanBoard from '@/components/Soroban/SorobanBoard';
import { calculatePracticeStars } from '@/lib/gamification';

const TOTAL_CHALLENGES = 10; // Mỗi màn có 10 thử thách

// Thông điệp động viên game hóa theo tốc độ
const speedTiers = {
  godlike: {
    threshold: 0.25, // ≤25% thời gian
    multiplier: 3,
    messages: [
      { text: 'THẦN TỐC!', emoji: '⚡' },
      { text: 'SIÊU NHANH!', emoji: '💨' },
      { text: 'KHÔNG THỂ TIN!', emoji: '🤯' },
      { text: 'ĐỈNH CỦA ĐỈNH!', emoji: '🏆' },
    ],
    color: 'from-cyan-400 to-blue-500',
    textColor: 'text-cyan-400'
  },
  fast: {
    threshold: 0.5, // ≤50% thời gian
    multiplier: 2,
    messages: [
      { text: 'NHANH NHƯ CHỚP!', emoji: '🚀' },
      { text: 'TỐC ĐỘ ÁNH SÁNG!', emoji: '✨' },
      { text: 'SIÊU TỐC!', emoji: '💫' },
      { text: 'QUÁI VẬT TỐC ĐỘ!', emoji: '🐆' },
    ],
    color: 'from-green-400 to-emerald-500',
    textColor: 'text-green-400'
  },
  good: {
    threshold: 0.75, // ≤75% thời gian
    multiplier: 1.5,
    messages: [
      { text: 'XUẤT SẮC!', emoji: '🌟' },
      { text: 'TUYỆT VỜI!', emoji: '🎉' },
      { text: 'GIỎI LẮM!', emoji: '👏' },
      { text: 'CỪ KHÔI!', emoji: '💪' },
    ],
    color: 'from-yellow-400 to-orange-500',
    textColor: 'text-yellow-400'
  },
  normal: {
    threshold: 1, // >75% thời gian
    multiplier: 1,
    messages: [
      { text: 'ĐÚNG RỒI!', emoji: '✅' },
      { text: 'CHÍNH XÁC!', emoji: '✓' },
      { text: 'TỐT LẮM!', emoji: '👍' },
      { text: 'HAY LẮM!', emoji: '😊' },
    ],
    color: 'from-gray-400 to-gray-500',
    textColor: 'text-white'
  }
};

const streakMessages = [
  { streak: 3, text: 'COMBO x3!', emoji: '🔥' },
  { streak: 5, text: 'UNSTOPPABLE!', emoji: '💥' },
  { streak: 7, text: 'DOMINATING!', emoji: '👑' },
  { streak: 10, text: 'LEGENDARY!', emoji: '🏆' },
];

const difficultyInfo = {
  1: { label: 'Tập Sự', emoji: '🐣' },
  2: { label: 'Chiến Binh', emoji: '⚔️' },
  3: { label: 'Dũng Sĩ', emoji: '🛡️' },
  4: { label: 'Cao Thủ', emoji: '🔥' },
  5: { label: 'Huyền Thoại', emoji: '👑' }
};

const modeInfo = {
  addition: { title: 'Siêu Cộng', icon: '🌟', symbol: '+', color: 'from-emerald-500 to-green-600' },
  subtraction: { title: 'Siêu Trừ', icon: '👾', symbol: '-', color: 'from-blue-500 to-cyan-600' },
  addSubMixed: { title: 'Cộng Trừ Mix', icon: '⚔️', symbol: '±', color: 'from-teal-500 to-emerald-600' },
  multiplication: { title: 'Siêu Nhân', icon: '✨', symbol: '×', color: 'from-purple-500 to-pink-600' },
  division: { title: 'Siêu Chia', icon: '🍕', symbol: '÷', color: 'from-rose-500 to-red-600' },
  mulDiv: { title: 'Nhân Chia Mix', icon: '🎩', symbol: '×÷', color: 'from-amber-500 to-orange-600' },
  mixed: { title: 'Tứ Phép Thần', icon: '👑', symbol: '∞', color: 'from-indigo-500 to-purple-600' },
  mentalMath: { title: 'Siêu Trí Tuệ', icon: '🧠', symbol: '💭', color: 'from-violet-500 to-fuchsia-600', isMental: true },
};

export default function PracticePage() {
  const { status } = useSession();
  const router = useRouter();
  const toast = useToast();

  const [mode, setMode] = useState(null);
  const [difficulty, setDifficulty] = useState(1);
  const [problem, setProblem] = useState(null);
  const [sorobanValue, setSorobanValue] = useState(0);
  const [result, setResult] = useState(null);
  const [sessionStats, setSessionStats] = useState({ stars: 0, correct: 0, total: 0, totalTime: 0 });
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0); // Combo cao nhất trong session
  const [currentChallenge, setCurrentChallenge] = useState(1);
  const [challengeResults, setChallengeResults] = useState([]); // ['correct', 'wrong', 'skipped', ...]
  const [gameComplete, setGameComplete] = useState(false);
  const timerRef = useRef(0);
  const intervalRef = useRef(null);
  const [displayTimer, setDisplayTimer] = useState(0);
  const [sorobanKey, setSorobanKey] = useState(0);
  const [celebration, setCelebration] = useState(null);
  const [celebrationData, setCelebrationData] = useState(null);
  const [mentalAnswer, setMentalAnswer] = useState(''); // Đáp án nhập cho mode Siêu Trí Tuệ
  const [mentalSubMode, setMentalSubMode] = useState(null); // Sub-mode cho Siêu Trí Tuệ
  const mentalInputRef = useRef(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  useEffect(() => {
    if (problem && result === null) {
      intervalRef.current = setInterval(() => {
        timerRef.current += 1;
        setDisplayTimer(timerRef.current);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [problem, result]);

  // Clear celebration after animation
  useEffect(() => {
    if (celebration) {
      const timer = setTimeout(() => {
        setCelebration(null);
        setCelebrationData(null);
        // Auto chuyển câu sau khi ăn mừng
        if (celebration === 'correct') {
          goToNextChallenge();
        }
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [celebration]);

  // Auto-focus input cho mode Siêu Trí Tuệ và bắt phím số toàn cục
  useEffect(() => {
    if (mode === 'mentalMath' && mentalSubMode && result === null) {
      // Focus ngay khi vào mode
      mentalInputRef.current?.focus();
      
      // Bắt phím số toàn cục để trẻ em không cần click vào input
      const handleGlobalKeyDown = (e) => {
        // Chỉ xử lý khi đang ở mode mental và chưa có kết quả
        if (mode !== 'mentalMath' || !mentalSubMode || result !== null) return;
        
        // Nếu là số (0-9)
        if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          setMentalAnswer(prev => prev + e.key);
          mentalInputRef.current?.focus();
        }
        // Backspace để xóa
        else if (e.key === 'Backspace') {
          e.preventDefault();
          setMentalAnswer(prev => prev.slice(0, -1));
          mentalInputRef.current?.focus();
        }
        // Enter để submit
        else if (e.key === 'Enter') {
          e.preventDefault();
          handleMentalSubmit();
        }
        // Minus cho số âm (nếu cần)
        else if (e.key === '-' && mentalAnswer === '') {
          e.preventDefault();
          setMentalAnswer('-');
          mentalInputRef.current?.focus();
        }
      };
      
      window.addEventListener('keydown', handleGlobalKeyDown);
      return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }
  }, [mode, mentalSubMode, result, mentalAnswer]);

  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">⚔️</div>
          <div className="text-white font-bold">Đang tải...</div>
        </div>
      </div>
    );
  }

  const generateProblem = (modeType, diff) => {
    const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Độ khó theo số chữ số: 1⭐=1 chữ số, 2⭐=2 chữ số, ...
    const digitRanges = {
      1: { min: 1, max: 9 },
      2: { min: 10, max: 99 },
      3: { min: 100, max: 999 },
      4: { min: 1000, max: 9999 },
      5: { min: 10000, max: 99999 }
    };

    // Tối đa 3 số hạng
    const termCounts = { 1: 2, 2: 2, 3: 3, 4: 3, 5: 3 };
    
    const mulDivRanges = {
      1: { mulMax: 9, divMax: 9 },
      2: { mulMax: 12, divMax: 12 },
      3: { mulMax: 20, divMax: 15 },
      4: { mulMax: 30, divMax: 20 },
      5: { mulMax: 50, divMax: 30 }
    };

    const range = digitRanges[diff];
    const termCount = termCounts[diff];
    const mulDiv = mulDivRanges[diff];
    
    let answer, displayProblem, numbers = [], operations = [];

    switch (modeType) {
      case 'addition': {
        // Tối đa 3 số hạng
        const count = Math.min(3, 2 + Math.floor(Math.random() * 2));
        for (let i = 0; i < count; i++) {
          numbers.push(randRange(range.min, range.max));
        }
        answer = numbers.reduce((a, b) => a + b, 0);
        displayProblem = numbers.join(' + ');
        break;
      }
      case 'subtraction': {
        // Tối đa 3 số hạng
        const count = Math.min(3, 2 + Math.floor(Math.random() * 2));
        let total = randRange(range.max, range.max * 2);
        numbers.push(total);
        for (let i = 1; i < count; i++) {
          const maxSub = Math.floor(total * 0.4);
          const sub = randRange(range.min, Math.max(range.min, maxSub));
          numbers.push(sub);
          total -= sub;
        }
        answer = numbers.reduce((a, b, i) => i === 0 ? b : a - b, 0);
        displayProblem = numbers.join(' - ');
        break;
      }
      case 'addSubMixed': {
        // Tối đa 3 số hạng
        const count = Math.min(3, 2 + Math.floor(Math.random() * 2));
        let runningTotal = randRange(range.max, range.max * 2);
        numbers.push(runningTotal);
        for (let i = 1; i < count; i++) {
          const useAdd = Math.random() > 0.5;
          if (useAdd) {
            const num = randRange(range.min, range.max);
            numbers.push(num);
            operations.push('+');
            runningTotal += num;
          } else {
            const maxSub = Math.floor(runningTotal * 0.3);
            const num = randRange(range.min, Math.max(range.min, maxSub));
            numbers.push(num);
            operations.push('-');
            runningTotal -= num;
          }
        }
        answer = runningTotal;
        displayProblem = numbers[0] + operations.map((op, i) => ` ${op} ${numbers[i + 1]}`).join('');
        break;
      }
      case 'multiplication': {
        const num1 = randRange(2, mulDiv.mulMax);
        const num2 = randRange(2, mulDiv.mulMax);
        answer = num1 * num2;
        displayProblem = `${num1} × ${num2}`;
        break;
      }
      case 'division': {
        const divisor = randRange(2, mulDiv.divMax);
        const quotient = randRange(2, Math.min(mulDiv.divMax, Math.floor(range.max / divisor)));
        const dividend = divisor * quotient;
        answer = quotient;
        displayProblem = `${dividend} ÷ ${divisor}`;
        break;
      }
      case 'mulDiv': {
        if (Math.random() > 0.5) {
          const num1 = randRange(2, mulDiv.mulMax);
          const num2 = randRange(2, mulDiv.mulMax);
          answer = num1 * num2;
          displayProblem = `${num1} × ${num2}`;
        } else {
          const divisor = randRange(2, mulDiv.divMax);
          const quotient = randRange(2, Math.min(mulDiv.divMax, Math.floor(range.max / divisor)));
          const dividend = divisor * quotient;
          answer = quotient;
          displayProblem = `${dividend} ÷ ${divisor}`;
        }
        break;
      }
      case 'mixed': {
        const modes = ['addition', 'subtraction', 'addSubMixed', 'multiplication', 'division', 'mulDiv'];
        return generateProblem(modes[Math.floor(Math.random() * modes.length)], diff);
      }
    }

    const baseTime = diff * 10 + 10;
    const complexity = (displayProblem?.match(/[+\-×÷]/g) || []).length;
    
    return { numbers, operations, answer, displayProblem, recommendedTime: baseTime + complexity * 5 };
  };

  const startMode = (selectedMode) => {
    // Nếu là mentalMath, cần chọn sub-mode trước
    if (selectedMode === 'mentalMath') {
      setMode('mentalMath');
      setMentalSubMode(null); // Reset sub-mode để hiện màn chọn
      return;
    }
    
    setMode(selectedMode);
    setProblem(generateProblem(selectedMode, difficulty));
    setSorobanValue(0);
    setMentalAnswer('');
    setResult(null);
    timerRef.current = 0;
    setDisplayTimer(0);
    setSessionStats({ stars: 0, correct: 0, total: 0, totalTime: 0 });
    setStreak(0);
    setMaxStreak(0);
    setCurrentChallenge(1);
    setChallengeResults([]);
    setGameComplete(false);
    setSorobanKey(prev => prev + 1);
  };

  const startMentalMode = (subMode) => {
    setMentalSubMode(subMode);
    const actualMode = subMode === 'mixed' ? getRandomMentalMode() : subMode;
    setProblem(generateProblem(actualMode, difficulty));
    setSorobanValue(0);
    setMentalAnswer('');
    setResult(null);
    timerRef.current = 0;
    setDisplayTimer(0);
    setSessionStats({ stars: 0, correct: 0, total: 0, totalTime: 0 });
    setStreak(0);
    setMaxStreak(0);
    setCurrentChallenge(1);
    setChallengeResults([]);
    setGameComplete(false);
    setSorobanKey(prev => prev + 1);
    setTimeout(() => mentalInputRef.current?.focus(), 100);
  };

  const getRandomMentalMode = () => {
    const modes = ['addition', 'subtraction', 'multiplication', 'division', 'addSubMixed'];
    return modes[Math.floor(Math.random() * modes.length)];
  };

  const handleSorobanChange = (value) => {
    setSorobanValue(value);
    // Auto-check khi đáp án đúng
    if (value === problem?.answer && result === null) {
      autoCheckAnswer(value);
    }
  };

  const autoCheckAnswer = async (value) => {
    const isCorrect = value === problem.answer;
    setResult(isCorrect);
    const timeTaken = timerRef.current;

    const timeRatio = timeTaken / problem?.recommendedTime;
    const newStreak = isCorrect ? streak + 1 : 0;
    
    // Xác định tier dựa trên tốc độ (cho hiển thị animation)
    let speedTier;
    if (timeRatio <= speedTiers.godlike.threshold) {
      speedTier = speedTiers.godlike;
    } else if (timeRatio <= speedTiers.fast.threshold) {
      speedTier = speedTiers.fast;
    } else if (timeRatio <= speedTiers.good.threshold) {
      speedTier = speedTiers.good;
    } else {
      speedTier = speedTiers.normal;
    }
    
    // Tính sao tạm thời cho hiển thị instant feedback
    const instantStars = isCorrect ? Math.round((1 + difficulty) * speedTier.multiplier) : 0;

    // Lưu kết quả câu này
    setChallengeResults(prev => [...prev, isCorrect ? 'correct' : 'wrong']);

    if (isCorrect) {
      // Cập nhật max streak
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
      
      // Chọn thông điệp ngẫu nhiên từ tier tương ứng
      const msgIndex = Math.floor(Math.random() * speedTier.messages.length);
      const selectedMessage = speedTier.messages[msgIndex];
      
      let celebData = { 
        text: selectedMessage.text, 
        emoji: selectedMessage.emoji, 
        starsEarned: instantStars,
        multiplier: speedTier.multiplier,
        tierColor: speedTier.color,
        tierTextColor: speedTier.textColor,
        timeRatio
      };
      
      // Kiểm tra streak bonus
      const streakBonus = streakMessages.find(s => s.streak === newStreak);
      if (streakBonus) {
        celebData = { ...celebData, streakBonus };
      }
      
      setCelebrationData(celebData);
      setCelebration('correct');
      setStreak(newStreak);
    } else {
      setStreak(0);
    }

    // Cập nhật stats: track totalTime và correct/total
    setSessionStats(prev => ({
      stars: prev.stars + instantStars, // Tạm thời cho display
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
      totalTime: prev.totalTime + timeTaken
    }));

    try {
      await fetch('/api/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseType: mode,
          difficulty,
          problem: problem.displayProblem,
          userAnswer: value.toString(),
          correctAnswer: problem.answer.toString(),
          isCorrect,
          timeTaken
        })
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const goToNextChallenge = () => {
    if (currentChallenge >= TOTAL_CHALLENGES) {
      // Hoàn thành màn chơi
      setGameComplete(true);
      return;
    }
    
    // Reset và sang câu tiếp
    setCurrentChallenge(prev => prev + 1);
    
    let actualMode;
    if (mode === 'mentalMath') {
      actualMode = mentalSubMode === 'mixed' ? getRandomMentalMode() : mentalSubMode;
    } else {
      actualMode = mode;
    }
    
    setProblem(generateProblem(actualMode, difficulty));
    setSorobanValue(0);
    setMentalAnswer('');
    setResult(null);
    timerRef.current = 0;
    setDisplayTimer(0);
    setSorobanKey(prev => prev + 1); // Reset Soroban
    
    // Focus vào input nếu là mental math
    if (mode === 'mentalMath') {
      setTimeout(() => mentalInputRef.current?.focus(), 100);
    }
  };

  const nextProblem = () => {
    goToNextChallenge();
  };

  const skipProblem = () => {
    // Hiện đáp án, cho phép xem lại, không tự chuyển bài
    setResult(false);
    setStreak(0);
    setChallengeResults(prev => [...prev, 'skipped']);
    setSessionStats(prev => ({ ...prev, total: prev.total + 1 }));
  };

  const resetSoroban = () => {
    setSorobanKey(prev => prev + 1);
    setSorobanValue(0);
  };

  const restartGame = () => {
    setCurrentChallenge(1);
    setChallengeResults([]);
    
    let actualMode;
    if (mode === 'mentalMath') {
      actualMode = mentalSubMode === 'mixed' ? getRandomMentalMode() : mentalSubMode;
    } else {
      actualMode = mode;
    }
    
    setProblem(generateProblem(actualMode, difficulty));
    setSorobanValue(0);
    setMentalAnswer('');
    setResult(null);
    timerRef.current = 0;
    setDisplayTimer(0);
    setSessionStats({ stars: 0, correct: 0, total: 0, totalTime: 0 });
    setStreak(0);
    setMaxStreak(0);
    setGameComplete(false);
    setSorobanKey(prev => prev + 1);
    
    if (mode === 'mentalMath') {
      setTimeout(() => mentalInputRef.current?.focus(), 100);
    }
  };

  // Xử lý submit đáp án cho mode Siêu Trí Tuệ
  const handleMentalSubmit = () => {
    const answer = parseInt(mentalAnswer, 10);
    if (isNaN(answer) || result !== null) return;
    autoCheckAnswer(answer);
  };

  const handleMentalKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleMentalSubmit();
    }
  };

  // Lấy thông tin mode hiện tại
  const currentModeInfo = mode ? modeInfo[mode] : null;
  const isMentalMode = mode === 'mentalMath';

  // Sub-mode info cho Siêu Trí Tuệ
  const mentalSubModes = [
    { id: 'addition', title: 'Cộng', icon: '➕', color: 'from-emerald-400 to-green-500' },
    { id: 'subtraction', title: 'Trừ', icon: '➖', color: 'from-blue-400 to-cyan-500' },
    { id: 'multiplication', title: 'Nhân', icon: '✖️', color: 'from-purple-400 to-pink-500' },
    { id: 'division', title: 'Chia', icon: '➗', color: 'from-rose-400 to-red-500' },
    { id: 'addSubMixed', title: 'Cộng Trừ', icon: '🔀', color: 'from-teal-400 to-emerald-500' },
    { id: 'mulDiv', title: 'Nhân Chia', icon: '🎲', color: 'from-amber-400 to-orange-500' },
    { id: 'mixed', title: 'Tất Cả', icon: '🌈', color: 'from-indigo-500 to-purple-600' },
  ];

  // Màn hình chọn sub-mode cho Siêu Trí Tuệ
  if (mode === 'mentalMath' && !mentalSubMode) {
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMode(null)}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur rounded-xl text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft size={18} />
            <span className="font-medium text-sm">Quay lại</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span className="text-2xl">🧠</span> Siêu Trí Tuệ
          </h1>
          <div className="w-20"></div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col px-4 pb-4 min-h-0">
          {/* Difficulty selector */}
          <div className="flex-shrink-0 bg-white/10 backdrop-blur rounded-2xl p-3 mb-3">
            <h3 className="text-sm font-bold text-white/80 mb-2 text-center">🎯 Cấp Độ</h3>
            <div className="flex justify-center gap-2">
              {[
                { level: 1, label: 'Tập Sự', emoji: '🐣', color: 'from-green-400 to-emerald-500' },
                { level: 2, label: 'Chiến Binh', emoji: '⚔️', color: 'from-blue-400 to-cyan-500' },
                { level: 3, label: 'Dũng Sĩ', emoji: '🛡️', color: 'from-yellow-400 to-orange-500' },
                { level: 4, label: 'Cao Thủ', emoji: '🔥', color: 'from-orange-400 to-red-500' },
                { level: 5, label: 'Huyền Thoại', emoji: '👑', color: 'from-purple-400 to-pink-500' }
              ].map(item => (
                <button
                  key={item.level}
                  onClick={() => setDifficulty(item.level)}
                  className={`relative px-3 py-2 rounded-xl font-bold transition-all transform hover:scale-105 ${
                    difficulty === item.level
                      ? `bg-gradient-to-br ${item.color} text-white shadow-lg scale-110 ring-2 ring-white`
                      : 'bg-white/20 text-white/80 hover:bg-white/30'
                  }`}
                >
                  <div className="text-2xl">{item.emoji}</div>
                  <div className="text-xs font-semibold mt-1">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sub-mode selection */}
          <div className="flex-shrink-0 mb-3">
            <h3 className="text-sm font-bold text-white/80 mb-2 text-center">🧮 Chọn Phép Tính</h3>
          </div>

          {/* Sub-mode grid */}
          <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 gap-3 auto-rows-fr">
            {mentalSubModes.map(item => (
              <button
                key={item.id}
                onClick={() => startMentalMode(item.id)}
                className={`bg-gradient-to-br ${item.color} rounded-2xl p-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-95 transition-all text-white flex flex-col items-center justify-center relative overflow-hidden group ${
                  item.id === 'mixed' ? 'col-span-3 sm:col-span-1 ring-2 ring-yellow-400' : ''
                }`}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
                <div className="text-4xl sm:text-5xl mb-2 drop-shadow-lg z-10">{item.icon}</div>
                <div className="text-base sm:text-lg font-black z-10">{item.title}</div>
                {item.id === 'mixed' && (
                  <div className="text-xs opacity-80 z-10">Random!</div>
                )}
              </button>
            ))}
          </div>

          {/* Hint */}
          <div className="flex-shrink-0 mt-3 text-center">
            <p className="text-white/60 text-sm">
              💡 Tính nhẩm không cần bàn tính - Thử thách trí não của bạn!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mode selection screen - Game hóa, vừa đủ màn hình
  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Header - compact */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur rounded-xl text-white hover:bg-white/20 transition-all"
            >
              <Home size={18} />
              <span className="font-medium text-sm">Trang chủ</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span className="text-2xl">⚔️</span> Đấu Trường Luyện Tập
            </h1>
            <div className="w-20"></div>
          </div>

          {/* Difficulty selector with descriptions */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-4">
            <h3 className="text-sm font-bold text-white/80 mb-3 text-center">🎯 Chọn Cấp Độ</h3>
            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
              {[
                { level: 1, label: 'Tập Sự', emoji: '🐣', color: 'from-green-400 to-emerald-500', desc: 'Số 1-9, 2 số hạng' },
                { level: 2, label: 'Chiến Binh', emoji: '⚔️', color: 'from-blue-400 to-cyan-500', desc: 'Số 1-50, 3 số hạng' },
                { level: 3, label: 'Dũng Sĩ', emoji: '🛡️', color: 'from-yellow-400 to-orange-500', desc: 'Số 1-100, 4 số hạng' },
                { level: 4, label: 'Cao Thủ', emoji: '🔥', color: 'from-orange-400 to-red-500', desc: 'Số 1-500, 5 số hạng' },
                { level: 5, label: 'Huyền Thoại', emoji: '👑', color: 'from-purple-400 to-pink-500', desc: 'Số 1-999, 6 số hạng' }
              ].map(item => (
                <button
                  key={item.level}
                  onClick={() => setDifficulty(item.level)}
                  className={`relative px-3 py-2 rounded-xl font-bold transition-all transform hover:scale-105 min-w-[80px] ${
                    difficulty === item.level
                      ? `bg-gradient-to-br ${item.color} text-white shadow-lg scale-110 ring-2 ring-white`
                      : 'bg-white/20 text-white/80 hover:bg-white/30'
                  }`}
                >
                  <div className="text-2xl">{item.emoji}</div>
                  <div className="text-xs font-semibold mt-1">{item.label}</div>
                </button>
              ))}
            </div>
            {/* Mô tả cấp độ đang chọn */}
            <div className="mt-3 text-center">
              <p className="text-white/70 text-sm">
                {difficulty === 1 && '🐣 Tập Sự: Luyện tập với số có 1 chữ số'}
                {difficulty === 2 && '⚔️ Chiến Binh: Luyện tập với số có 2 chữ số'}
                {difficulty === 3 && '🛡️ Dũng Sĩ: Luyện tập với số có 3 chữ số'}
                {difficulty === 4 && '🔥 Cao Thủ: Luyện tập với số có 4 chữ số'}
                {difficulty === 5 && '👑 Huyền Thoại: Luyện tập với số có 5 chữ số'}
              </p>
            </div>
          </div>

          {/* Mode grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { mode: 'addition', title: 'Siêu Cộng', icon: '🌟', symbol: '+', color: 'from-emerald-400 to-green-500', desc: 'Gom sao!' },
              { mode: 'subtraction', title: 'Siêu Trừ', icon: '👾', symbol: '-', color: 'from-blue-400 to-cyan-500', desc: 'Diệt quái!' },
              { mode: 'addSubMixed', title: 'Cộng Trừ Mix', icon: '⚔️', symbol: '±', color: 'from-teal-400 to-emerald-500', desc: 'Hỗn chiến!' },
              { mode: 'multiplication', title: 'Siêu Nhân', icon: '✨', symbol: '×', color: 'from-purple-400 to-pink-500', desc: 'Nhân bội!' },
              { mode: 'division', title: 'Siêu Chia', icon: '🍕', symbol: '÷', color: 'from-rose-400 to-red-500', desc: 'Chia đều!' },
              { mode: 'mulDiv', title: 'Nhân Chia Mix', icon: '🎩', symbol: '×÷', color: 'from-amber-400 to-orange-500', desc: 'Phép thuật!' },
              { mode: 'mixed', title: 'Tứ Phép Thần', icon: '👑', symbol: '∞', color: 'from-indigo-500 to-purple-600', desc: 'Boss cuối!' },
              { mode: 'mentalMath', title: 'Siêu Trí Tuệ', icon: '🧠', symbol: '💭', color: 'from-violet-500 to-fuchsia-600', desc: 'Không bàn tính!', special: true }
            ].map(item => (
              <button
                key={item.mode}
                onClick={() => startMode(item.mode)}
                className={`bg-gradient-to-br ${item.color} rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-95 transition-all text-white flex flex-col items-center justify-center relative overflow-hidden group min-h-[140px] ${
                  item.special ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-purple-900' : ''
                }`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
                
                {/* Icon */}
                <div className="text-4xl sm:text-5xl mb-2 drop-shadow-lg z-10">{item.icon}</div>
                
                {/* Symbol badge */}
                <div className="absolute top-2 right-2 bg-white/30 rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                  {item.symbol}
                </div>
                
                {/* Title */}
                <div className="text-base sm:text-lg font-black z-10">{item.title}</div>
                
                {/* Desc */}
                <div className="text-xs opacity-80 z-10">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Practice screen
  // Thời gian hợp lý: cơ bản 15s + 5s/độ khó + 3s/phép tính
  const baseTime = 15 + difficulty * 5 + ((problem?.displayProblem?.match(/[+\-×÷]/g) || []).length) * 3;
  const timePercent = Math.min(100, (displayTimer / baseTime) * 100);
  const timerColor = timePercent < 60 ? 'bg-green-500' : timePercent < 85 ? 'bg-yellow-500' : 'bg-red-500';
  
  const accuracy = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0;
  const isAnswerCorrect = sorobanValue === problem?.answer;
  const hasInput = sorobanValue !== 0;
  const showingAnswer = result === false;

  // Game Complete Screen
  if (gameComplete) {
    // Tính sao cuối cùng dùng công thức mới
    const avgTimePerQuestion = sessionStats.totalTime / Math.max(1, sessionStats.total);
    const finalStarsData = calculatePracticeStars(
      sessionStats.correct,
      sessionStats.total,
      difficulty,
      avgTimePerQuestion,
      maxStreak
    );
    
    const grade = accuracy >= 90 ? 'S' : accuracy >= 70 ? 'A' : accuracy >= 50 ? 'B' : 'C';
    const gradeColors = { S: 'text-yellow-400', A: 'text-green-400', B: 'text-blue-400', C: 'text-gray-400' };
    const gradeEmojis = { S: '👑', A: '🌟', B: '⭐', C: '💪' };
    
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center">
          {/* Trophy */}
          <div className="text-7xl mb-4 animate-bounce">{gradeEmojis[grade]}</div>
          
          {/* Title */}
          <h1 className="text-3xl font-black text-white mb-2">HOÀN THÀNH!</h1>
          <p className="text-white/70 mb-4">{currentModeInfo?.title} - Cấp {difficulty}</p>
          
          {/* Grade */}
          <div className={`text-8xl font-black ${gradeColors[grade]} mb-4`}>
            {grade}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-2xl">⭐</div>
              <div className="text-2xl font-black text-yellow-400">{finalStarsData.totalStars}</div>
              <div className="text-xs text-white/60">Sao</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-2xl">✓</div>
              <div className="text-2xl font-black text-green-400">{sessionStats.correct}/{TOTAL_CHALLENGES}</div>
              <div className="text-xs text-white/60">Đúng</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-2xl">🔥</div>
              <div className="text-2xl font-black text-orange-400">{maxStreak}</div>
              <div className="text-xs text-white/60">Combo</div>
            </div>
          </div>
          
          {/* Breakdown chi tiết sao */}
          <div className="bg-white/5 rounded-xl p-3 mb-4 text-left">
            <div className="text-xs text-white/60 mb-2 text-center font-semibold">Chi tiết điểm sao</div>
            {finalStarsData.breakdown.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm py-1 border-b border-white/10 last:border-0">
                <span className="text-white/80">
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </span>
                <span className="text-yellow-400 font-bold">+{item.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center text-base pt-2 mt-2 border-t border-white/30">
              <span className="text-white font-bold">Tổng cộng</span>
              <span className="text-yellow-400 font-black text-lg">⭐ {finalStarsData.totalStars}</span>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={restartGame}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              🔄 Chơi lại
            </button>
            <button
              onClick={() => setMode(null)}
              className="flex-1 py-3 px-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors"
            >
              📋 Chọn mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Celebration Popup - Game hóa theo tốc độ */}
      {celebration === 'correct' && celebrationData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-center animate-scale-up">
            {/* Main emoji */}
            <div className="text-7xl sm:text-8xl mb-3 animate-bounce drop-shadow-2xl">
              {celebrationData.emoji}
            </div>
            
            {/* Message với màu theo tier */}
            <div className={`text-3xl sm:text-4xl font-black mb-2 drop-shadow-lg animate-pulse ${celebrationData.tierTextColor}`}>
              {celebrationData.text}
            </div>
            
            {/* Speed multiplier badge */}
            {celebrationData.multiplier > 1 && (
              <div className={`inline-block bg-gradient-to-r ${celebrationData.tierColor} text-white px-4 py-1 rounded-full font-black text-lg sm:text-xl mb-2 shadow-lg`}>
                x{celebrationData.multiplier} ĐIỂM!
              </div>
            )}
            
            {/* Streak bonus */}
            {celebrationData.streakBonus && (
              <div className="text-xl sm:text-2xl text-orange-400 font-black mb-2 animate-pulse">
                {celebrationData.streakBonus.emoji} {celebrationData.streakBonus.text}
              </div>
            )}
            
            {/* Stars earned với animation */}
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(Math.min(5, Math.ceil(celebrationData.starsEarned / 2)))].map((_, i) => (
                <span key={i} className="text-3xl sm:text-4xl animate-spin-slow" style={{ animationDelay: `${i * 0.1}s` }}>
                  ⭐
                </span>
              ))}
            </div>
            <div className={`text-xl sm:text-2xl font-bold ${celebrationData.tierTextColor}`}>
              +{celebrationData.starsEarned} sao
            </div>
          </div>
        </div>
      )}

      {/* Top bar - Compact Game style */}
      <div className={`bg-gradient-to-r ${currentModeInfo?.color || 'from-violet-500 to-purple-600'} shadow-lg flex-shrink-0`}>
        <div className="max-w-6xl mx-auto px-3 py-2 flex items-center gap-3">
          {/* Left: Navigation */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button 
              onClick={() => router.push('/dashboard')} 
              className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
              title="Về trang chủ"
            >
              <Home size={16} />
            </button>
            <button 
              onClick={() => {
                if (isMentalMode) {
                  setMentalSubMode(null); // Về màn chọn sub-mode
                } else {
                  setMode(null); // Về màn chọn mode
                }
              }} 
              className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
              title="Chọn chế độ khác"
            >
              <ArrowLeft size={16} />
            </button>
          </div>
          
          {/* Center: Progress bar with status */}
          <div className="flex-1 flex items-center gap-2">
            {/* Progress dots - shows correct/wrong/skipped status */}
            <div className="flex gap-0.5 flex-1">
              {[...Array(TOTAL_CHALLENGES)].map((_, i) => {
                const challengeNum = i + 1;
                const resultStatus = challengeResults[i]; // 'correct', 'wrong', 'skipped', or undefined
                let dotClass = 'bg-white/30'; // chưa làm
                
                if (challengeNum < currentChallenge) {
                  // Câu đã hoàn thành
                  if (resultStatus === 'correct') {
                    dotClass = 'bg-green-400'; // đúng
                  } else if (resultStatus === 'wrong') {
                    dotClass = 'bg-red-400'; // sai
                  } else if (resultStatus === 'skipped') {
                    dotClass = 'bg-yellow-400'; // bỏ qua
                  }
                } else if (challengeNum === currentChallenge) {
                  dotClass = 'bg-white animate-pulse'; // đang làm
                }
                
                return (
                  <div
                    key={i}
                    className={`h-2.5 flex-1 rounded-full transition-all ${dotClass}`}
                    title={resultStatus === 'correct' ? 'Đúng ✓' : resultStatus === 'wrong' ? 'Sai ✗' : resultStatus === 'skipped' ? 'Bỏ qua' : ''}
                  />
                );
              })}
            </div>
            
            {/* Challenge counter */}
            <div className="bg-white/30 px-2 py-0.5 rounded-full text-white font-bold text-xs whitespace-nowrap">
              {currentChallenge}/{TOTAL_CHALLENGES}
            </div>
          </div>
          
          {/* Right: Mode, Level & Stats */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <div className="bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="text-xs sm:text-sm">{difficultyInfo[difficulty]?.emoji}</span>
              <span className="text-white font-bold text-[10px] sm:text-xs hidden xs:inline">{difficultyInfo[difficulty]?.label}</span>
              <span className="text-white/60 text-[10px] sm:text-xs hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm">{currentModeInfo?.icon}</span>
              <span className="text-white font-bold text-[10px] sm:text-xs">
                {isMentalMode && mentalSubMode 
                  ? `${currentModeInfo?.title} (${mentalSubModes.find(m => m.id === mentalSubMode)?.title || ''})`
                  : currentModeInfo?.title
                }
              </span>
            </div>
            <div className="bg-yellow-400/90 text-yellow-900 px-1.5 sm:px-2 py-0.5 rounded-full font-bold text-[10px] sm:text-xs shadow">
              +{sessionStats.stars}
            </div>
            {streak >= 2 && (
              <div className="bg-orange-500 text-white px-1.5 sm:px-2 py-0.5 rounded-full font-bold text-[10px] sm:text-xs shadow animate-pulse">
                🔥{streak}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Problem display - Compact & Bold */}
      <div className="flex-shrink-0 bg-white/10 backdrop-blur">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-center gap-2 sm:gap-4">
          {/* Problem */}
          <div className="text-white font-black text-xl sm:text-3xl md:text-4xl">
            {problem?.displayProblem}
          </div>
          
          {/* Equals */}
          <div className="text-white/60 text-xl sm:text-3xl md:text-4xl">=</div>
          
          {/* Answer box - khác nhau cho Soroban vs Mental */}
          {isMentalMode ? (
            // Input cho mode Siêu Trí Tuệ - luôn focus
            <input
              ref={mentalInputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={mentalAnswer}
              onChange={(e) => {
                // Chỉ cho phép số và dấu trừ ở đầu
                const val = e.target.value;
                if (/^-?\d*$/.test(val)) {
                  setMentalAnswer(val);
                }
              }}
              onKeyDown={handleMentalKeyDown}
              onBlur={() => {
                // Auto re-focus khi mất focus (trừ khi đã có kết quả)
                if (result === null) {
                  setTimeout(() => mentalInputRef.current?.focus(), 10);
                }
              }}
              disabled={result !== null}
              placeholder="?"
              autoFocus
              autoComplete="off"
              className={`font-black text-xl sm:text-3xl md:text-4xl px-3 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl w-20 sm:w-28 text-center transition-all outline-none caret-purple-500 ${
                result === true
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' 
                  : showingAnswer
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white text-purple-700 shadow-lg ring-2 sm:ring-4 ring-white/50'
              }`}
            />
          ) : (
            // Display box cho Soroban mode
            <div className={`font-black text-xl sm:text-3xl md:text-4xl px-4 sm:px-6 py-1 sm:py-2 rounded-xl sm:rounded-2xl min-w-[80px] sm:min-w-[100px] text-center transition-all ${
              result === true
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' 
                : showingAnswer
                  ? 'bg-yellow-500 text-white'
                  : hasInput 
                    ? 'bg-white text-purple-700 shadow-lg' 
                    : 'bg-white/20 text-white/50'
            }`}>
              {showingAnswer ? problem?.answer : (hasInput ? sorobanValue : '?')}
            </div>
          )}
          
          {/* Timer */}
          <div className={`${timerColor} text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl font-bold flex items-center gap-1 sm:gap-2 shadow-lg text-sm sm:text-base`}>
            <Clock size={14} className="sm:w-[18px] sm:h-[18px]" />
            <span>{displayTimer}s</span>
          </div>
        </div>
      </div>

      {/* Action buttons - Compact */}
      <div className="flex-shrink-0 bg-black/20">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center gap-2 sm:gap-3">
          {showingAnswer && (
            <span className="text-green-400 font-bold text-xs sm:text-sm bg-green-400/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
              ✓ {problem?.answer}
            </span>
          )}
          
          {result === null && !isMentalMode && (
            <button
              onClick={skipProblem}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/10 text-white/80 hover:bg-white/20 font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-colors"
            >
              💡 Bỏ qua
            </button>
          )}
          
          {result === null && isMentalMode && (
            <>
              <button
                onClick={handleMentalSubmit}
                disabled={!mentalAnswer}
                className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                ✓ Trả lời
              </button>
              <button
                onClick={skipProblem}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/10 text-white/80 hover:bg-white/20 font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-colors"
              >
                💡 Bỏ qua
              </button>
            </>
          )}
          
          {(result !== null || showingAnswer) && (
            <button
              onClick={nextProblem}
              className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              {currentChallenge >= TOTAL_CHALLENGES ? '🏆 Kết thúc' : '⚡ Tiếp'}
            </button>
          )}
          
          {!isMentalMode && (
            <button
              onClick={resetSoroban}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/10 text-white/80 hover:bg-white/20 font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-colors"
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Soroban hoặc Mental Math UI */}
      {isMentalMode ? (
        // Mental Math UI - compact và responsive, dùng vh để đảm bảo vừa màn hình
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-2 overflow-hidden">
          <div className="text-center w-full max-w-[280px]">
            {/* Icon và tiêu đề - rất compact */}
            <div className="text-3xl sm:text-5xl mb-1">🧠</div>
            <p className="text-white/80 text-[10px] sm:text-xs mb-2">
              Nhập số → <span className="bg-green-500 px-1 py-0.5 rounded font-bold">Enter</span>
            </p>
            
            {/* Numpad - responsive, chiều cao tự động co giãn */}
            <div className="grid grid-cols-3 gap-1 sm:gap-1.5 mx-auto">
              {[1,2,3,4,5,6,7,8,9].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    if (result !== null) return;
                    setMentalAnswer(prev => prev + num);
                    mentalInputRef.current?.focus();
                  }}
                  disabled={result !== null}
                  className="bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg p-2 sm:p-3 text-white font-bold text-base sm:text-xl transition-all active:scale-95 disabled:opacity-50"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => {
                  if (result !== null) return;
                  setMentalAnswer(prev => prev.slice(0, -1));
                  mentalInputRef.current?.focus();
                }}
                disabled={result !== null}
                className="bg-red-500/70 hover:bg-red-500 active:bg-red-600 rounded-lg p-2 sm:p-3 text-white font-bold text-xs sm:text-sm transition-all active:scale-95 disabled:opacity-50"
              >
                ⌫
              </button>
              <button
                onClick={() => {
                  if (result !== null) return;
                  setMentalAnswer(prev => prev + '0');
                  mentalInputRef.current?.focus();
                }}
                disabled={result !== null}
                className="bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg p-2 sm:p-3 text-white font-bold text-base sm:text-xl transition-all active:scale-95 disabled:opacity-50"
              >
                0
              </button>
              <button
                onClick={() => {
                  if (result !== null) return;
                  handleMentalSubmit();
                }}
                disabled={result !== null || !mentalAnswer}
                className="bg-green-500 hover:bg-green-400 active:bg-green-600 rounded-lg p-2 sm:p-3 text-white font-bold text-xs sm:text-sm transition-all active:scale-95 disabled:opacity-50"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Soroban - fills remaining space
        <div className="flex-1 min-h-0 flex items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-2xl">
            <SorobanBoard 
              mode="free" 
              compact={false}
              showHints={true}
              resetKey={sorobanKey}
              onValueChange={handleSorobanChange}
            />
          </div>
        </div>
      )}

      {/* Custom animation styles */}
      <style jsx global>{`
        @keyframes scale-up {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up {
          animation: scale-up 0.5s ease-out forwards;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .animate-spin-slow {
          animation: spin-slow 1s ease-in-out infinite;
        }
        @keyframes pulse-subtle {
          0%, 100% { box-shadow: 0 0 0 4px rgba(255,255,255,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(255,255,255,0.3); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        /* Ẩn spinner cho input number */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
