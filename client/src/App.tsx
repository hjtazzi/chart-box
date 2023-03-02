import { FC, useState } from 'react';
import { Container, Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import WsChart from './components/WsChart';
import BinanceWs from './components/BinanceWs';
import FeachChart from './components/FeachChart';

interface props { }

const App: FC<props> = () => {
  const [value, setValue] = useState<string>("1");

  return <>
    <Container>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(e, newValue) => setValue(newValue)} centered>
              <Tab label="my server ws" value="1" />
              <Tab label="binance ws" value="2" />
              <Tab label="feach data" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1"><WsChart /></TabPanel>
          <TabPanel value="2"><BinanceWs /></TabPanel>
          <TabPanel value="3"><FeachChart /></TabPanel>
        </TabContext>
      </Box>
    </Container>
  </>
}

export default App;