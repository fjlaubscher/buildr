export const BattlefieldRoleTypes = Object.freeze({
  HQ: 1,
  TROOPS: 2,
  ELITES: 3,
  FAST_ATTACK: 4,
  FLYER: 5,
  HEAVY_SUPPORT: 6,
  FORTIFICATION: 7,
  DEDICATED_TRANSPORT: 8,
  LORD_OF_WAR: 9
});

export const getBattlefieldRole = (id: number) => {
  switch (id) {
    case BattlefieldRoleTypes.HQ:
      return 'HQ';
    case BattlefieldRoleTypes.TROOPS:
      return 'Troops';
    case BattlefieldRoleTypes.ELITES:
      return 'Elites';
    case BattlefieldRoleTypes.FAST_ATTACK:
      return 'Fast Attack';
    case BattlefieldRoleTypes.FLYER:
      return 'Flyer';
    case BattlefieldRoleTypes.HEAVY_SUPPORT:
      return 'Heavy Support';
    case BattlefieldRoleTypes.FORTIFICATION:
      return 'Fortification';
    case BattlefieldRoleTypes.DEDICATED_TRANSPORT:
      return 'Dedicated Transport';
    case BattlefieldRoleTypes.LORD_OF_WAR:
      return 'Lord of War';
    default:
      return 'No force organisation slot';
  }
};

export const groupDataSheetsByRole = (dataSheets: buildr.DataSheet[]) =>
  dataSheets.reduce((acc, current) => {
    const key = current.battlefieldRoleId;
    const dataSheetsByRole = acc[key];

    acc[key] = dataSheetsByRole ? [...dataSheetsByRole, current] : [current];

    return acc;
  }, {} as { [key: number]: buildr.DataSheet[] });
