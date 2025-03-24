import { useEffect, useState } from 'react';
import { db } from '../db/localDB';
import SelectSquad from './SelectSquad';
import SquadLineupEditor from './SquadLineupEditor';

function MatchDetailView({ matchId, onBack }) {
  const [match, setMatch] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [lineup, setLineup] = useState({});

  useEffect(() => {
    const load = async () => {
      const data = await db.matches.get(matchId);
      setMatch(data);
      setSelectedPlayers(data.selectedPlayers || []);
      setLineup(data.lineup || {});
    };
    load();
  }, [matchId]);

  const updateSelectedPlayers = async (updated) => {
    setSelectedPlayers(updated);

    // Remove lineup data for deselected players
    const cleanedLineup = Object.fromEntries(
      Object.entries(lineup).filter(([playerId]) => updated.includes(Number(playerId)))
    );
    setLineup(cleanedLineup);

    await db.matches.update(matchId, {
      selectedPlayers: updated,
      lineup: cleanedLineup,
    });
  };

  const updateLineup = async (updated) => {
    setLineup(updated);
    await db.matches.update(matchId, { lineup: updated });
  };

  if (!match) return <div className="p-4">Loading match...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Match vs {match.opponent} ({match.date})
        </h2>
        <button
          className="text-blue-600 text-sm hover:underline"
          onClick={onBack}
        >
          ← Back
        </button>
      </div>

      <SelectSquad match={{ ...match, selectedPlayers }} onUpdate={updateSelectedPlayers} />
      <SquadLineupEditor
        match={{ ...match, selectedPlayers, lineup }}
        onUpdate={updateLineup}
      />
    </div>
  );
}

export default MatchDetailView;

