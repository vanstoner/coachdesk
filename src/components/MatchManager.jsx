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

  const deleteMatch = async (id) => {
    await db.matches.delete(id);
    loadMatches();
  };

  const selectMatch = (id) => {
    if (onSelectMatch) onSelectMatch(id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📅 Match Manager</h2>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMatch();
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        aria-label="Add Match Form"
      >
        <div className="flex flex-col">
          <label htmlFor="match-date" className="text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            id="match-date"
            name="matchDate"
            type="date"
            className="border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
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
            className="border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            aria-label="Add Match"
          >
            ➕ Add Match
          </button>
        </div>
      </form>

      <hr className="my-4 border-gray-300" />

      {/* Match Table */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 font-semibold">Date</th>
            <th className="p-2 font-semibold">Opponent</th>
            <th className="p-2 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr
              key={match.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
              role="button"
              aria-label={`Select match against ${match.opponent} on ${match.date}`}
              onClick={() => selectMatch(match.id)}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') selectMatch(match.id);
              }}
            >
              <td className="p-2">{match.date}</td>
              <td className="p-2">{match.opponent}</td>
              <td className="p-2 text-right">
                <button
                  className="text-red-600 hover:text-red-800 text-sm px-2 py-1 border border-red-300 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent match selection click
                    deleteMatch(match.id);
                  }}
                  aria-label={`Delete match against ${match.opponent}`}
                >
                  ➖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MatchManager;

