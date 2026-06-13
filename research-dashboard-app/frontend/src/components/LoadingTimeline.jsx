import React, { useEffect, useState } from 'react';
import { Cpu, Globe, Database, Brain, BarChart2, FileText, Loader2, CheckCircle2, CircleDashed } from 'lucide-react';

export default function LoadingTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { id: 1, label: 'Searching the Web', icon: Globe, delay: 800, progress: 20 },
    { id: 2, label: 'Gathering Sources', icon: Database, delay: 1200, progress: 45 },
    { id: 3, label: 'Extracting Insights', icon: Brain, delay: 1500, progress: 70 },
    { id: 4, label: 'Ranking Evidence', icon: BarChart2, delay: 900, progress: 85 },
    { id: 5, label: 'Building Report', icon: FileText, delay: 600, progress: 100 }
  ];

  useEffect(() => {
    let currentStep = 0;
    const runSteps = async () => {
      for (let step of steps) {
        currentStep = step.id;
        setActiveStep(currentStep);
        await new Promise(r => setTimeout(r, step.delay));
        setProgress(step.progress);
      }
      setActiveStep(6); // All done
    };
    runSteps();
  }, []);

  return (
    <section className="max-w-2xl mx-auto w-full flex flex-col items-center justify-center flex-1 py-12 fade-in">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-r-2 border-purple-500 rounded-full animate-[spin_1.5s_reverse_infinite]"></div>
        <div className="absolute inset-4 border-b-2 border-blue-500 rounded-full animate-[spin_2s_linear_infinite]"></div>
        <Cpu className="absolute inset-0 m-auto w-8 h-8 text-indigo-400 animate-pulse" />
      </div>
      
      <h3 className="text-xl font-semibold mb-6 text-white tracking-wide">Synthesizing Intelligence</h3>
      
      <div className="w-full space-y-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isPast = activeStep > step.id;
          const isActive = activeStep === step.id;
          
          return (
            <div key={step.id} className="flex items-center justify-between text-sm">
              <span className={`flex items-center gap-2 ${isPast ? 'step-done' : isActive ? 'step-active' : 'step-wait'}`}>
                <Icon className="w-4 h-4" /> {step.label}
              </span>
              {isPast ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : isActive ? (
                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
              ) : (
                <CircleDashed className="w-4 h-4 text-neutral-600" />
              )}
            </div>
          );
        })}
        
        <div className="h-1 w-full bg-white/10 rounded-full mt-6 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 loader-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
}
