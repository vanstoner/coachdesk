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
      <form onSubmit={(e) => { e.preventDefault(); addPlayer(); }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            aria-label="addPlayerForm">
        <div className="flex flex-col">
          <label htmlFor="player-name" className="text-sm font-medium text-gray-700 mb-1">Player Name</label>
          <input
            id="player-name"
            type="text"
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="player-position" className="text-sm font-medium text-gray-700 mb-1">Position</label>
          <input
            id="player-position"
            type="text"
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <button type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm"
                  aria-label="addPlayerButton">
            ➕ Add Player
          </button>
        </div>
      </form>
      <hr className="border-gray-300" />
      <table className="w-full border border-gray-300 text-sm" aria-label="playerTable">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Position</th>
            <th className="p-2 border border-gray-300 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="p-2 border border-gray-200">{player.name}</td>
              <td className="p-2 border border-gray-200">{player.position}</td>
              <td className="p-2 border border-gray-200 text-right">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm"
                        onClick={() => deletePlayer(player.id)}
                        aria-label={`deletePlayerButton-${player.name}`}>
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
