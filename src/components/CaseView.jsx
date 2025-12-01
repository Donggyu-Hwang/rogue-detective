import React from 'react';
import { User, FileText, AlertCircle } from 'lucide-react';

const CaseView = ({ caseData, onNext }) => {
    if (!caseData) return null;

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="border-b border-gray-800 pb-4">
                <h2 className="text-2xl font-bold text-white mb-2">{caseData.case_title}</h2>
                <p className="text-gray-400 italic border-l-2 border-gray-700 pl-4">
                    "{caseData.summary}"
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 flex items-center gap-2">
                        <User size={16} /> 용의자 목록
                    </h3>
                    <div className="space-y-3">
                        {caseData.suspects.map((suspect, idx) => (
                            <div key={idx} className="bg-gray-900/30 border border-gray-800 p-3 rounded hover:border-gray-600 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-gray-200">{suspect.name}</span>
                                    <span className="text-xs text-gray-600">신뢰도: {suspect.truthfulness}%</span>
                                </div>
                                <p className="text-xs text-gray-400 mb-2">{suspect.profile}</p>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="text-gray-500"><span className="text-gray-600 font-semibold">동기:</span> {suspect.motive}</div>
                                    <div className="text-gray-500"><span className="text-gray-600 font-semibold">알리바이:</span> {suspect.alibi}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 flex items-center gap-2">
                        <FileText size={16} /> 초기 단서
                    </h3>
                    <div className="space-y-3">
                        {caseData.initial_clues.map((clue, idx) => (
                            <div key={idx} className="bg-gray-900/30 border border-gray-800 p-3 rounded flex items-start gap-3">
                                <AlertCircle size={16} className="text-gray-600 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-300">{clue.clue}</p>
                                    <span className="text-xs text-gray-600">신뢰도: {clue.reliability}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <button
                    onClick={onNext}
                    className="bg-gray-200 text-black font-bold py-2 px-6 hover:bg-white transition-colors"
                >
                    수사 시작
                </button>
            </div>
        </div>
    );
};

export default CaseView;
