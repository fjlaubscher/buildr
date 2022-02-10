import { Router } from 'express';

import {
  createDataSheetAsync,
  getDataSheetsBySubFactionIdAndBattlefieldRoleIdAsync,
  getDataSheetsBySubFactionIdAsync
} from '../db/datasheet';
import { getSubFactionsAsync, getSubFactionByIdAsync } from '../db/sub-faction';

// helpers
import { isAuthenticated } from '../helpers';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const subFactions = await getSubFactionsAsync();
    return res.status(200).json({ status: 'ok', data: subFactions });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const subFaction = await getSubFactionByIdAsync(id);
    return res.status(200).json({ status: 'ok', data: subFaction });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/datasheets', async (req, res) => {
  try {
    const factionId = parseInt(req.params.id);
    const dataSheets = await getDataSheetsBySubFactionIdAsync(factionId);
    return res.status(200).json({ status: 'ok', data: dataSheets });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/datasheets/by-battlefield-role/:battlefieldRoleId', async (req, res) => {
  try {
    const factionId = parseInt(req.params.id);
    const battlefieldRoleId = parseInt(req.params.battlefieldRoleId);
    const dataSheets = await getDataSheetsBySubFactionIdAndBattlefieldRoleIdAsync(factionId, battlefieldRoleId);
    return res.status(200).json({ status: 'ok', data: dataSheets });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.post('/:id/datasheets', async (req, res) => {
  if (req.headers.authorization && isAuthenticated(req.headers.authorization)) {
    try {
      const dataSheet = await createDataSheetAsync(req.body as buildr.DataSheet);
      return res.status(200).json({ status: 'ok', data: dataSheet });
    } catch (ex: any) {
      return res.status(500).json({ status: 'error', data: ex.message });
    }
  } else {
    return res.status(401).send();
  }
});

export default router;
