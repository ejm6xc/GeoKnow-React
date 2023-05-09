import { Box, ToggleButton, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

const filtersList = ['park', 'point_of_interest', 'establishment', 'tourist_attraction', 'museum', 'travel_agency',
    'cemetery', 'general_contractor', 'funeral_home', 'amusement_park', 'art_gallery', 'food', 'local_government_office',
    'store', 'clothing_store', 'zoo', 'restaurant', 'aquarium', 'stadium', 'parking', 'bar', 'casino', 'lodging', 'natural_feature', 'meal_delivery'];

const TypeToggles = (props) => {
    const [selectedFilters, setSelectedFilters] = React.useState(filtersList.reduce((acc, filter) => ({ ...acc, [filter]: false }), {}));

    const handleChange = (filter) => () => {
        setSelectedFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
        props.filters[filter] = !selectedFilters[filter];
        props.updateMap(props.filters);
    };

    return (
        <div>
            <br/><br/><br/><br/><br/>
            <Typography component="legend" style={{fontSize: "larger", fontWeight: "bold"}}>Other Filters</Typography>
            {filtersList.map(filter => (
                <Box key={filter} sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
                    <Typography sx={{ flexGrow: 1 }}>
                        {filter.replaceAll('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Typography>
                    <ToggleButton
                        value={filter}
                        selected={selectedFilters[filter]}
                        onChange={handleChange(filter)}
                    >
                        <CheckIcon sx={{ fontSize: 16 }} />
                    </ToggleButton>
                </Box>
            ))}
        </div>
    );
};

export default TypeToggles;
