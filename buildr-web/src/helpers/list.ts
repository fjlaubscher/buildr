const exportUnitUpgradesToChat = (upgrades: buildr.DataSheetUpgrade[]) =>
  upgrades.length > 0
    ? `\n${upgrades.map((up) => `- ${up.description} (${up.points})`).join('\n')}`
    : '';

const exportUnitToChat = (unit: buildr.List.Unit) =>
  `*${unit.models > 1 ? `${unit.models} x ` : ''}${unit.datasheet.description}* (${
    unit.datasheet.points * unit.models
  })${exportUnitUpgradesToChat(unit.upgrades)}`;

export const exportToChat = (list: buildr.List, subFaction: buildr.SubFaction) => {
  const units = [...list.units];
  units.sort((a, b) => a.datasheet.battlefieldRoleId - b.datasheet.battlefieldRoleId);

  return `*${list.name}*\n*Faction*: ${subFaction.description}\n*Points*: ${list.points}\n\n${units
    .map(exportUnitToChat)
    .join('\n\n')}\n\n`;
};
