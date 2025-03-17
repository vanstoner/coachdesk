
import PlayerManager from './components/PlayerManager';
import MatchManager from './components/MatchManager';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-2">CoachDesk</h1>
          <p className="text-base text-gray-600">Your grassroots match tracking assistant</p>
        </header>

        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
          <MatchManager />
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
          <PlayerManager />
        </section>
      </div>
    </div>
  );
}

export default App;

