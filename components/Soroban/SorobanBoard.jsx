'use client';

import { useState } from 'react';

export default function SorobanBoard() {
  const [beads, setBeads] = useState([
    [false, true, true, true, true],
    [false, true, true, true, true],
    [false, true, true, true, true],
    [false, true, true, true, true],
    [false, true, true, true, true]
  ]);
  const [currentNumber, setCurrentNumber] = useState(0);

  const calculateValue = (col) => {
    const heaven = beads[col][0] ? 5 : 0;
    const earth = beads[col].slice(1).filter(b => !b).length;
    return heaven + earth;
  };

  const toggleBead = (col, row) => {
    const newBeads = [...beads];
    if (row === 0) {
      newBeads[col][0] = !newBeads[col][0];
    } else {
      for (let i = 1; i <= row; i++) {
        newBeads[col][i] = !newBeads[col][row];
      }
    }
    setBeads(newBeads);
    let total = 0;
    for (let i = 0; i < 5; i++) {
      total += calculateValue(i) * Math.pow(10, 4 - i);
    }
    setCurrentNumber(total);
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
  };

  return (
    <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 shadow-2xl">
      <div className="mb-6 text-center">
        <div className="inline-block bg-white rounded-2xl px-8 py-4 shadow-lg">
          <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {currentNumber}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-amber-800 to-amber-900 rounded-2xl p-6 shadow-inner">
        <div className="relative">
          <div className="flex justify-center gap-8 mb-4 pb-4 border-b-4 border-amber-950">
            {beads.map((col, colIndex) => (
              <button
                key={colIndex}
                onClick={() => toggleBead(colIndex, 0)}
                className={`w-12 h-12 rounded-full shadow-lg transition-all ${col[0] ? 'bg-red-600 translate-y-4' : 'bg-red-500'}`}
              />
            ))}
          </div>
          <div className="flex justify-center gap-8 pt-4">
            {beads.map((col, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-3">
                {col.slice(1).map((bead, beadIndex) => (
                  <button
                    key={beadIndex}
                    onClick={() => toggleBead(colIndex, beadIndex + 1)}
                    className={`w-12 h-12 rounded-full shadow-lg ${bead ? 'bg-amber-400' : 'bg-amber-500 -translate-y-4'}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button onClick={reset} className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold">🔄 Reset</button>
      </div>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-2">👆</div>
          <p className="font-bold text-gray-800">Click vào hạt</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-2">🔴</div>
          <p className="font-bold text-gray-800">Hạt trên = 5</p>
        </div>
        <div className="bg-pink-50 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-2">🎯</div>
          <p className="font-bold text-gray-800">Luyện tập</p>
        </div>
      </div>
    </div>
  );
}
