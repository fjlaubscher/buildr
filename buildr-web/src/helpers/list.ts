export const groupUnitUpgrades = (upgrades: buildr.DataSheetUpgrade[]) => {
  return upgrades.reduce(
    (acc, current) => ({
      ...acc,
      [current.id]: acc[current.id] ? [...acc[current.id], current] : [current]
    }),
    {} as { [key: number]: buildr.DataSheetUpgrade[] }
  );
};

const exportUnitUpgradesToChat = (upgrades: buildr.DataSheetUpgrade[]) => {
  if (upgrades.length > 0) {
    const groupedUpgrades = groupUnitUpgrades(upgrades);

    return Object.keys(groupedUpgrades)
      .map((key) => {
        const upgradesById = groupedUpgrades[parseInt(key)];
        const firstUpgrade = upgradesById[0];

        return `\n- ${upgradesById.length > 1 ? `${upgradesById.length} x ` : ''}${
          firstUpgrade.description
        }${firstUpgrade.points ? ` (${firstUpgrade.points * upgradesById.length})` : ''}`;
      })
      .join('');
  }

  return '';
};

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
