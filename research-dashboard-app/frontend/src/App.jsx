import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import HeroInput from './components/HeroInput';
import LoadingTimeline from './components/LoadingTimeline';
import ResultsDashboard from './components/ResultsDashboard';

function App() {
  const [view, setView] = useState('input'); // 'input', 'loading', 'results'
  const [query, setQuery] = useState('');
  const [researchData, setResearchData] = useState(null);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setView('loading');
    
    try {
      // The proxy in vite.config.js will route this to http://localhost:3001/api/research
      const response = await axios.post('/api/research', { query: searchQuery });
      setResearchData(response.data);
      
      // Wait a moment for the loading animation to finish gracefully
      setTimeout(() => {
        setView('results');
      }, 5000); // 5 seconds roughly matches the timeline animation in LoadingTimeline
    } catch (error) {
      console.error("Error fetching research data:", error);
      alert("Failed to fetch research data. Please check if the backend is running.");
      setView('input');
    }
  };

  const resetSearch = () => {
    setView('input');
    setQuery('');
    setResearchData(null);
  };

  return (
    <>
      {/* Ambient Background Orbs */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>
      <div className="ambient-orb orb-3"></div>

      <div className="w-full max-w-[1600px] min-h-[90vh] ultra-glass rounded-[32px] overflow-hidden flex flex-col z-10 shadow-2xl relative mx-auto my-4 md:my-8">
        <Header />
        
        <main className="flex-1 flex flex-col p-6 overflow-y-auto">
          {view === 'input' && <HeroInput onSearch={handleSearch} />}
          {view === 'loading' && <LoadingTimeline />}
          {view === 'results' && researchData && (
            <ResultsDashboard data={researchData} query={query} onReset={resetSearch} />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
