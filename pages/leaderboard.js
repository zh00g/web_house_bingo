import React, { useEffect } from 'react';
import { Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Link from 'next/link';
import api from './api'; // Make sure the API path is correct

const Leaderboard = ({ setOpenLeaderboard, showButton }) => {
    const [winner, setWinner] = React.useState(null);

    const [users, setUsers] = React.useState(
        [
        ]
    );

    const runRaffle = async () => {
        const response = await api.get('/raffle');
        setWinner(response.data.winner);
    }

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await api.get('/leaderboard'); // Using Axios to make a GET request
                const data = response.data;
                if (response.status === 200) { // Checking if the response status is 200 (OK)
                    setUsers(data.users);
                } else {
                    console.error('Failed to fetch leaderboard:', data.message);
                }
            } catch (error) {
                // If using Axios, errors can be inspected on error.response
                console.error('Error while fetching leaderboard:', error.response ? error.response.data : error);
            }
        };

        fetchLeaderboard();
    }
        , []);

    return (
        <Container sx={{ bgcolor: '#c2261b', color: 'white', minHeight: '100vh' }} maxWidth="sm">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography variant='button' component="h2" gutterBottom>leaderboard</Typography>
                <TableContainer component={Paper} style={{ maxHeight: '400px' }}> {/* Set a fixed height */}
                    <Table size="small" stickyHeader sx={{ minWidth: 100 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.sort((a, b) => b.score - a.score).map((user, index) => ( // Only take the first 10
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{user.name}</TableCell>
                                    <TableCell align="center">{user.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {showButton && <Button sx={{
                    mt: 2,
                    color: 'white',
                    backgroundColor: '#f0bf2e',
                    '&:hover': {
                        backgroundColor: 'darkgoldenrod', // Darker shade of gold for hover effect
                    },
                }} onClick={() => setOpenLeaderboard(false)}>go back</Button>}
                {<Button sx={{
                    mt: 2,
                    color: 'white',
                    backgroundColor: '#f0bf2e',
                    '&:hover': {
                        backgroundColor: 'darkgoldenrod', // Darker shade of gold for hover effect
                    },
                }} onClick={() => runRaffle()}>reveal raffle winner</Button>}
                {winner && <Typography variant='button' component="h2" gutterBottom>winner winner!! {winner}</Typography>}
            </Box>
        </Container>
    );
}

export default Leaderboard;