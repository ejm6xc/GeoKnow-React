import {Box, ToggleButton, Typography} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

const AccessibilityToggle = (props) => {
    const [selected, setSelected] = React.useState(false);
    const handleChange = () => {
        setSelected(!selected);
        props.filters.wheelchairAccessible = !selected;
        props.updateMap(props.filters);
    };
    return (
        <Box sx={{ mt: 5, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ flexGrow: 1 }}>Wheelchair Accessible</Typography>
            <ToggleButton
                value="check"
                selected={selected}
                onChange={handleChange}
            >
                <CheckIcon sx={{ fontSize: 16 }} />
            </ToggleButton>
        </Box>
    );
};

export default AccessibilityToggle;
