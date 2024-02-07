import React from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

const Welc = ({ onLogin }) => {
    const [name, setName] = React.useState('');

    return (
        <Container sx={{ bgcolor: '#c2261b', color: 'white', minHeight: '100vh' }} maxWidth="xs">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" gap={2}>
                <Typography variant="button" component="h1" gutterBottom>
                    welcome!
                </Typography>
                <TextField
                    sx={{
                        bgcolor: 'white',
                    }}
                    label="enter a nickname"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button sx={{
                    mt: 2,
                    color: 'white',
                    backgroundColor: '#f0bf2e',
                    '&:hover': {
                        backgroundColor: 'darkgoldenrod', // Darker shade of gold for hover effect
                    },
                }} variant="contained" color="primary" onClick={() => onLogin(name)}>
                    LFGGGGGGG
                </Button>
            </Box>
        </Container>
    );
};

export default Welc;