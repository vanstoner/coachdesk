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
      <form onSubmit={(e) => { e.preventDefault(); addMatch(); }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            aria-label="addMatchForm">
        <div className="flex flex-col">
          <label htmlFor="match-date" className="text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            id="match-date"
            type="date"
            className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
            value={matchDate}
            onChange={(e) => setMatchDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="match-opponent" className="text-sm font-medium text-gray-700 mb-1">Opponent</label>
          <input
            id="match-opponent"
            type="text"
            className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <button type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  aria-label="addMatchButton">
            ➕ Add Match
          </button>
        </div>
      </form>
      <hr className="border-gray-300" />
      <table className="w-full border border-gray-300 text-sm" aria-label="matchTable">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300">Date</th>
            <th className="p-2 border border-gray-300">Opponent</th>
            <th className="p-2 border border-gray-300 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id} className="hover:bg-gray-50 cursor-pointer"
                onClick={() => selectMatch(match.id)}
                role="button"
                aria-label={`selectMatch-${match.opponent}`}
                tabIndex="0"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectMatch(match.id); }}>
              <td className="p-2 border border-gray-200">{match.date}</td>
              <td className="p-2 border border-gray-200">{match.opponent}</td>
              <td className="p-2 border border-gray-200 text-right">
                <button className="text-red-600 hover:text-red-800 text-sm px-2 py-1 border border-red-300 rounded-full"
                        onClick={(e) => { e.stopPropagation(); deleteMatch(match.id); }}
                        aria-label={`deleteMatchButton-${match.opponent}`}>
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
