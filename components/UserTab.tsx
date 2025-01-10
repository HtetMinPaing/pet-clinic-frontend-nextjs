"use client"

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue); 
    switch (newValue) {
        case 0:
            router.push(`/manage/users/patients`);
            break;
        case 1:
            router.push("/manage/users/owners");
            break;
        case 2:
            router.push("/manage/users/staffs");
            break;
        default:
            router.push("/manage/users");
            break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Patients" {...a11yProps(0)} />
          <Tab label="Owners" {...a11yProps(1)} />
          <Tab label="Staffs" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Box>
  );
}
