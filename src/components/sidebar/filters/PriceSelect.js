import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import React from 'react';

const PriceSelect = (props) => {
    const [price, setPrice] = React.useState('');

    const handleChange = (event) => {
        setPrice(event.target.value);
        props.filters.price = event.target.value;
        props.updateMap(props.filters);
    };
    return (
        <Box sx={{ mt: 5, display: 'flex', alignItems: 'center' }}>
            <FormControl fullWidth>
                <InputLabel id="price-simple-select-label">Price</InputLabel>
                <Select
                    labelId="price-select-label"
                    id="price-simple-select"
                    value={price}
                    label="Price"
                    onChange={handleChange}
                >
                    <MenuItem value={''}>None</MenuItem>
                    <MenuItem value={1}>$</MenuItem>
                    <MenuItem value={2}>$$</MenuItem>
                    <MenuItem value={3}>$$$</MenuItem>
                    <MenuItem value={4}>$$$$</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default PriceSelect;
