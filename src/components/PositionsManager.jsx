import { useEffect, useState } from 'react';
import { db } from '../db/localDB';

function PositionsManager() {
  const [positions, setPositions] = useState([]);
  const [newPosition, setNewPosition] = useState('');

  useEffect(() => {
    loadPositions();
  }, []);

  const loadPositions = async () => {
    const allPositions = await db.positions.toArray();
    setPositions(allPositions);
  };

  const addPosition = async () => {
    if (newPosition.trim() === '') return;
    await db.positions.add({ name: newPosition.trim() });
    setNewPosition('');
    loadPositions(); // ⬅ refresh state after add
  };

  const deletePosition = async (id) => {
    await db.positions.delete(id);
    loadPositions(); // ⬅ refresh state after delete
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Position Manager</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border px-2 py-1 rounded"
          placeholder="Position Name"
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
          aria-label="positionNameInput"
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded"
          onClick={addPosition}
          aria-label="addPositionButton"
        >
          Add
        </button>
      </div>

      <table className="w-full text-sm border rounded" aria-label="positionTable">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 text-left">Position</th>
            <th className="border px-2 py-1 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => (
            <tr key={pos.id}>
              <td className="border px-2 py-1">{pos.name}</td>
              <td className="border px-2 py-1">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => deletePosition(pos.id)}
                  aria-label={`deletePosition-${pos.id}`}
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

export default PositionsManager;
