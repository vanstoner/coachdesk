import { useEffect, useState } from 'react';
import { db } from '../db/localDB';

function SquadLineupEditor({ match, onUpdate }) {
  const [players, setPlayers] = useState([]);
  const [positions, setPositions] = useState([]);
  const [lineup, setLineup] = useState(match.lineup || {});
  const [showTeamSheet, setShowTeamSheet] = useState(false);

  const selectedPlayers = match.selectedPlayers || [];
  const quarters = ['q1', 'q2', 'q3', 'q4'];

  useEffect(() => {
    const load = async () => {
      const allPlayers = await db.players.toArray();
      const allPositions = await db.positions.toArray();
      setPlayers(allPlayers);
      setPositions(allPositions);
    };
    load();
  }, []);

  const handleChange = (playerId, quarter, value) => {
    const updated = {
      ...lineup,
      [playerId]: {
        ...(lineup[playerId] || {}),
        [quarter]: value,
      },
    };
    setLineup(updated);
    onUpdate && onUpdate(updated);
  };

  const getPlayerName = (id) =>
    players.find((p) => p.id === id)?.name || `Player ${id}`;

  const generateTeamSheet = () => {
    setShowTeamSheet((prev) => !prev);
  };

  const getTeamSheet = () => {
    const teamSheet = {};
    positions.forEach((pos) => {
      teamSheet[pos.name] = {};
      quarters.forEach((q) => {
        const player = selectedPlayers.find(
          (pid) => lineup?.[pid]?.[q] === pos.name
        );
        teamSheet[pos.name][q] = player ? getPlayerName(player) : '';
      });
    });
    return teamSheet;
  };

  const getTakenPositions = (quarter) => {
    return new Set(
      selectedPlayers.map((pid) => lineup?.[pid]?.[quarter]).filter(Boolean)
    );
  };

  const teamSheet = getTeamSheet();

  return (
    <div className="mt-8 p-4 border rounded shadow" aria-label="squadLineupEditor">
      <h3 className="text-lg font-semibold mb-4">📋 Quarter-by-Quarter Positions</h3>

      <table className="w-full text-sm mb-4" aria-label="lineupTable">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 text-left">Player</th>
            {quarters.map((q) => (
              <th key={q} className="border px-2 py-1 text-center">{q.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedPlayers.map((playerId) => (
            <tr key={playerId}>
              <td className="border px-2 py-1">{getPlayerName(playerId)}</td>
              {quarters.map((q) => {
                const taken = getTakenPositions(q);
                const currentValue = lineup?.[playerId]?.[q];
                return (
                  <td key={q} className="border px-2 py-1">
                    <select
                      className="w-full border px-2 py-1 rounded"
                      aria-label={`player-${playerId}-${q}`}
                      value={currentValue || ''}
                      onChange={(e) => handleChange(playerId, q, e.target.value)}
                    >
                      <option value="">Select</option>
                      {positions.map((pos) => {
                        const isTaken = taken.has(pos.name) && currentValue !== pos.name;
                        return (
                          <option
                            key={pos.id}
                            value={pos.name}
                            disabled={isTaken}
                          >
                            {pos.name}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                );
              })}
              <td className="border px-2 py-1 text-center">
                <button
                  onClick={() => {
                    const updated = { ...lineup };
                    delete updated[playerId];
                    setLineup(updated);
                    onUpdate && onUpdate(updated);
                  }}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`clearPlayer-${playerId}`}
                  title="Clear this player’s positions"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <button
        type="button"
        onClick={generateTeamSheet}
        className="text-sm text-blue-600 hover:underline mb-4"
        aria-label="generateTeamSheetButton"
      >
        📄 {showTeamSheet ? 'Hide' : 'Generate'} Teamsheet
      </button>

      {showTeamSheet && (
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">🧾 Static Teamsheet</h4>
          <table className="w-full text-sm border rounded" aria-label="staticTeamSheet">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1 text-left">Position</th>
                {quarters.map((q) => (
                  <th key={q} className="border px-2 py-1 text-center">{q.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {positions.map((pos) => (
                <tr key={pos.id}>
                  <td className="border px-2 py-1 font-medium">{pos.name}</td>
                  {quarters.map((q) => (
                    <td key={q} className="border px-2 py-1 text-center">
                      {teamSheet[pos.name][q] || '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SquadLineupEditor;

