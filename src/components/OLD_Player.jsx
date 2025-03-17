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
    if (newPlayer.trim() === '') return;
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
    <div className="mt-10 max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 Player Manager</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPlayer();
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-6"
        aria-label="Add Player Form"
      >
        <div className="flex flex-col">
          <label htmlFor="player-name" className="text-sm font-medium text-gray-700 mb-1">Player Name</label>
          <input
            id="player-name"
            name="playerName"
            type="text"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
          aria-label="Add Player"
        >
          ➕ Add Player
        </button>
      </form>

      <ul className="space-y-3">
        {players.map((player) => (
          <li
            key={player.id}
            className="flex justify-between items-center p-3 border rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            <div>
              <div className="text-sm font-medium text-gray-800">{player.name}</div>
              <div className="text-xs text-gray-500">{player.position}</div>
            </div>
            <button
              className="text-sm text-red-600 hover:underline"
              onClick={() => deletePlayer(player.id)}
              aria-label={`Delete ${player.name}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerManager;

