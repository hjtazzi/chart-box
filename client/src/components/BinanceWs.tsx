import { FC, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { Alert, Box } from '@mui/material';

import Charts from './Charts';
import { TData, TAlertState } from '../types/types';

const wsUrl = 'wss://stream.binance.com:9443/ws/btcusdt@kline_1s';

interface props { }

const WsChart: FC<props> = () => {
  const [data, setData] = useState<TData[]>([]);
  const [alerts, setAlerts] = useState<TAlertState[]>([]);

  useWebSocket(wsUrl, {
    onOpen: () => {
      const newAlert: TAlertState = {
        severity: 'success',
        text: `'${wsUrl}' on open`
      }
      setAlerts([...alerts, newAlert].slice(-3));
    },
    onMessage: (e: MessageEvent) => {
      const d = JSON.parse(e.data);
      const newData = [...data, {
        time: new Date(d.E),
        closePrice: d.k.c
      }];
      setData(newData.slice(-60));
    },
    onError: (err: Event) => {
      console.log(err);
      const newAlert: TAlertState = {
        severity: 'error',
        text: `connection to '${wsUrl}' failed`
      }
      setAlerts([...alerts, newAlert].slice(-3));
    },
    shouldReconnect: () => true,
  });

  return <>
    {alerts.map((val, i) => <Alert severity={val.severity} key={i} sx={{ mb: 1 }}>{val.text}</Alert>)}

    <Box sx={{ mt: 1 }}>
      <Charts data={data} />
    </Box>
  </>;
};

export default WsChart;