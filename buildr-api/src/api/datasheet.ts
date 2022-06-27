import { Router } from 'express';

// db
import { getDatasheetByIdAsync, updateDataSheetAsync, deleteDataSheetAsync, createDataSheetAsync, getDataSheetsAsync } from '../db/datasheet';
import {
  createDataSheetUpgradeAsync,
  getUpgradesByDataSheetIdAsync
} from '../db/datasheet-upgrade';

// helpers
import { isAuthenticated } from '../helpers';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const dataSheets = await getDataSheetsAsync();
    return res.status(200).json({ status: 'ok', data: dataSheets });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.post('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const dataSheetId = parseInt(req.params.id);
    const dataSheet = await getDatasheetByIdAsync(dataSheetId);
    return res.status(200).json({ status: 'ok', data: dataSheet });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.put('/:id', async (req, res) => {
  if (req.headers.authorization && isAuthenticated(req.headers.authorization)) {
    try {
      const dataSheet = await updateDataSheetAsync(req.body as buildr.DataSheet);
      return res.status(200).json({ status: 'ok', data: dataSheet });
    } catch (ex: any) {
      return res.status(500).json({ status: 'error', data: ex.message });
    }
  } else {
    return res.status(401).send();
  }
});

router.delete('/:id', async (req, res) => {
  if (req.headers.authorization && isAuthenticated(req.headers.authorization)) {
    try {
      const datasheetId = parseInt(req.params.id);
      const success = await deleteDataSheetAsync(datasheetId);
      return res.status(200).json({ status: 'ok', data: success });
    } catch (ex: any) {
      return res.status(500).json({ status: 'error', data: ex.message });
    }
  } else {
    return res.status(401).send();
  }
});

router.get('/:id/upgrades', async (req, res) => {
  try {
    const dataSheetId = parseInt(req.params.id);
    const upgrades = await getUpgradesByDataSheetIdAsync(dataSheetId);
    return res.status(200).json({ status: 'ok', data: upgrades });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.post('/:id/upgrades', async (req, res) => {
  if (req.headers.authorization && isAuthenticated(req.headers.authorization)) {
    try {
      const upgrade = await createDataSheetUpgradeAsync(req.body as buildr.DataSheetUpgrade);
      return res.status(200).json({ status: 'ok', data: upgrade });
    } catch (ex: any) {
      return res.status(500).json({ status: 'error', data: ex.message });
    }
  } else {
    return res.status(401).send();
  }
});

export default router;
