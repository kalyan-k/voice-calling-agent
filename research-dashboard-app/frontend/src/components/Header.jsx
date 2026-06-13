import React from 'react';
import { BrainCircuit, Moon } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-black/20 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
        </div>
        <div className="h-6 w-[1px] bg-white/10 mx-1"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-md">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm tracking-widest font-extrabold text-white uppercase">Research Intelligence</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium">
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full flex items-center gap-2 transition-colors">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Context.dev Connected
        </span>
        <button className="p-2 inner-glass rounded-full hover:bg-white/10 transition-colors">
          <Moon className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
