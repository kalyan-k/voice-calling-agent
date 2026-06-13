import React, { useState } from 'react';
import { ArrowLeft, FileText, Code, Copy, Target, Zap, BookOpen, Lightbulb, Link as LinkIcon, Image as ImageIcon, X, TrendingUp, AlertTriangle, Compass, Unlock, Link2, Calendar, ShieldCheck, Maximize2 } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultsDashboard({ data, query, onReset }) {
  const [modalImage, setModalImage] = useState(null);

  const getChartConfig = (val, color) => ({
    data: {
      datasets: [{
        data: [val, 100 - val],
        backgroundColor: [color, 'rgba(255,255,255,0.05)'],
        borderWidth: 0,
        borderRadius: 5
      }]
    },
    options: {
      cutout: '80%',
      responsive: true,
      maintainAspectRatio: true,
      plugins: { tooltip: { enabled: false }, legend: { display: false } },
      animation: { animateScale: true, animateRotate: true, duration: 1500 }
    }
  });

  const getIcon = (name) => {
    const icons = { 'trending-up': TrendingUp, 'alert-triangle': AlertTriangle, 'compass': Compass, 'unlock': Unlock };
    return icons[name] || Zap;
  };

  return (
    <section className="w-full h-full flex flex-col gap-6 fade-in py-4">
      {/* Action Bar */}
      <div className="flex flex-wrap justify-between items-center bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button onClick={onReset} className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors px-2">
            <ArrowLeft className="w-3 h-3" /> New Search
          </button>
          <div className="h-4 w-[1px] bg-white/20 mx-2"></div>
          <h2 className="text-sm font-semibold text-indigo-300">Target: <span className="text-white font-normal">{query}</span></h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white/10 hover:bg-white/20 text-xs px-3 py-1.5 rounded-lg border border-white/10 transition flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> PDF
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-xs px-3 py-1.5 rounded-lg border border-white/10 transition flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5" /> Markdown
          </button>
          <button className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30 text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1.5">
            <Copy className="w-3.5 h-3.5" /> Copy Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="glass-glow-card rounded-2xl p-5">
            <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-4 flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-blue-400" /> Research Scorecard
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Confidence', val: data.scores.confidence, color: '#818CF8' },
                { label: 'Quality', val: data.scores.quality, color: '#34D399' },
                { label: 'Freshness', val: data.scores.freshness, color: '#60A5FA' },
                { label: 'Coverage', val: data.scores.coverage, color: '#A78BFA' }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-center">
                  <div className="relative w-16 h-16">
                    <Doughnut {...getChartConfig(s.val, s.color)} />
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">{s.val}%</div>
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-2">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-glow-card rounded-2xl p-5 flex-1">
            <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-4 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-yellow-400" /> Key Highlights
            </h3>
            <div className="space-y-3">
              {data.highlights.map((h, i) => {
                const IconComp = getIcon(h.icon);
                return (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3 hover:bg-white/10 transition-colors">
                    <div className="mt-0.5 p-1.5 rounded-lg bg-black/30">
                      <IconComp className={`w-4 h-4 ${h.color}`} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">{h.title}</span>
                      <span className="text-xs text-neutral-200 font-medium">{h.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="glass-glow-card rounded-2xl p-6 relative overflow-hidden">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" /> Executive Summary
            </h2>
            <div className="text-sm text-neutral-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: data.summary }}></div>
          </div>

          <div className="glass-glow-card rounded-2xl p-6 flex-1">
            <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> Critical Evidence & Analysis
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {data.evidence.map((e, i) => (
                <div key={i} className="border-l-2 border-indigo-500/50 pl-4 py-1">
                  <p className="text-sm text-neutral-200 mb-2 font-medium">"{e.fact}"</p>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded flex items-center gap-1"><Link2 className="w-3 h-3" /> {e.source}</span>
                    <span className="text-neutral-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {e.date}</span>
                    <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> {e.reliability}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="glass-glow-card rounded-2xl p-5">
            <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-4 flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Strategic Insights
            </h3>
            <div className="space-y-3">
              {data.insights.map((ins, i) => (
                <div key={i} className="p-3 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/5">
                  <span className="text-[10px] text-amber-400 uppercase tracking-wider font-bold block mb-1.5">{ins.type}</span>
                  <p className="text-xs text-neutral-300 leading-relaxed">{ins.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-glow-card rounded-2xl p-5 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-400 flex items-center gap-2">
                <LinkIcon className="w-3.5 h-3.5 text-blue-400" /> Source Explorer
              </h3>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{data.sources.length} sources</span>
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {data.sources.map((s, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between hover:border-blue-500/30 transition-colors group cursor-pointer">
                  <div className="flex-1 min-w-0 mr-3">
                    <h4 className="text-xs font-semibold text-neutral-200 truncate group-hover:text-blue-400 transition-colors">{s.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-500">
                      <span className="truncate max-w-[100px]">{s.domain}</span>
                      <span>•</span>
                      <span>{s.author}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-mono">Score: {s.relevance}</span>
                    <span className="text-[9px] text-neutral-600">{s.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-glow-card rounded-2xl p-6 mt-2">
        <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-4 flex items-center gap-2">
          <ImageIcon className="w-3.5 h-3.5 text-pink-400" /> Visual Intelligence
        </h3>
        <div className="masonry-grid">
          {data.visuals.map((v, i) => (
            <div key={i} className="masonry-item relative group rounded-xl overflow-hidden cursor-pointer" onClick={() => setModalImage(v)}>
              <img src={v.url} alt="Evidence" className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-xs text-white drop-shadow-md line-clamp-2">{v.caption}</p>
              </div>
              <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button onClick={() => setModalImage(null)} className="absolute top-6 right-6 text-white/50 hover:text-white p-2 bg-white/10 rounded-full transition-colors z-50">
            <X className="w-6 h-6" />
          </button>
          <img src={modalImage.url} className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-white/10" />
          <p className="absolute bottom-6 text-center text-sm text-neutral-300 bg-black/60 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">{modalImage.caption}</p>
        </div>
      )}
    </section>
  );
}
