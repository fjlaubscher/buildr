import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// api
import BattlefieldRoleRouter from './api/battlefield-role';
import DataSheetRouter from './api/datasheet';
import DataSheetUpgradeRouter from './api/datasheet-upgrade';
import FactionRouter from './api/faction';
import SubFactionRouter from './api/sub-faction';

// helpers
import { isAuthenticated } from './helpers';

const initAPI = async () => {
  try {
    const app = express();
    app.use(express.json());

    app.use('/api/battlefield-role', BattlefieldRoleRouter);
    app.use('/api/datasheet', DataSheetRouter);
    app.use('/api/datasheet-upgrade', DataSheetUpgradeRouter);
    app.use('/api/faction', FactionRouter);
    app.use('/api/sub-faction', SubFactionRouter);

    app.post('/api/login', (req, res) => {
      const success = isAuthenticated(req.headers.authorization || '');
      return res
        .status(success ? 200 : 400)
        .json({ status: success ? 'ok' : 'error', data: success });
    });

    app.get('/', (req, res) => {
      return res.status(200).send('buildr API is running');
    });

    const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    app.listen(port, () => console.log(`buildr API is listening on http://localhost:${port}`));
  } catch (ex: any) {
    console.log(ex.stack);
  }
};

initAPI();
