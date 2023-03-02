import WebSocket from "ws";

import { TWsServer, TWsConnection } from "./types/types";

const wsServer: TWsServer = (address, port = 4343) => {
  const wsSr = new WebSocket.Server({ port: port });
  const WsCl = new WebSocket(address);

  let wsConnection: TWsConnection = undefined;

  // get data
  WsCl.on('open', () => {
    console.log(`connected to ${address}`);

    WsCl.on('message', (data) => {
      // push data to db
      // send wsServer
      if (wsConnection !== undefined) {
        wsConnection.send(data.toString());
        console.log(`Send data to port ${port}`);
      }
    });

    WsCl.on('error', (err: Error) => {
      console.log(err);
    });
  });

  // wsServer
  wsSr.on('connection', (ws) => {
    console.log(`Client connected port ${port}`);
    wsConnection = ws;

    ws.on("close", (code: number, reason: Buffer) => {
      console.log("Client disconnected");
    });

    ws.on('error', (err: Error) => {
      console.log(err);
    });
  });
}

export default wsServer;