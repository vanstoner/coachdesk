import { useState, useEffect } from 'react';
import { db } from '../db/localDB';
import { createMatch } from '../models/matchModel';

function MatchManager({ onSelectMatch }) {
  const [matches, setMatches] = useState([]);
  const [opponent, setOpponent] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [homeScore, setHomeScore] = useState('0');
  const [awayScore, setAwayScore] = useState('0');
  const [homeAway, setHomeAway] = useState('home');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const allMatches = await db.matches.toArray();
    setMatches(allMatches);
  };

  const addMatch = async () => {
    if (!opponent.trim() || !matchDate) return;

    const newMatch = createMatch({
      date: matchDate,
      opponent,
      homeScore: parseInt(homeScore),
      awayScore: parseInt(awayScore),
      homeAway,
      completed,
    });

    const newId = await db.matches.add(newMatch);

    setOpponent('');
    setMatchDate('');
    setHomeScore('0');
    setAwayScore('0');
    setHomeAway('home');
    setCompleted(false);
    loadMatches();

    if (onSelectMatch) onSelectMatch(newId);
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
          aria-label="addMatchButton"
        >
          ➕ Add Match
        </button>
      </form>

      <table className="w-full border text-sm" aria-label="matchTable">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Opponent</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{match.date}</td>
              <td className="border px-2 py-1">{match.opponent}</td>
              <td className="border px-2 py-1 text-right">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => {
                    console.log('Clicked match id:', match.id);
                    onSelectMatch && onSelectMatch(match.id);
                  }}
                  aria-label={`viewMatch-${match.id}`}
                >
                  View ➝
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