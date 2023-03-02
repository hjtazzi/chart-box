import path from 'path';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import wsServer from './utils/ws-server';
import router from './routes/routes';

const binanceAddress = 'ws://localhost:4433'; // set real address. 'wss://stream.binance.com:9443/ws/btcusdt@kline_1s'
wsServer(binanceAddress);

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(80);