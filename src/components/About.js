import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function About() {
    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    About Where In The Lou
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                    Where In The Lou is an interactive map application that helps users discover interesting locations and activities around St. Louis. The application provides users with valuable information about various points of interest, such as parks, museums, trails, and outdoor activities.
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                    Our goal is to provide an easy-to-use platform for people to explore and experience the best that St. Louis has to offer. Whether you're a local resident or a visitor to the city, Where In The Lou is your one-stop resource for planning your next adventure.
                </Typography>
            </Box>
        </Container>
    );
}

export default About;
