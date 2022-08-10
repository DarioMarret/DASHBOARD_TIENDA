import { Box, Button, Card, CircularProgress, FormGroup, Grid, Input, Select, Tab, Tabs, Typography } from '@mui/material';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useState, useRef } from 'react';
import CreateTienda from './crearTienda';
import ListStore from './listarTienda';
import RechargeStores from './recargar';


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

function Store() {
    const [value, setValue] = useState(0);
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
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Crear Tienda" {...a11yProps(0)} />
                        <Tab label="Listar Tienda" {...a11yProps(1)} />
                        <Tab label="Recargar Tienda" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CreateTienda/>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <ListStore />
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <RechargeStores />
                </TabPanel>
            </Card>
        </DashboardLayout >
    );
}
export default Store;