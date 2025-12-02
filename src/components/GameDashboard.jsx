import React, { useState } from 'react';
import { User, FileText, Search, AlertTriangle, ArrowRight, FolderOpen, ClipboardList } from 'lucide-react';

const GameDashboard = ({
    caseData,
    clues,
    deepClues,
    phase,
    onSubmitAction,
    loading
}) => {
    const [activeTab, setActiveTab] = useState('case'); // 'case' | 'clues'
    const [action, setAction] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (action.trim()) {
            onSubmitAction(action);
            setAction('');
        }
    };

    const allClues = [...clues, ...deepClues];
    const showInput = phase === 'turn1' || phase === 'turn2' || phase === 'case_generation';

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-800 bg-gray-900/30">
                <button
                    onClick={() => setActiveTab('case')}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'case'
                            ? 'text-white border-b-2 border-white bg-gray-800/50'
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                        }`}
                >
                    <FolderOpen size={16} />
                    사건 파일
                </button>
                <button
                    onClick={() => setActiveTab('clues')}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'clues'
                            ? 'text-white border-b-2 border-white bg-gray-800/50'
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                        }`}
                >
                    <ClipboardList size={16} />
                    수사 일지
                    {allClues.length > 0 && (
                        <span className="ml-1 bg-red-900 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            {allClues.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-gray-950/50">
                {activeTab === 'case' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* Case Header */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">{caseData.case_title}</h2>
                            <p className="text-gray-400 italic border-l-2 border-gray-700 pl-4">
                                "{caseData.summary}"
                            </p>
                        </div>

                        {/* Suspects Grid */}
                        <div>
                            <h3 className="text-sm uppercase tracking-wider text-gray-500 flex items-center gap-2 mb-4">
                                <User size={16} /> 용의자 목록
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {caseData.suspects.map((suspect, idx) => (
                                    <div key={idx} className="bg-gray-900/40 border border-gray-800 p-4 rounded hover:border-gray-600 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-gray-200 text-lg">{suspect.name}</span>
                                            <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded border border-gray-800">
                                                신뢰도 {suspect.truthfulness}%
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-3 leading-relaxed">{suspect.profile}</p>
                                        <div className="space-y-1 text-xs">
                                            <div className="flex gap-2">
                                                <span className="text-gray-500 w-12 shrink-0">동기</span>
                                                <span className="text-gray-300">{suspect.motive}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-gray-500 w-12 shrink-0">알리바이</span>
                                                <span className="text-gray-300">{suspect.alibi}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Initial Clues */}
                        <div>
                            <h3 className="text-sm uppercase tracking-wider text-gray-500 flex items-center gap-2 mb-4">
                                <FileText size={16} /> 초기 단서
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {caseData.initial_clues.map((clue, idx) => (
                                    <div key={idx} className="bg-gray-900/30 border border-gray-800 p-3 rounded flex items-start gap-3">
                                        <Search size={16} className="text-gray-600 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-300">{clue.clue}</p>
                                            <span className="text-xs text-gray-600">신뢰도: {clue.reliability}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'clues' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        {allClues.length === 0 ? (
                            <div className="text-center text-gray-600 py-20 flex flex-col items-center gap-4">
                                <Search size={48} className="text-gray-800" />
                                <p>아직 확보된 추가 단서가 없습니다.</p>
                                <p className="text-sm">행동을 선택하여 수사를 진행하세요.</p>
                            </div>
                        ) : (
                            allClues.map((clue, idx) => (
                                <div key={idx} className="bg-gray-900/50 border border-gray-800 p-4 rounded animate-in slide-in-from-bottom-2 duration-500">
                                    <div className="flex items-start gap-3">
                                        {clue.red_flag ? (
                                            <AlertTriangle className="text-red-900" size={20} />
                                        ) : (
                                            <Search className="text-gray-600" size={20} />
                                        )}
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-200 mb-1">{clue.clue}</h4>
                                            <p className="text-sm text-gray-400 mb-2 leading-relaxed">{clue.detail}</p>
                                            <div className="flex gap-3 text-xs">
                                                <span className="text-gray-600">신뢰도: {clue.reliability}%</span>
                                                {clue.red_flag && <span className="text-red-900 font-bold uppercase">위험 신호</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Persistent Action Area */}
            {showInput && (
                <div className="border-t border-gray-800 bg-black p-4 md:p-6 z-20">
                    <div className="max-w-3xl mx-auto w-full">
                        <div className="mb-3 flex justify-between items-end">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs uppercase tracking-wider text-gray-500">수사 진행도</span>
                                    <span className="text-xs font-bold text-red-900">{phase === 'turn1' ? '50%' : '90%'}</span>
                                </div>
                                <div className="w-32 h-1 bg-gray-900 rounded-full overflow-hidden">
                                    <div className={`h-full bg-red-900 transition-all duration-500 ${phase === 'turn1' ? 'w-1/2' : 'w-[90%]'}`}></div>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500">
                                {phase === 'turn1' ? '행동 기회 1회 남음' : '최종 추리 전 마지막 행동'}
                            </span>
                        </div>

                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={action}
                                onChange={(e) => setAction(e.target.value)}
                                placeholder={phase === 'turn1' ? "예: 용의자 A를 심문하여 알리바이를 확인한다..." : "예: 현장의 혈흔을 정밀 분석한다..."}
                                className="flex-1 bg-gray-900 border border-gray-700 text-gray-200 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors rounded-l"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={loading || !action.trim()}
                                className="bg-gray-800 text-white px-6 hover:bg-gray-700 transition-colors disabled:opacity-50 rounded-r flex items-center justify-center"
                            >
                                {loading ? '...' : <ArrowRight size={20} />}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameDashboard;
