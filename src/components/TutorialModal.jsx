import React from 'react';
import { X, HelpCircle, AlertTriangle, Search, Gavel } from 'lucide-react';

const TutorialModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-2xl w-[95%] md:w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-8 space-y-8">
                    <div className="text-center space-y-2">
                        <HelpCircle className="mx-auto text-gray-400" size={40} />
                        <h2 className="text-2xl font-bold text-white">탐정 업무 매뉴얼</h2>
                        <p className="text-gray-400 text-sm">신입 탐정을 위한 가이드</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="bg-gray-800 p-3 rounded-full h-fit shrink-0">
                                <Search className="text-blue-400" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">1. 사건 파악 및 수사</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    사건이 배정되면 용의자와 초기 단서를 확인하세요.
                                    총 2번의 행동 기회가 주어집니다.
                                    "현장 조사", "용의자 심문", "증거 분석" 등 자유롭게 행동을 입력하여 단서를 수집하세요.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-gray-800 p-3 rounded-full h-fit shrink-0">
                                <AlertTriangle className="text-yellow-500" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">2. 거짓과 진실</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    모든 단서가 진실은 아닙니다.
                                    <span className="text-red-400 font-bold mx-1">위험 신호(Red Flag)</span>가 표시된 단서는 함정이거나 거짓일 확률이 높습니다.
                                    용의자들의 신뢰도를 항상 의심하세요.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-gray-800 p-3 rounded-full h-fit shrink-0">
                                <Gavel className="text-red-500" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">3. 최종 판결</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    수사가 끝나면 범인을 지목하고, 그 이유(동기, 트릭 등)를 서술해야 합니다.
                                    당신의 논리와 증거 활용 능력에 따라 점수가 매겨집니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full bg-gray-200 text-black font-bold py-3 rounded hover:bg-white transition-colors"
                    >
                        숙지했습니다
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorialModal;
