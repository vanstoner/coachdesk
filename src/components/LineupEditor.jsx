import { useState, useEffect } from 'react';
import { db } from '../db/localDB';

function LineupEditor({ match, onUpdate }) {
  const [players, setPlayers] = useState([]);
  const [positions, setPositions] = useState([]);
  const [lineup, setLineup] = useState(match.lineup || { q1: [], q2: [], q3: [], q4: [] });

  useEffect(() => {
    const load = async () => {
      const allPlayers = await db.players.toArray();
      const allPositions = await db.positions.toArray();
      setPlayers(allPlayers);
      setPositions(allPositions);
    };
    load();
  }, []);

  const handleChange = (quarter, index, key, value) => {
    const updated = [...(lineup[quarter] || [])];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    const newLineup = { ...lineup, [quarter]: updated };
    setLineup(newLineup);
    if (onUpdate) onUpdate(newLineup);
  };

  const addPlayerToQuarter = (quarter) => {
    const updated = [...(lineup[quarter] || []), { playerId: '', position: '' }];
    const newLineup = { ...lineup, [quarter]: updated };
    setLineup(newLineup);
    if (onUpdate) onUpdate(newLineup);
  };

  const quarters = ['q1', 'q2', 'q3', 'q4'];

  return (
    <div className="mt-8 p-4 border rounded shadow" aria-label="lineupEditor">
      <h3 className="text-lg font-semibold mb-4">🧤 Lineup Editor</h3>

      {quarters.map((quarter) => (
        <div key={quarter} className="mb-6">
          <h4 className="font-bold mb-2">Quarter {quarter.slice(1)}</h4>
          <table className="w-full text-sm mb-2" aria-label={`${quarter}LineupTable`}>
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-left">Player</th>
                <th className="border px-2 py-1 text-left">Position</th>
              </tr>
            </thead>
            <tbody>
              {(lineup[quarter] || []).map((entry, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">
                    <select
                      aria-label={`${quarter}-player-${idx}`}
                      className="w-full border px-2 py-1 rounded"
                      value={entry.playerId}
                      onChange={(e) =>
                        handleChange(quarter, idx, 'playerId', parseInt(e.target.value))
                      }
                    >
                      <option value="">Select player</option>
                      {players.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-2 py-1">
                    <select
                      aria-label={`${quarter}-position-${idx}`}
                      className="w-full border px-2 py-1 rounded"
                      value={entry.position}
                      onChange={(e) =>
                        handleChange(quarter, idx, 'position', e.target.value)
                      }
                    >
                      <option value="">Select position</option>
                      {positions.length > 0 ? (
                        positions.map((pos) => (
                          <option key={pos.id} value={pos.name}>
                            {pos.name}
                          </option>
                        ))
                      ) : (
                        <option disabled value="">
                          No positions defined
                        </option>
                      )}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            onClick={() => addPlayerToQuarter(quarter)}
            className="text-sm text-blue-600 hover:underline"
            aria-label={`addPlayer-${quarter}`}
          >
            ➕ Add Player to Q{quarter.slice(1)}
          </button>
        </div>
      ))}
    </div>
  );
}

export default LineupEditor;
