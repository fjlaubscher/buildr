import dotenv from 'dotenv';

dotenv.config();

// api
import { createDataSheetAsync } from './api/datasheet';
import { createDataSheetUpgradeAsync } from './api/datasheet-upgrade';

// helpers
import { BattlefieldRoleTypes } from './helpers/battlefield-role';

const initCLI = async () => {
  try {
    const datasheet = await createDataSheetAsync({
      id: 0,
      minimumModels: 0,
      maximumModels: 0,
      points: 0,
      battlefieldRoleId: BattlefieldRoleTypes.HQ,
      subFactionId: 0,
      description: ''
    });

    if (datasheet) {
      const upgrades: buildr.DataSheetUpgrade[] = [];
      const upgradePromises = upgrades.map(createDataSheetUpgradeAsync);
      await Promise.all(upgradePromises);

      console.log(`Created ${datasheet.description} with ${upgrades.length} upgrades.`);
    }
  } catch (ex) {
    console.log(ex);
  }
};

initCLI();
