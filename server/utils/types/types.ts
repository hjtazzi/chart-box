import WebSocket from "ws";

export type TWsConnection = WebSocket.WebSocket | undefined;

export type TWsServer = (address: string, port?: number) => void;


export type TBinanceApi = {
  e: string,
  E: number,
  s: string,
  k: {
    t: number,
    T: number,
    s: string,
    i: string,
    f: number,
    L: number,
    o: string,
    c: string,
    h: string,
    l: string,
    v: string,
    n: number,
    x: boolean,
    q: string,
    V: string,
    Q: string,
    B: string
  }
};