import { useState, useEffect } from 'react';
import { db } from '../db/localDB';

function MatchManager({ onSelectMatch }) {
  const [matches, setMatches] = useState([]);
  const [matchDate, setMatchDate] = useState('');
  const [opponent, setOpponent] = useState('');
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
    const newId = await db.matches.add({
      opponent,
      date: matchDate,
      homeScore,
      awayScore,
      homeAway,
      completed,
    });
    setOpponent('');
    setMatchDate('');
    setHomeScore('0');
    setAwayScore('0');
    setHomeAway('home');
    setCompleted(false);
    loadMatches();
    if (onSelectMatch) onSelectMatch(newId);
  };

  const deleteMatch = async (id) => {
    await db.matches.delete(id);
    loadMatches();
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📅 Match Manager</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMatch();
        }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-end mb-6"
        aria-label="addMatchForm"
      >
        <input
          aria-label="matchDate"
          type="date"
          className="border px-3 py-2 rounded shadow-sm"
          value={matchDate}
          onChange={(e) => setMatchDate(e.target.value)}
        />

        <input
          aria-label="opponent"
          type="text"
          placeholder="Opponent"
          className="border px-3 py-2 rounded shadow-sm"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
        />

        <select
          aria-label="homeScore"
          className="border px-3 py-2 rounded shadow-sm"
          value={homeScore}
          onChange={(e) => setHomeScore(e.target.value)}
        >
          {[...Array(21).keys()].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <select
          aria-label="awayScore"
          className="border px-3 py-2 rounded shadow-sm"
          value={awayScore}
          onChange={(e) => setAwayScore(e.target.value)}
        >
          {[...Array(21).keys()].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <label>
            <input
              type="radio"
              name="homeAway"
              value="home"
              aria-label="homeToggle"
              checked={homeAway === 'home'}
              onChange={() => setHomeAway('home')}
            /> Home
          </label>
          <label>
            <input
              type="radio"
              name="homeAway"
              value="away"
              aria-label="awayToggle"
              checked={homeAway === 'away'}
              onChange={() => setHomeAway('away')}
            /> Away
          </label>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            aria-label="completed"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          Completed
        </label>

        <button
          type="submit"
          aria-label="addMatchButton"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Match
        </button>
      </form>

      <table aria-label="matchTable" className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Opponent</th>
            <th className="border px-2 py-1">Score</th>
            <th className="border px-2 py-1">Home/Away</th>
            <th className="border px-2 py-1">Completed</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id} className="text-center">
              <td className="border px-2 py-1">{match.date}</td>
              <td className="border px-2 py-1">{match.opponent}</td>
              <td className="border px-2 py-1">{match.homeScore} - {match.awayScore}</td>
              <td className="border px-2 py-1">{match.homeAway}</td>
              <td className="border px-2 py-1">{match.completed ? 'Yes' : 'No'}</td>
              <td className="border px-2 py-1">
                <button
                  aria-label={`deleteMatch-${match.id}`}
                  onClick={() => deleteMatch(match.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  −
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

