'use client';

import { useState, useEffect } from 'react';
import { HelpCircle, Lightbulb, RotateCcw, Check } from 'lucide-react';

export default function SorobanBoard({ targetNumber, mode = 'free', onCorrect, showHints = true }) {
  const [beads, setBeads] = useState([
    [false, true, true, true, true],
    [false, true, true, true, true],
    [false, true, true, true, true],
    [false, true, true, true, true],
    [false, true, true, true, true]
  ]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [hint, setHint] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [celebrateBeads, setCelebrateBeads] = useState([]);

  const tutorials = [
    {
      title: 'Chào mừng đến với Soroban!',
      description: 'Bàn tính Soroban có 5 cột, mỗi cột đại diện cho một hàng số (đơn vị, chục, trăm, nghìn, vạn).',
      highlight: null
    },
    {
      title: 'Hạt trên (Heaven Bead)',
      description: 'Hạt màu đỏ ở trên có giá trị là 5. Click vào để đẩy xuống.',
      highlight: 'heaven'
    },
    {
      title: 'Hạt dưới (Earth Beads)',
      description: 'Mỗi hạt màu vàng ở dưới có giá trị là 1. Click vào để đẩy lên.',
      highlight: 'earth'
    },
    {
      title: 'Thử tạo số!',
      description: 'Hãy thử tạo số 3 bằng cách đẩy 3 hạt dưới lên ở cột đơn vị (cột phải cùng).',
      highlight: null
    }
  ];

  useEffect(() => {
    const total = calculateTotalValue();
    setCurrentNumber(total);

    if (mode === 'practice' && targetNumber !== undefined) {
      if (total === targetNumber) {
        setIsCorrect(true);
        if (onCorrect) {
          setTimeout(() => onCorrect(), 500);
        }
      } else {
        setIsCorrect(false);
      }
    }
  }, [beads, mode, targetNumber, onCorrect]);

  const calculateValue = (col) => {
    const heaven = beads[col][0] ? 5 : 0;
    const earth = beads[col].slice(1).filter(b => !b).length;
    return heaven + earth;
  };

  const calculateTotalValue = () => {
    let total = 0;
    for (let i = 0; i < 5; i++) {
      total += calculateValue(i) * Math.pow(10, 4 - i);
    }
    return total;
  };

  const toggleBead = (col, row) => {
    const newBeads = [...beads];
    if (row === 0) {
      newBeads[col][0] = !newBeads[col][0];
    } else {
      const currentState = newBeads[col][row];
      if (currentState) {
        for (let i = 1; i <= row; i++) {
          newBeads[col][i] = false;
        }
      } else {
        for (let i = 4; i >= row; i--) {
          newBeads[col][i] = true;
        }
      }
    }
    setBeads(newBeads);

    // Celebrate effect
    setCelebrateBeads([`${col}-${row}`]);
    setTimeout(() => setCelebrateBeads([]), 500);
  };

  const reset = () => {
    setBeads([
      [false, true, true, true, true],
      [false, true, true, true, true],
      [false, true, true, true, true],
      [false, true, true, true, true],
      [false, true, true, true, true]
    ]);
    setCurrentNumber(0);
    setHint('');
    setIsCorrect(false);
  };

  const showHintForTarget = () => {
    if (targetNumber === undefined) {
      setHint('Hãy thử tạo các số khác nhau bằng cách click vào các hạt!');
      return;
    }

    const digits = targetNumber.toString().padStart(5, '0').split('').map(Number);
    const colIndex = 4; // Start with units column
    const digit = digits[colIndex];

    if (digit === 0) {
      setHint('Đảm bảo tất cả hạt ở vị trí ban đầu cho số 0');
    } else if (digit <= 4) {
      setHint(`Đẩy ${digit} hạt dưới lên ở cột đơn vị`);
    } else if (digit === 5) {
      setHint('Đẩy hạt trên xuống ở cột đơn vị');
    } else {
      setHint(`Đẩy hạt trên xuống và ${digit - 5} hạt dưới lên ở cột đơn vị`);
    }
  };

  const nextTutorialStep = () => {
    if (tutorialStep < tutorials.length - 1) {
      setTutorialStep(prev => prev + 1);
    } else {
      setShowTutorial(false);
      setTutorialStep(0);
    }
  };

  const prevTutorialStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(prev => prev - 1);
    }
  };

  return (
    <div className="relative">
      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-50 rounded-3xl flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl p-8 max-w-md shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {tutorials[tutorialStep].title}
              </h3>
              <p className="text-gray-600">{tutorials[tutorialStep].description}</p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={prevTutorialStep}
                disabled={tutorialStep === 0}
                className="px-6 py-3 bg-gray-200 rounded-full font-bold hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Quay lại
              </button>

              <div className="flex gap-2">
                {tutorials.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === tutorialStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTutorialStep}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold hover:shadow-lg transition-all"
              >
                {tutorialStep === tutorials.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 relative">
        {/* Header with improved hierarchy */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-white rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-xl transform group-hover:scale-105 transition-all">
                <div className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Kết quả</div>
                <div className={`text-3xl sm:text-5xl lg:text-6xl font-black transition-all duration-300 ${
                  isCorrect ? 'text-green-600 scale-110' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                }`}>
                  {currentNumber.toLocaleString('vi-VN')}
                </div>
              </div>
            </div>
            {isCorrect && (
              <div className="text-3xl sm:text-4xl lg:text-5xl animate-bounce drop-shadow-lg">✅</div>
            )}
          </div>

          <div className="flex gap-2 sm:gap-3">
            {showHints && (
              <>
                <button
                  onClick={() => setShowTutorial(true)}
                  className="group relative p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-blue-500/50"
                  title="Hướng dẫn"
                  aria-label="Hướng dẫn"
                >
                  <HelpCircle size={20} className="sm:w-6 sm:h-6 relative z-10" />
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button
                  onClick={showHintForTarget}
                  className="group relative p-2 sm:p-3 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-amber-500/50"
                  title="Gợi ý"
                  aria-label="Gợi ý"
                >
                  <Lightbulb size={20} className="sm:w-6 sm:h-6 relative z-10" />
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </>
            )}
            <button
              onClick={reset}
              className="group relative p-2 sm:p-3 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-purple-500/50"
              title="Reset"
              aria-label="Reset"
            >
              <RotateCcw size={20} className="sm:w-6 sm:h-6 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>

        {/* Target number display (practice mode) */}
        {mode === 'practice' && targetNumber !== undefined && (
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 text-center">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Mục tiêu:</div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">{targetNumber}</div>
          </div>
        )}

        {/* Hint display */}
        {hint && (
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-start gap-2 sm:gap-3">
            <Lightbulb className="text-yellow-600 flex-shrink-0 mt-0.5 sm:mt-1" size={20} />
            <p className="text-sm sm:text-base text-gray-800 font-medium">{hint}</p>
          </div>
        )}

        {/* Premium Soroban Board */}
        <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl overflow-x-auto">
          <div className="relative min-w-[300px]">
            {/* Heaven beads with 3D effects */}
            <div className="flex justify-center gap-4 sm:gap-8 lg:gap-10 mb-4 sm:mb-6 pb-4 sm:pb-6 relative">
              {/* Decorative center divider bar - like real Soroban */}
              <div className="absolute left-0 right-0 bottom-0 h-1 sm:h-1.5 bg-amber-950 shadow-lg"></div>
              <div className="absolute left-0 right-0 bottom-0 h-1 sm:h-1.5 bg-gradient-to-b from-amber-700/40 to-transparent"></div>

              {beads.map((col, colIndex) => (
                <button
                  key={colIndex}
                  onClick={() => toggleBead(colIndex, 0)}
                  className={`relative w-11 h-11 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-full transition-all duration-300 transform cursor-pointer group ${
                    col[0]
                      ? 'translate-y-3 sm:translate-y-4 lg:translate-y-6'
                      : 'hover:scale-110 hover:-translate-y-1'
                  } ${
                    celebrateBeads.includes(`${colIndex}-0`) ? 'animate-celebrate' : ''
                  }`}
                  aria-label={`Heaven bead column ${colIndex + 1}`}
                >
                  {/* 3D Bead Effect */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-red-400 to-red-700 shadow-2xl ${
                    col[0] ? 'shadow-red-900/70' : 'shadow-red-800/50'
                  }`}></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/50"></div>
                  <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-white/40 to-transparent blur-sm"></div>

                  {/* Hover ring */}
                  <div className="absolute -inset-1 rounded-full border-2 border-white/0 group-hover:border-white/50 transition-all"></div>

                  {/* Active glow */}
                  {!col[0] && (
                    <div className="absolute inset-0 rounded-full bg-red-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Earth beads with enhanced 3D */}
            <div className="flex justify-center gap-4 sm:gap-8 lg:gap-10 pt-4 sm:pt-6">
              {beads.map((col, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                  {col.slice(1).map((bead, beadIndex) => (
                    <button
                      key={beadIndex}
                      onClick={() => toggleBead(colIndex, beadIndex + 1)}
                      className={`relative w-11 h-11 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-full transition-all duration-300 transform cursor-pointer group ${
                        bead
                          ? 'hover:scale-110 hover:translate-y-1'
                          : '-translate-y-3 sm:-translate-y-4 lg:-translate-y-6'
                      } ${
                        celebrateBeads.includes(`${colIndex}-${beadIndex + 1}`) ? 'animate-celebrate' : ''
                      }`}
                      aria-label={`Earth bead ${beadIndex + 1} column ${colIndex + 1}`}
                    >
                      {/* 3D Bead Effect */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br shadow-2xl ${
                        bead
                          ? 'from-amber-400 to-amber-600 shadow-amber-700/50'
                          : 'from-yellow-400 to-amber-500 shadow-amber-800/70'
                      }`}></div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/50"></div>
                      <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-white/40 to-transparent blur-sm"></div>

                      {/* Hover ring */}
                      <div className="absolute -inset-1 rounded-full border-2 border-white/0 group-hover:border-white/50 transition-all"></div>

                      {/* Active glow */}
                      {bead && (
                        <div className="absolute inset-0 rounded-full bg-amber-300/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Modern Column labels */}
            <div className="flex justify-center gap-4 sm:gap-8 lg:gap-10 mt-4 sm:mt-6">
              {['Vạn', 'Nghìn', 'Trăm', 'Chục', 'Đơn vị'].map((label, index) => (
                <div key={index} className="w-11 sm:w-14 lg:w-20 text-center">
                  <div className="px-2 py-1 bg-amber-950/60 backdrop-blur-sm rounded-lg mb-1 sm:mb-2">
                    <div className="text-[9px] sm:text-xs text-amber-200 font-bold leading-tight">{label}</div>
                  </div>
                  <div className="text-base sm:text-xl lg:text-2xl text-white font-black drop-shadow-lg">{calculateValue(index)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes celebrate {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2) rotate(5deg);
          }
          75% {
            transform: scale(1.2) rotate(-5deg);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-celebrate {
          animation: celebrate 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
