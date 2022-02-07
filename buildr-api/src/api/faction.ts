import { Router } from 'express';

// db
import { getFactionsAsync } from '../db/faction';
import { getSubFactionsByFactionIdAsync } from '../db/sub-faction';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const factions = await getFactionsAsync();
    return res.status(200).json({ status: 'ok', data: factions });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/sub-factions', async (req, res) => {
  try {
    const factionId = parseInt(req.params.id);
    const subFactions = await getSubFactionsByFactionIdAsync(factionId);
    return res.status(200).json({ status: 'ok', data: subFactions });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
