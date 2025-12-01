import React from 'react';
import { CloudRain } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-black text-gray-300 font-mono p-4 md:p-8 flex flex-col items-center">
            <div className="max-w-3xl w-full border border-gray-800 bg-gray-950 shadow-2xl min-h-[80vh] flex flex-col relative overflow-hidden">
                {/* Rain effect overlay (simplified) */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                <header className="border-b border-gray-800 p-6 flex items-center justify-between bg-gray-900/50 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-3">
                        <CloudRain className="text-gray-500" size={24} />
                        <h1 className="text-xl font-bold tracking-widest text-gray-100 uppercase">로그 디텍티브</h1>
                    </div>
                    <div className="text-xs text-gray-600">사건 번호 #{(Math.random() * 10000).toFixed(0)}</div>
                </header>

                <main className="flex-1 p-6 relative z-10 overflow-y-auto">
                    {children}
                </main>

                <footer className="border-t border-gray-800 p-4 text-center text-xs text-gray-700 bg-gray-900/50 backdrop-blur-sm z-10">
                    &copy; 2025 안티그래비티 탐정 사무소
                </footer>
            </div>
        </div>
    );
};

export default Layout;
