import { Box, Drawer, IconButton, styled, Typography } from '@mui/material';
import {ChevronLeft} from '@mui/icons-material';
import PriceSelect from './filters/PriceSelect';
import WeatherSelect from "./filters/WeatherSelect";
import React from "react";
import AccessibilityToggle from "./filters/AccessibilityToggle";
import StatusToggle from "./filters/StatusToggle";
import BasicRating from "./filters/BasicRating";
import TypeToggles from "./filters/TypeToggles";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Sidebar = (props) => {
    //console.log(props);
    return (
        <Drawer variant="persistent" hideBackdrop={true} open={props.isOpen}>
            <DrawerHeader>
                <Typography>Apply Search or Filter:</Typography>
                <IconButton onClick={() => props.setIsOpen(false)}>
                    <ChevronLeft fontSize="small" />
                </IconButton>
            </DrawerHeader>
            <Box sx={{ width: 180, p: 3 }}>
                <PriceSelect updateMap={props.updateMap} filters={props.filters} />
                <WeatherSelect updateMap={props.updateMap} filters={props.filters} />
                <AccessibilityToggle updateMap={props.updateMap} filters={props.filters} />
                <StatusToggle updateMap={props.updateMap} filters={props.filters} />
                <BasicRating updateMap={props.updateMap} filters={props.filters} />
                <TypeToggles updateMap={props.updateMap} filters={props.filters}/>
            </Box>
        </Drawer>
    );
};

export default Sidebar;