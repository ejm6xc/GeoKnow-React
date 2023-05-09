import { Box, ToggleButton, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

const StatusToggle = (props) => {
    const [selected, setSelected] = React.useState(false);

/*    const handleOpenOnlyToggle = () => {
        props.setIsOpenOnly(!props.isOpenOnly);
    };*/

    const onChange = () => {
        setSelected(!selected);
        const newFilters = { ...props.filters, status: !selected };
        props.updateMap(newFilters);
    };


    return (
        <Box sx={{ mt: 5, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ flexGrow: 1 }}>Only Show 'Open'</Typography>
            <ToggleButton
                value="check"
                selected={selected}
                defaultChecked={false}
                onChange={onChange}
            >
                <CheckIcon sx={{ fontSize: 16 }} />
            </ToggleButton>
        </Box>
    );
};

export default StatusToggle;
