import React from 'react';
import './Sidebar.css';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

function Sidebar() {
    return (
        <Box className="Sidebar" sx={{ padding: 2 }}>
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6">Weather</Typography>
                <FormControl component="fieldset">
                    <RadioGroup name="weather">
                        <FormControlLabel value="Sunny" control={<Radio />} label="Sunny" />
                        <FormControlLabel value="Overcast" control={<Radio />} label="Cloudy" />
                        <FormControlLabel value="Raining" control={<Radio />} label="Raining" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box>
                <Typography variant="h6">Cost</Typography>
                <FormControl component="fieldset">
                    <RadioGroup name="cost">
                        <FormControlLabel value="0-10" control={<Radio />} label="0-10" />
                        <FormControlLabel value="11-20" control={<Radio />} label="11-20" />
                        <FormControlLabel value="21-50" control={<Radio />} label="21-50" />
                        <FormControlLabel value="50+" control={<Radio />} label="50+" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
    );
}

export default Sidebar;
