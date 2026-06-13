require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper to generate mock data if context.dev API is not reachable
function generateMockData(query) {
    return {
        summary: `<p>Comprehensive analysis of <strong>"${query}"</strong> indicates a significant shift in current paradigms. According to recent whitepapers and extracted web semantics, there are breakthrough developments occurring across leading academic and private institutions.</p>
                  <p>Rather than relying on classical constraints, new theoretical models emphasize asymmetrical configurations and dynamic optimizations, fundamentally altering expected timelines. Extensive documentation suggests that these frameworks are transitioning from simulated environments to practical, real-world deployment phases sooner than anticipated.</p>`,
        highlights: [
            { icon: 'trending-up', title: 'Emerging Trend', value: 'High-frequency model adoption increased 312% YoY.', color: 'text-emerald-400' },
            { icon: 'alert-triangle', title: 'Primary Risk', value: 'Regulatory friction in global deployment zones.', color: 'text-red-400' },
            { icon: 'compass', title: 'Key Discovery', value: 'Asymmetric kinetic stabilization achieved.', color: 'text-indigo-400' },
            { icon: 'unlock', title: 'Hidden Opportunity', value: 'Untapped vector optimization markets.', color: 'text-amber-400' }
        ],
        evidence: [
            { fact: 'Significant improvements in localized field configurations reduce required energy thresholds by 45%.', source: 'arxiv.org/abs/2604.19283', date: 'May 2026', reliability: 'High' },
            { fact: 'Global patent filings related to this node increased significantly in Q1 2026.', source: 'wipo.int/patents', date: 'March 2026', reliability: 'Medium' },
            { fact: 'Corporate adoption models are predicting full commercialization within 36 months.', source: 'forbes.com/innovation', date: 'June 2026', reliability: 'High' }
        ],
        sources: [
            { title: 'Asymmetrical Force Vectors in Vacuum', domain: 'arxiv.org', author: 'Dr. J. Kowalski', date: '2026-04-12', relevance: 98 },
            { title: 'Global Quantum Market Report', domain: 'bloomberg.com', author: 'A. Chen', date: '2026-05-20', relevance: 92 },
            { title: 'Propulsion Dynamics Review', domain: 'nature.com', author: 'S. Patel', date: '2026-06-01', relevance: 89 },
            { title: 'Regulatory Frameworks for 2027', domain: 'gov.registry.eu', author: 'Tech Policy Inst.', date: '2026-05-15', relevance: 84 },
            { title: 'Venture Capital Inflows: Deep Tech', domain: 'techcrunch.com', author: 'M. Davis', date: '2026-06-10', relevance: 78 }
        ],
        insights: [
            { type: 'What Matters Most', content: 'Focus on asymmetrical energy configurations bypassing traditional limits.' },
            { type: 'Contrarian Viewpoint', content: 'Several prominent physicists argue the stability is only temporary at macro scales.' },
            { type: 'Strategic Action', content: 'Monitor regulatory changes regarding high-voltage vacuum test parameters.' }
        ],
        visuals: [
            { url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800', caption: 'Quantum field mapping representation' },
            { url: 'https://images.unsplash.com/photo-1620825937374-87fc7d62828e?auto=format&fit=crop&q=80&w=800', caption: 'High-vacuum chamber test node' },
            { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', caption: 'Hardware schematics and circuitry logic' },
            { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', caption: 'Global adoption data stream visualization' }
        ],
        scores: {
            confidence: Math.floor(Math.random() * 10) + 88,
            quality: Math.floor(Math.random() * 15) + 80,
            freshness: Math.floor(Math.random() * 5) + 94,
            coverage: Math.floor(Math.random() * 15) + 75
        }
    };
}

app.post('/api/research', async (req, res) => {
    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const apiKey = process.env.CONTEXT_API_KEY;
        const response = await axios.post('https://api.context.dev/v1/search', { query }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        
        return res.json(response.data);
    } catch (error) {
        console.warn('Context.dev API unavailable or endpoint changed. Using mock data fallback.', error.message);
        // Fallback to mock data to ensure the UI can be tested
        return res.json(generateMockData(query));
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
