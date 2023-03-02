import { FC, useState } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

import Charts from './Charts';
import { TData, TAlertState } from '../types/types';

interface props { }

const getUrl = 'http://localhost/json/fake-data';

const FeachChart: FC<props> = () => {
  const [data, setData] = useState<TData[]>([]);
  const [alerts, setAlerts] = useState<TAlertState[]>([]);

  const onFeach = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    axios.get(getUrl)
      .then((response) => {
        const d = response.data;
        
        const newData = d.map((val: any) => {
          return {
            time: new Date(val.E),
            closePrice: val.k.c
          }
        });
        const newAlert: TAlertState = {
          severity: 'success',
          text: `Get the data from '${getUrl}'`
        }
        setData(newData);
        setAlerts([...alerts, newAlert]);

      }).catch((error) => {
        console.log(error);

        const newAlert: TAlertState = {
          severity: 'error',
          text: error.message
        }
        setAlerts([...alerts, newAlert]);
      });
  }

  return <>
    <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
      Get data from date 'Mar 01 2023 18:33:58' to 'Mar 01 2023 18:45:46'
      <Button variant="contained" sx={{ ml: 3 }} onClick={onFeach}>Get</Button>
    </Typography>

    {alerts.map((val, i) => <Alert severity={val.severity} key={i} sx={{ mb: 1 }}>{val.text}</Alert>)}

    <Box sx={{ mt: 1 }}>
      <Charts data={data} />
    </Box>
  </>
};

export default FeachChart;