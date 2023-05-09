import {Box, ToggleButton, Typography} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

const AccessibilityToggle = () => {
    const [selected, setSelected] = React.useState(false);
    return (
        <Box sx={{ mt: 5, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ flexGrow: 1 }}>Wheelchair Accessible</Typography>
            <ToggleButton
                value="check"
                selected={selected}
                onChange={() => {
                    setSelected(!selected);
                }}
            >
                <CheckIcon sx={{ fontSize: 16 }} />
            </ToggleButton>
        </Box>
    );
};

export default AccessibilityToggle;
