import { useState, useEffect } from 'react';
import { db } from '../db/localDB';

function MatchManager({ onSelectMatch }) {
  const [matches, setMatches] = useState([]);
  const [opponent, setOpponent] = useState('');
  const [matchDate, setMatchDate] = useState('');

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const allMatches = await db.matches.toArray();
    setMatches(allMatches);
  };

  const addMatch = async () => {
    if (!opponent.trim() || !matchDate) return;
    const newId = await db.matches.add({ opponent, date: matchDate });
    setOpponent('');
    setMatchDate('');
    loadMatches();
    if (onSelectMatch) onSelectMatch(newId);
  };

  const selectMatch = (id) => {
    if (onSelectMatch) onSelectMatch(id);
  };

  return (
    <div className="mt-10 max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📅 Match Manager</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMatch();
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-6"
        aria-label="Add Match Form"
      >
        <div className="flex flex-col">
          <label htmlFor="match-date" className="text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            id="match-date"
            name="matchDate"
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={matchDate}
            onChange={(e) => setMatchDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="match-opponent" className="text-sm font-medium text-gray-700 mb-1">Opponent</label>
          <input
            id="match-opponent"
            name="opponent"
            type="text"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
          aria-label="Add Match"
        >
          ➕ Add Match
        </button>
      </form>

      <ul className="space-y-3">
        {matches.map((match) => (
          <li
            key={match.id}
            className="flex justify-between items-center p-3 border rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition"
            onClick={() => selectMatch(match.id)}
            role="button"
            aria-label={`Select match against ${match.opponent} on ${match.date}`}
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') selectMatch(match.id);
            }}
          >
            <div>
              <div className="text-sm font-medium text-gray-800">{match.date}</div>
              <div className="text-xs text-gray-500">{match.opponent}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchManager;

