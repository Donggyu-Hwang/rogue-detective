import React, { useState } from 'react';
import { Key, Play, Trophy, HelpCircle } from 'lucide-react';

const StartScreen = ({ onStart, apiKey, setApiKey, loading, error, onShowLeaderboard, playerName, setPlayerName, onShowTutorial }) => {
    const [localKey, setLocalKey] = useState(apiKey);

    const handleStart = () => {
        if (localKey && playerName) {
            setApiKey(localKey);
            onStart();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 text-center">
            <div className="space-y-4 max-w-md">
                <h2 className="text-3xl font-bold text-white mb-2">도시가 당신을 기다립니다</h2>
                <p className="text-gray-400 leading-relaxed">
                    비가 모든 것을 씻어내려 하지만, 죄악은 남습니다.<br />
                    해결 불가능한 사건에 도전하시겠습니까?
                </p>
            </div>

            <div className="w-full max-w-sm space-y-4 bg-gray-900/50 p-6 border border-gray-800 rounded-lg">
                <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-wider text-gray-500">탐정 면허 (API Key)</label>
                    <div className="relative">
                        <Key className="absolute left-3 top-3 text-gray-600" size={16} />
                        <input
                            type="password"
                            value={localKey}
                            onChange={(e) => setLocalKey(e.target.value)}
                            placeholder="sk-..."
                            className="w-full bg-black border border-gray-700 text-gray-200 pl-10 pr-4 py-2 focus:outline-none focus:border-gray-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-wider text-gray-500">탐정 이름 (Code Name)</label>
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="이름을 입력하세요"
                        className="w-full bg-black border border-gray-700 text-gray-200 px-4 py-2 focus:outline-none focus:border-gray-500 transition-colors"
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm bg-red-950/30 p-2 border border-red-900/50 rounded">
                        {error}
                    </div>
                )}

                <div className="flex gap-2">
                    <button
                        onClick={handleStart}
                        disabled={loading || !localKey || !playerName}
                        className="flex-1 bg-gray-200 text-black font-bold py-3 px-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? '초기화 중...' : (
                            <>
                                <Play size={18} />
                                어둠 속으로 입장
                            </>
                        )}
                    </button>

                    <button
                        onClick={onShowLeaderboard}
                        className="bg-gray-800 text-white px-4 hover:bg-gray-700 transition-colors border border-gray-700"
                        title="명예의 전당"
                    >
                        <Trophy size={20} className="text-yellow-500" />
                    </button>

                    <button
                        onClick={onShowTutorial}
                        className="bg-gray-800 text-white px-4 hover:bg-gray-700 transition-colors border border-gray-700"
                        title="게임 가이드"
                    >
                        <HelpCircle size={20} className="text-blue-400" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;
