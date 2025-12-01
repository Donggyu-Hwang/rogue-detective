import React, { useState } from 'react';
import { Search, AlertTriangle, ArrowRight } from 'lucide-react';

const InvestigationView = ({ phase, clues, deepClues, onSubmitAction, loading, showInput = true }) => {
    const [action, setAction] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (action.trim()) {
            onSubmitAction(action);
            setAction('');
        }
    };

    const allClues = [...clues, ...deepClues];

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {allClues.length === 0 && (
                    <div className="text-center text-gray-600 py-10">
                        아직 새로운 단서가 없습니다. 신중하게 행동을 선택하세요.
                    </div>
                )}

                {allClues.map((clue, idx) => (
                    <div key={idx} className="bg-gray-900/50 border border-gray-800 p-4 rounded animate-in slide-in-from-bottom-2 duration-500">
                        <div className="flex items-start gap-3">
                            {clue.red_flag ? (
                                <AlertTriangle className="text-red-900" size={20} />
                            ) : (
                                <Search className="text-gray-600" size={20} />
                            )}
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-200 mb-1">{clue.clue}</h4>
                                <p className="text-sm text-gray-400 mb-2">{clue.detail}</p>
                                <div className="flex gap-3 text-xs">
                                    <span className="text-gray-600">신뢰도: {clue.reliability}%</span>
                                    {clue.red_flag && <span className="text-red-900 font-bold uppercase">위험 신호</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showInput && (
                <div className="border-t border-gray-800 pt-4">
                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1 uppercase tracking-wider">
                            <span>수사 진행도</span>
                            <span>{phase === 'turn1' ? '50%' : '90%'}</span>
                        </div>
                        <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-red-900 transition-all duration-500 ${phase === 'turn1' ? 'w-1/2' : 'w-[90%]'}`}
                            ></div>
                        </div>
                    </div>

                    <div className="mb-2 flex justify-between items-end">
                        <label className="text-xs uppercase tracking-wider text-gray-500">
                            {phase === 'turn1' ? '턴 1: 초기 수사' : '턴 2: 심층 조사'}
                        </label>
                        <span className="text-xs text-gray-600">
                            {phase === 'turn1' ? '행동 기회 1회 남음' : '최종 추리 전 마지막 행동'}
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            placeholder={phase === 'turn1' ? "예: 용의자 A를 심문하여 흉기에 대해 묻는다..." : "예: 혈흔 샘플을 분석한다..."}
                            className="flex-1 bg-black border border-gray-700 text-gray-200 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={loading || !action.trim()}
                            className="bg-gray-800 text-white px-6 hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? '...' : <ArrowRight size={20} />}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default InvestigationView;
