import path from 'path';
import fs from 'fs';
import express, { Request, Response, NextFunction } from 'express';

import { TBinanceApi } from '../utils/types/types';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/json/fake-data', (req: Request, res: Response, next: NextFunction) => {
  const dataRead: Buffer = fs.readFileSync(path.join(__dirname, '..', 'utils', 'data', 'fake-api.json'));
  const dataSend: TBinanceApi[] = JSON.parse(dataRead.toString());
  
  res.status(200).json(dataSend);
});

export default router;