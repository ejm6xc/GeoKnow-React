import { Box, ToggleButton, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

const StatusToggle = (props) => {
    const [selected, setSelected] = React.useState(false);

    const handleChange = () => {
        setSelected(!selected);
        props.filters.status = !selected;
        props.updateMap(props.filters);
    };

    return (
        <Box sx={{ mt: 5, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ flexGrow: 1 }}>Show Open</Typography>
            <ToggleButton
                value="check"
                selected={selected}
                defaultChecked={false}
                onChange={handleChange}
            >
                <CheckIcon sx={{ fontSize: 16 }} />
            </ToggleButton>
        </Box>
    );
};

export default StatusToggle;
