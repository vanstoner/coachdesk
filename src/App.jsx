import { useState, useEffect } from 'react';
import PlayerManager from './components/PlayerManager';
import MatchManager from './components/MatchManager';
import MatchDetailView from './components/MatchDetailView';
import PositionsManager from './components/PositionsManager';

function App() {
  const [view, setView] = useState('matches'); // 'matches' | 'matchDetail' | 'setup'
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  const goToMatchDetail = (id) => {
    setSelectedMatchId(id);
    setView('matchDetail');
  };

  const goBackToMatches = () => {
    setSelectedMatchId(null);
    setView('matches');
  };

  useEffect(() => {
    console.log('Selected Match ID:', selectedMatchId);
  }, [selectedMatchId]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
        <header className="flex justify-between items-center mb-6">
          <div className="text-center w-full">
            <h1 className="text-4xl font-extrabold text-blue-700">CoachDesk</h1>
            <p className="text-lg text-gray-600">Your grassroots match tracking assistant</p>
          </div>
          {view !== 'setup' && (
            <button
              onClick={() => setView('setup')}
              className="text-sm text-blue-600 hover:underline absolute right-4 top-4"
              aria-label="setupButton"
            >
              ⚙️ Setup
            </button>
          )}
        </header>

        {view === 'matches' && (
          <section className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
            <MatchManager onSelectMatch={goToMatchDetail} />
          </section>
        )}

        {view === 'matchDetail' && selectedMatchId !== null && (
          <MatchDetailView matchId={selectedMatchId} onBack={goBackToMatches} />
        )}

        {view === 'setup' && (
          <>
            <button
              onClick={goBackToMatches}
              className="text-sm text-blue-600 hover:underline mb-4"
              aria-label="backToMatchesButton"
            >
              ← Back to Matches
            </button>
            <section className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm mb-8">
              <PlayerManager />
            </section>
            <section className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
              <PositionsManager />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;