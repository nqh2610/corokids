'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PracticePage() {
  const { status } = useSession();
  const router = useRouter();
  const [problem, setProblem] = useState({ num1: 15, num2: 8, op: '+' });
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ stars: 0, correct: 0, total: 0 });

  useEffect(() => { if (status === 'unauthenticated') router.push('/login'); }, [status]);
  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center"><div className="text-4xl animate-spin">🧮</div></div>;

  const generate = () => { setProblem({ num1: Math.floor(Math.random()*50)+10, num2: Math.floor(Math.random()*30)+1, op: Math.random()>0.5?'+':'-' }); setAnswer(''); setResult(null); };
  const check = () => { const correct = problem.op==='+'? problem.num1+problem.num2 : problem.num1-problem.num2; const isCorrect = parseInt(answer)===correct; setResult(isCorrect); if(isCorrect) setStats(p=>({stars:p.stars+10, correct:p.correct+1, total:p.total+1})); else setStats(p=>({...p, total:p.total+1})); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={()=>router.push('/dashboard')} className="flex items-center gap-2 mb-6 px-6 py-3 bg-white rounded-full shadow-lg"><ArrowLeft/> Quay lai</button>
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <h2 className="text-4xl font-bold text-center mb-6">Luyen tap hang ngay</h2>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-12 mb-8">
            <div className="text-center">
              <div className="text-7xl font-bold text-blue-600 mb-6">{problem.num1} {problem.op} {problem.num2} = ?</div>
              <input type="number" value={answer} onChange={(e)=>setAnswer(e.target.value)} placeholder="Nhap dap an" className="text-5xl font-bold text-center w-64 px-6 py-4 rounded-2xl border-4 border-blue-300 outline-none mb-6" />
              <div className="flex justify-center gap-4">
                <button onClick={check} className="px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-xl font-bold">Kiem tra</button>
                <button onClick={generate} className="px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xl font-bold">Bai moi</button>
              </div>
            </div>
            {result!==null && <div className={`mt-8 p-6 rounded-2xl text-center ${result?'bg-green-100':'bg-red-100'}`}><div className="text-6xl mb-4">{result?'🎉':'😢'}</div><div className="text-3xl font-bold">{result?'Chinh xac!':'Chua dung!'}</div>{result&&<div className="text-xl mt-2 text-green-700">+10 ⭐</div>}</div>}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-yellow-50 rounded-2xl p-6 text-center"><div className="text-4xl">⭐</div><div className="text-3xl font-bold text-yellow-600">{stats.stars}</div><div className="text-sm">Sao</div></div>
            <div className="bg-green-50 rounded-2xl p-6 text-center"><div className="text-4xl">✓</div><div className="text-3xl font-bold text-green-600">{stats.correct}</div><div className="text-sm">Dung</div></div>
            <div className="bg-blue-50 rounded-2xl p-6 text-center"><div className="text-4xl">📊</div><div className="text-3xl font-bold text-blue-600">{stats.total}</div><div className="text-sm">Tong</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
