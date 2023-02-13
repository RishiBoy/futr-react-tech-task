import React, { ReactNode, SyntheticEvent, useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import BlockIcon from '@mui/icons-material/Block';
import GeneralForm from '../generalForm/generalForm';
import SupportForm from '../supportForm/supportForm';
import TakeOfflineForm from '../takeOfflineForm/takeOfflineForm';
import BlockUserForm from '../blockUserForm/blockUserForm';

const CustomTabBox = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eff3f7',
      }}
    >
      <Paper variant="outlined" sx={{ padding: '10px', borderRadius: '10px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            sx={{
              width: '100%',
              height: '60px',
            }}
            value={value}
            onChange={handleChange}
            aria-label="icon position tabs"
          >
            <Tab icon={<SettingsIcon />} iconPosition="start" label="General" />
            <Tab icon={<AccessTimeIcon />} iconPosition="start" label="Support Times" />
            <Tab icon={<HeadsetOffIcon />} iconPosition="start" label="Take Offline" />
            <Tab icon={<BlockIcon />} iconPosition="start" label="Block Users" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <GeneralForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SupportForm />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TakeOfflineForm />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <BlockUserForm />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default CustomTabBox;
