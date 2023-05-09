import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import React from 'react';

const WeatherSelect = (props) => {
    const [weather, setWeather] = React.useState('');

    const handleChange = (event) => {
        setWeather(event.target.value);
        props.filters.weather = event.target.value;
        props.updateMap(props.filters);
    };
    return (
        <Box sx={{ mt: 5, display: 'flex', alignItems: 'center' }}>
            <FormControl fullWidth>
                <InputLabel id="weather-simple-select-label">Weather</InputLabel>
                <Select
                    labelId="weather-select-label"
                    id="weather-simple-select"
                    value={weather}
                    label="Weather"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Sunny</MenuItem>
                    <MenuItem value={2}>Cloudy</MenuItem>
                    <MenuItem value={3}>Rainy</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default WeatherSelect;
