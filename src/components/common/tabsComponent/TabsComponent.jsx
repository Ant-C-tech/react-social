import './tabsComponent.css';

import { useState } from 'react'

import SwipeableViews from 'react-swipeable-views';

import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { TabPanel } from './tabPanel/TabPanel';

export const TabsComponent = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Looking for news" {...a11yProps(0)} />
          <Tab label="Edit news" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          Looking for news
        </TabPanel>
        <TabPanel value={value} index={1}>
          Edit news
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
