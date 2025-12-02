import React, { useEffect, useState } from 'react';
import { Trophy, ArrowLeft, Star, Crown, Medal } from 'lucide-react';

const LeaderboardView = ({ onBack }) => {
    const [scores, setScores] = useState([]);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem('rogue_detective_scores') || '[]');
        // Sort by score (descending)
        const sortedScores = savedScores.sort((a, b) => b.score - a.score);
        setScores(sortedScores);

        // Trigger animation on mount
        setTimeout(() => setAnimate(true), 100);
    }, []);

    const getRankIcon = (rank) => {
        if (rank === 0) return <Crown size={24} className="text-yellow-400 fill-yellow-400 animate-pulse" />;
        if (rank === 1) return <Medal size={24} className="text-gray-300 fill-gray-300" />;
        if (rank === 2) return <Medal size={24} className="text-amber-600 fill-amber-600" />;
        return <span className="text-gray-500 font-bold text-lg w-6 text-center">#{rank + 1}</span>;
    };

    const getRowStyle = (rank) => {
        if (rank === 0) return "bg-gradient-to-r from-yellow-900/40 to-black border-yellow-700/50 shadow-[0_0_15px_rgba(234,179,8,0.2)] scale-[1.02]";
        if (rank === 1) return "bg-gradient-to-r from-gray-800/40 to-black border-gray-600/50";
        if (rank === 2) return "bg-gradient-to-r from-amber-900/30 to-black border-amber-800/50";
        return "bg-black/40 border-gray-800 hover:bg-gray-900/40";
    };

    return (
        <div className="h-full flex flex-col relative overflow-hidden">
            {/* Background Ambient Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(120,50,50,0.15),transparent_70%)] pointer-events-none"></div>

            <div className={`text-center mb-6 transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                <div className="inline-block p-3 rounded-full bg-yellow-900/20 border border-yellow-700/30 mb-4 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                    <Trophy className="text-yellow-500" size={48} />
                </div>
                <h2 className="text-4xl font-black text-white uppercase tracking-widest mb-2 drop-shadow-lg">
                    HALL OF FAME
                </h2>
                <p className="text-yellow-500/80 font-medium tracking-wider uppercase text-sm">
                    전설적인 탐정들의 기록
                </p>
            </div>

            {/* Promotion Banner */}
            <div className={`mb-6 p-4 rounded-lg bg-gradient-to-r from-yellow-600 to-amber-600 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)] animate-pulse transform transition-all duration-1000 ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="flex items-center justify-center gap-3">
                    <Star className="fill-black animate-spin-slow" size={24} />
                    <div className="text-center">
                        <h3 className="text-xl font-black uppercase tracking-tighter leading-none">
                            EVENT: 90점 이상 달성 시
                        </h3>
                        <p className="font-bold text-sm mt-1">
                            ☕️ 프리미엄 커피 쿠폰 즉시 증정!
                        </p>
                    </div>
                    <Star className="fill-black animate-spin-slow" size={24} />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {scores.length === 0 ? (
                    <div className="text-center text-gray-500 py-20 flex flex-col items-center gap-4">
                        <Star className="text-gray-700 animate-spin-slow" size={48} />
                        <p className="text-lg">아직 기록된 전설이 없습니다.</p>
                        <p className="text-sm text-gray-600">첫 번째 주인공이 되어보세요.</p>
                    </div>
                ) : (
                    <div className="space-y-4 pb-4">
                        {scores.map((entry, idx) => (
                            <div
                                key={idx}
                                className={`
                                    flex items-center justify-between p-4 border rounded-xl transition-all duration-500
                                    ${getRowStyle(idx)}
                                    ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
                                `}
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                <div className="flex items-center gap-5">
                                    <div className="flex-shrink-0 w-10 flex justify-center">
                                        {getRankIcon(idx)}
                                    </div>
                                    <div>
                                        <div className={`font-bold text-lg ${idx === 0 ? 'text-yellow-400' : 'text-gray-200'}`}>
                                            {entry.playerName || "익명의 탐정"}
                                        </div>
                                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                            {entry.caseTitle}
                                        </div>
                                        <div className="text-[10px] text-gray-600 mt-0.5">
                                            {new Date(entry.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-2xl font-black ${idx === 0 ? 'text-yellow-400 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]' : 'text-white'}`}>
                                        {entry.score}
                                    </div>
                                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Points</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800/50">
                <button
                    onClick={onBack}
                    className="w-full group relative overflow-hidden bg-gray-900 text-white py-4 px-6 rounded-lg border border-gray-700 hover:border-gray-500 transition-all duration-300"
                >
                    <div className="absolute inset-0 w-0 bg-white/5 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <div className="relative flex items-center justify-center gap-3">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold tracking-widest uppercase">돌아가기</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default LeaderboardView;
