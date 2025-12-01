import React, { useState } from 'react';
import { Gavel, CheckCircle, XCircle, Trophy } from 'lucide-react';

const FinalView = ({ onSubmit, result, loading, onReset, onShowLeaderboard }) => {
    const [suspect, setSuspect] = useState('');
    const [reasoning, setReasoning] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (suspect && reasoning) {
            onSubmit(suspect, reasoning);
        }
    };

    if (result) {
        return (
            <div className="space-y-8 animate-in zoom-in-95 duration-700 text-center py-10">
                <div className="inline-block p-4 rounded-full bg-gray-900 border border-gray-800 mb-4">
                    {result.is_correct ? (
                        <CheckCircle className="text-green-500" size={48} />
                    ) : (
                        <XCircle className="text-red-500" size={48} />
                    )}
                </div>

                <h2 className="text-4xl font-bold text-white mb-2">
                    {result.is_correct ? "사건 종결" : "미제 사건"}
                </h2>

                <p className="text-xl text-gray-400 italic max-w-lg mx-auto">
                    "{result.final_comment}"
                </p>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-8">
                    <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
                        <div className="text-xs text-gray-500 uppercase">총점</div>
                        <div className="text-2xl font-bold text-white">{result.score}</div>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
                        <div className="text-xs text-gray-500 uppercase">논리</div>
                        <div className="text-2xl font-bold text-gray-300">{result.logic_score}</div>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
                        <div className="text-xs text-gray-500 uppercase">증거</div>
                        <div className="text-2xl font-bold text-gray-300">{result.evidence_usage}</div>
                    </div>
                </div>

                {result.truth_summary && (
                    <div className="max-w-xl mx-auto mt-8 bg-gray-950 border border-gray-800 p-6 rounded text-left">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-red-900">■</span> 사건의 전말
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                            {result.truth_summary}
                        </p>
                    </div>
                )}

                <div className="flex gap-4 mt-12">
                    <button
                        onClick={onReset}
                        className="flex-1 bg-gray-200 text-black font-bold py-3 px-8 hover:bg-white transition-colors"
                    >
                        새로운 사건
                    </button>
                    <button
                        onClick={onShowLeaderboard}
                        className="bg-gray-800 text-white font-bold py-3 px-6 hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-2"
                    >
                        <Trophy size={18} className="text-yellow-500" />
                        명예의 전당
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            <div className="text-center mb-8">
                <Gavel className="mx-auto text-gray-600 mb-4" size={32} />
                <h2 className="text-2xl font-bold text-white">최종 판결</h2>
                <p className="text-gray-400">범인을 지목하고 사건의 전말을 밝히세요.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-500">범인</label>
                    <input
                        type="text"
                        value={suspect}
                        onChange={(e) => setSuspect(e.target.value)}
                        placeholder="누가 범인입니까?"
                        className="w-full bg-black border border-gray-700 text-gray-200 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-500">증거 및 추리</label>
                    <textarea
                        value={reasoning}
                        onChange={(e) => setReasoning(e.target.value)}
                        placeholder="범행 동기와 수법을 서술하세요..."
                        rows={4}
                        className="w-full bg-black border border-gray-700 text-gray-200 px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors resize-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-900/80 text-white font-bold py-3 px-4 hover:bg-red-900 transition-colors disabled:opacity-50 border border-red-900"
                >
                    {loading ? '판결 중...' : '최종 보고서 제출'}
                </button>
            </form>
        </div>
    );
};

export default FinalView;
