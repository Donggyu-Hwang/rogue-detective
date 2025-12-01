import React, { useEffect, useState } from 'react';
import { Trophy, ArrowLeft } from 'lucide-react';

const LeaderboardView = ({ onBack }) => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem('rogue_detective_scores') || '[]');
        // Sort by score (descending)
        const sortedScores = savedScores.sort((a, b) => b.score - a.score);
        setScores(sortedScores);
    }, []);

    return (
        <div className="space-y-6 max-w-xl mx-auto h-full flex flex-col">
            <div className="text-center mb-4">
                <Trophy className="mx-auto text-yellow-600 mb-2" size={32} />
                <h2 className="text-2xl font-bold text-white">명예의 전당</h2>
                <p className="text-gray-400 text-sm">최고의 탐정들</p>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-900/30 border border-gray-800 rounded-lg p-4">
                {scores.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        아직 기록된 사건이 없습니다.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {scores.map((entry, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800 rounded hover:border-gray-600 transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className={`text-lg font-bold w-6 text-center ${idx < 3 ? 'text-yellow-500' : 'text-gray-600'}`}>
                                        {idx + 1}
                                    </span>
                                    <div>
                                        <div>
                                            <div className="text-gray-200 font-bold">{entry.playerName || "익명의 탐정"}</div>
                                            <div className="text-xs text-gray-500">{entry.caseTitle} • {new Date(entry.date).toLocaleDateString()}</div>
                                        </div>                  </div>
                                </div>
                                <div className="text-xl font-bold text-white">
                                    {entry.score} <span className="text-xs text-gray-600 font-normal">점</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button
                onClick={onBack}
                className="w-full bg-gray-800 text-white py-3 px-4 hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
                <ArrowLeft size={18} />
                돌아가기
            </button>
        </div>
    );
};

export default LeaderboardView;
