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

const exportUnitUpgradesToChat = (upgrades: buildr.DataSheetUpgrade[]) =>
  upgrades.length > 0
    ? `\n${upgrades.map((up) => `- ${up.description} (${up.points})`).join('\n')}`
    : '';

const exportUnitToChat = (unit: buildr.List.Unit) =>
  `*${unit.datasheet.description}* (${
    unit.datasheet.points * unit.models
  })${exportUnitUpgradesToChat(unit.upgrades)}`;

export const exportToChat = (list: buildr.List, subFaction: buildr.SubFaction) => {
  return `*${list.name}*\n*Faction*: ${subFaction.description}\n*Game Size*: ${
    GameSizes[list.gameSizeId]
  }\n*Points*: ${list.points}/${PointsLimit[list.gameSizeId]}\n\n${list.units
    .map(exportUnitToChat)
    .join('\n\n')}\n\n`;
};
