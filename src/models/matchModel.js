export const defaultLineup = () => ({
  q1: [],
  q2: [],
  q3: [],
  q4: [],
});

export const createMatch = ({
  date = '',
  opponent = '',
  homeScore = 0,
  awayScore = 0,
  homeAway = 'home',
  completed = false,
  lineup = defaultLineup(),
  events = [],
} = {}) => ({
  date,
  opponent,
  homeScore,
  awayScore,
  homeAway,
  completed,
  lineup,
  events,
});

