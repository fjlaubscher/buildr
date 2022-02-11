const GameSize = Object.freeze({
  COMBAT_PATROL: 1,
  INCURSION: 2,
  STRIKE_FORCE: 3,
  ONSLAUGHT: 4
});

export const GameSizes = Object.freeze({
  [GameSize.COMBAT_PATROL]: 'Combat Patrol',
  [GameSize.INCURSION]: 'Incursion',
  [GameSize.STRIKE_FORCE]: 'Strike Force',
  [GameSize.ONSLAUGHT]: 'Onslaught'
});

export const CommandPoints = Object.freeze({
  [GameSize.COMBAT_PATROL]: 3,
  [GameSize.INCURSION]: 6,
  [GameSize.STRIKE_FORCE]: 12,
  [GameSize.ONSLAUGHT]: 18
});

export const PointsLimit = Object.freeze({
  [GameSize.COMBAT_PATROL]: 500,
  [GameSize.INCURSION]: 1000,
  [GameSize.STRIKE_FORCE]: 2000,
  [GameSize.ONSLAUGHT]: 3000
});
