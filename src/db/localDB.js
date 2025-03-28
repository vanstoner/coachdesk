import Dexie from 'dexie';

// Use environment variable for DB name, fallback to default
const dbName = import.meta.env.VITE_DB_NAME || 'CoachDeskDB';

export const db = new Dexie(dbName);

db.version(1).stores({
  players: '++id, name',
  matches: '++id,date,opponent,lineup,selectedPlayers,result,home,completed,events',
  events: '++id, matchId, playerId, type, time, quarter',
  lineups: '++id, matchId, playerId, quarter',
  positions: '++id,name'
});

