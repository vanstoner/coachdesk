import { useEffect, useState } from 'react';
import { db } from '../db/localDB';

function SelectSquad({ match, onUpdate }) {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(new Set(match.selectedPlayers || []));

  useEffect(() => {
    const load = async () => {
      const allPlayers = await db.players.toArray();
      setPlayers(allPlayers);
    };
    load();
  }, []);

  const togglePlayer = (playerId) => {
    const updated = new Set(selected);
    if (updated.has(playerId)) {
      updated.delete(playerId);
    } else {
      updated.add(playerId);
    }
    setSelected(updated);
    onUpdate && onUpdate(Array.from(updated));
  };

  return (
    <div className="mt-6 p-4 border rounded shadow" aria-label="selectSquad">
      <h3 className="text-lg font-semibold mb-4">🎽 Select Squad</h3>
      <ul className="space-y-2">
        {players.map((p) => (
          <li key={p.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`player-${p.id}`}
              checked={selected.has(p.id)}
              onChange={() => togglePlayer(p.id)}
              aria-label={`selectPlayer-${p.id}`}
            />
            <label htmlFor={`player-${p.id}`} className="text-sm">
              {p.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectSquad;

