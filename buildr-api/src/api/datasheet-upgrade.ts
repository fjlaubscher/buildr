import { Router } from 'express';

// db
import {
  getDatasheetUpgradeByIdAsync,
  updateDataSheetUpgradeAsync,
  deleteDataSheetUpgradeAsync
} from '../db/datasheet-upgrade';

// helpers
import { isAuthenticated } from '../helpers';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const upgradeId = parseInt(req.params.id);
    const upgrade = await getDatasheetUpgradeByIdAsync(upgradeId);
    return res.status(200).json({ status: 'ok', data: upgrade });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.put('/:id', async (req, res) => {
  if (req.headers.authorization && isAuthenticated(req.headers.authorization)) {
    try {
      const upgrade = await updateDataSheetUpgradeAsync(req.body as buildr.DataSheetUpgrade);
      return res.status(200).json({ status: 'ok', data: upgrade });
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
      const upgradeId = parseInt(req.params.id);
      const success = await deleteDataSheetUpgradeAsync(upgradeId);
      return res.status(200).json({ status: 'ok', data: success });
    } catch (ex: any) {
      return res.status(500).json({ status: 'error', data: ex.message });
    }
  } else {
    return res.status(401).send();
  }
});

export default router;
