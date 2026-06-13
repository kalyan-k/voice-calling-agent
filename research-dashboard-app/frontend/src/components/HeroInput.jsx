import React, { useState } from 'react';
import { Zap } from 'lucide-react';

export default function HeroInput({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center flex-1 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
        AI Research Intelligence
      </h1>
      <p className="text-neutral-400 text-lg mb-8 text-center font-light">
        Real-time deep research powered by Context.dev
      </p>

      <div className="w-full glass-glow-card rounded-2xl p-6">
        <div className="relative w-full rounded-xl bg-black/40 border border-white/10 p-2 mb-4 focus-within:border-indigo-500/50 transition-all">
          <textarea 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSearch();
              }
            }}
            rows={3} 
            className="bg-transparent text-sm w-full outline-none border-none text-white px-3 py-2 placeholder-neutral-500 resize-none" 
            placeholder="Enter research topics, keywords, or a complex query... (e.g. quantum propulsion developments 2026)"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs text-neutral-500 py-1">Examples:</span>
          {['CRISPR advancements in agriculture', 'AGI timeline predictions by top labs', 'Lithium-ion battery alternatives'].map((ex, i) => (
            <button key={i} onClick={() => setQuery(ex)} className="text-xs bg-white/5 hover:bg-white/10 border border-white/5 rounded-md px-2 py-1 text-indigo-300 transition-colors">
              {ex}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex gap-4 items-center">
            <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Depth:</label>
            <select className="bg-black/40 border border-white/10 text-xs text-white rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500">
              <option value="quick">Quick Sweep</option>
              <option value="detailed">Detailed Analysis</option>
              <option value="deep">Deep Research</option>
            </select>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            {['Images', 'Citations', 'Academic', 'Market Data'].map(f => (
              <label key={f} className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-indigo-500 rounded bg-white/10 border-white/10" /> {f}
              </label>
            ))}
          </div>

          <button onClick={handleSearch} className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2">
            <span>Initialize Research</span>
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
