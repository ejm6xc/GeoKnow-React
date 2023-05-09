import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating(props) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.filters.rating = newValue;
        props.updateMap(props.filters);
    };
    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Typography component="legend">Rating</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={handleChange}
            />
        </Box>
    );
}