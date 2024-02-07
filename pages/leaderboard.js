import React, { useEffect } from 'react';
import { Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Link from 'next/link';

const Leaderboard = ({ setShowLeaderboard, showButton }) => {

    const [users, setUsers] = React.useState(
        [
            { "id": 1, "name": "Alice", "score": 98 },
            { "id": 2, "name": "Bob", "score": 87 },
            { "id": 3, "name": "Charlie", "score": 93 }
            // ... more users
        ]
    );

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('/api/leaderboard');
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.users);
                } else {
                    console.error('Failed to fetch leaderboard:', data.message);
                }
            } catch (error) {
                console.error('Error while fetching leaderboard:', error);
            }
        };

        fetchLeaderboard();
    }
        , []);

    return (
        <Container sx={{ bgcolor: '#c2261b', color: 'white', minHeight: '100vh' }} maxWidth="sm">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant='button' component="h2" gutterBottom>leaderboard</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.sort((a, b) => b.score - a.score).map((user, index) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="right">{user.name}</TableCell>
                                    <TableCell align="right">{user.score}</TableCell>
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
                }} onClick={() => setShowLeaderboard(false)}>go back</Button>}
            </Box>
        </Container>
    );
}

export default Leaderboard;