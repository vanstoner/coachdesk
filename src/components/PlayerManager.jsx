import { useState, useEffect } from 'react';
import { db } from '../db/localDB';

function PlayerManager() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [newPosition, setNewPosition] = useState('');

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const allPlayers = await db.players.toArray();
    setPlayers(allPlayers);
  };

  const addPlayer = async () => {
    if (!newPlayer.trim()) return;
    await db.players.add({ name: newPlayer.trim(), position: newPosition.trim() });
    setNewPlayer('');
    setNewPosition('');
    loadPlayers();
  };

  const deletePlayer = async (id) => {
    await db.players.delete(id);
    loadPlayers();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">🎯 Player Manager</h2>

      {/* Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPlayer();
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        aria-label="Add Player Form"
      >
        <div className="flex flex-col">
          <label htmlFor="player-name" className="text-sm font-medium text-gray-700 mb-1">Player Name</label>
          <input
            id="player-name"
            name="playerName"
            type="text"
            className="border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="player-position" className="text-sm font-medium text-gray-700 mb-1">Position</label>
          <input
            id="player-position"
            name="position"
            type="text"
            className="border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            aria-label="Add Player"
          >
            ➕ Add Player
          </button>
        </div>
      </form>

      <hr className="my-4 border-gray-300" />

      {/* Player Table */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 font-semibold">Name</th>
            <th className="p-2 font-semibold">Position</th>
            <th className="p-2 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="border-t">
              <td className="p-2">{player.name}</td>
              <td className="p-2">{player.position}</td>
              <td className="p-2 text-right">
                <button
                  className="text-red-600 hover:text-red-800 text-sm px-2 py-1 border border-red-300 rounded-full"
                  onClick={() => deletePlayer(player.id)}
                  aria-label={`Delete ${player.name}`}
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

export default PlayerManager;

