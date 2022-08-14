import { Box, Button, Card, CircularProgress, FormGroup, Grid, Input, Select, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { dataCliente } from 'function/localstore/storeUsuario';
import React, { useState, useRef } from 'react';
import Accounts from './accounts';
import User from './user';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function Account() {
  const [value, setValue] = useState(0);
  const [perfil, setperfil] = useState(dataCliente().role);
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        {
          perfil === 'super_admin' ?
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Accounts" {...a11yProps(0)} />
                  <Tab label="Users" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Accounts />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <User />
              </TabPanel>
            </>
            :
            <User />
        }
      </Card>
    </DashboardLayout >
  );
}
export default Account;