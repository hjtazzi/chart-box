import fs from 'fs';
import path from 'path';

import WebSocket from 'ws';

import { TBinanceApi } from './utils/types/types';

const port = 4433;
const ws = new WebSocket.Server({ port: port });

const readData: Buffer = fs.readFileSync(path.join(__dirname, 'utils', 'data', 'fake-api.json'));
const fakeData: TBinanceApi[] = JSON.parse(readData.toString());

let dataIndex: number = 0;

ws.on('connection', (ws) => {
  console.log('Client connected');

  const interval = setInterval(() => {
    /*
    const random: number = Math.floor(Math.random() * fakeData.length);
    const dataSend: string = JSON.stringify(fakeData[random]);
    */
    const dataSend: string = JSON.stringify(fakeData[dataIndex]);
    if (dataIndex === fakeData.length - 1)
      dataIndex = 0
    else
      dataIndex++;

    ws.send(dataSend);
  }, 1000);

  ws.on("close", (code: number, reason: Buffer) => {
    clearInterval(interval);
    console.log("Client disconnected");
  });

  ws.on('error', (err: Error) => {
    console.log(err);
  });
});

console.log(`fake api run in port: '${port}'`);