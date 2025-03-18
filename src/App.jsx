import PlayerManager from './components/PlayerManager';
import MatchManager from './components/MatchManager';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-blue-700">CoachDesk</h1>
          <p className="text-lg text-gray-600">Your grassroots match tracking assistant</p>
        </header>

        <section className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
          <MatchManager />
        </section>

        <section className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
          <PlayerManager />
        </section>
      </main>
    </div>
  );
}

export default App;

