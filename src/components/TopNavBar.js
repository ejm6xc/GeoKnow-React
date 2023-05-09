import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, Button, Box, IconButton, Menu} from '@mui/material';
import {Link} from 'react-router-dom';
import Sidebar from "./sidebar/Sidebar";

function TopNavBar({updateMap, filters}) {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{mr: 2}}>
                    <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => setIsOpen(true)}
                    >
                        Filters
                        <Menu open={false}/>
                    </IconButton>
                </Box>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Where In The Lou
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/about">
                    About
                </Button>
            </Toolbar>
            <Sidebar {...{isOpen, setIsOpen, updateMap, filters}} />
        </AppBar>
    );
}

export default TopNavBar;
