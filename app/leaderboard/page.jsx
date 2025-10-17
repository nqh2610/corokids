'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function LeaderboardPage() {
  const { status } = useSession();
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(()=>{if(status==='unauthenticated')router.push('/login');else if(status==='authenticated')fetch('/api/leaderboard').then(r=>r.json()).then(d=>setLeaderboard(d.leaderboard||[]));}, [status]);
  if(status==='loading'||leaderboard.length===0)return <div className="min-h-screen flex items-center justify-center"><div className="text-4xl animate-spin">🧮</div></div>;

  const top3 = leaderboard.slice(0,3);
  const rest = leaderboard.slice(3,10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={()=>router.push('/dashboard')} className="flex items-center gap-2 mb-6 px-6 py-3 bg-white rounded-full shadow-lg"><ArrowLeft/> Quay lai</button>
        <div className="text-center mb-8"><h2 className="text-5xl font-bold mb-4 text-orange-600">🏆 Bang Xep Hang 🏆</h2></div>
        <div className="mb-8 flex items-end justify-center gap-4">
          {top3[1]&&<div className="flex-1 max-w-xs"><div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-3xl p-6 text-center shadow-xl"><div className="text-6xl mb-3">👦</div><div className="text-5xl mb-2">🥈</div><div className="text-xl font-bold">{top3[1].name}</div><div className="text-3xl font-bold mt-2">⭐{top3[1].totalStars}</div></div><div className="h-32 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-3xl mt-2"/></div>}
          {top3[0]&&<div className="flex-1 max-w-xs"><div className="bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-3xl p-6 text-center shadow-2xl relative"><div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-bounce text-4xl">👑</div><div className="text-7xl mb-3">👧</div><div className="text-6xl mb-2">🏆</div><div className="text-2xl font-bold">{top3[0].name}</div><div className="text-4xl font-bold mt-2">⭐{top3[0].totalStars}</div></div><div className="h-40 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t-3xl mt-2"/></div>}
          {top3[2]&&<div className="flex-1 max-w-xs"><div className="bg-gradient-to-br from-orange-200 to-orange-400 rounded-3xl p-6 text-center shadow-xl"><div className="text-6xl mb-3">👦</div><div className="text-5xl mb-2">🥉</div><div className="text-xl font-bold">{top3[2].name}</div><div className="text-3xl font-bold mt-2">⭐{top3[2].totalStars}</div></div><div className="h-24 bg-gradient-to-b from-orange-300 to-orange-500 rounded-t-3xl mt-2"/></div>}
        </div>
        {rest.length>0&&<div className="bg-white rounded-3xl shadow-xl overflow-hidden"><div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white"><h3 className="text-2xl font-bold">Top 10</h3></div><div className="divide-y">{rest.map((p,i)=><div key={p.id} className="flex justify-between p-6 hover:bg-gray-50"><div className="flex gap-4"><div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">{i+4}</div><div className="text-4xl">👦</div><div><div className="font-bold text-lg">{p.name}</div><div className="text-sm text-gray-600">Level {p.level}</div></div></div><div className="text-2xl font-bold text-yellow-600">⭐{p.totalStars}</div></div>)}</div></div>}
      </div>
    </div>
  );
}
