import React from 'react';
import api from './api'; // Make sure the API path is correct
import { Box, Grid, Paper, Typography } from '@mui/material';

export const BingoBoard = ({ cellContents, userId }) => {
    const [board, setBoard] = React.useState(
        new Array(5).fill(null).map((_, rowIndex) =>
            new Array(5).fill(null).map((_, colIndex) => ({
                content: cellContents[rowIndex * 5 + colIndex],
                marked: false,
            }))
        )
    );

    const [markedCount, setMarkedCount] = React.useState(0);

    const incrementBingoCount = async (userId, markedCount) => {
        try {
            const response = await api.post('/update-count', {
                user_id: userId,
                marked_count: markedCount,
            });

            if (response.data.success) {
                console.log('Count updated successfully:', response.data);
            } else {
                console.log('Failed to update count:', response.data.message);
            }
        } catch (error) {
            console.error('Error while updating count:', error);
        }
    };

    const toggleCell = (row, col) => {
        const newBoard = board.map((currentRow, rowIndex) =>
            rowIndex === row
                ? currentRow.map((cell, cellIndex) =>
                    cellIndex === col ? { ...cell, marked: !cell.marked } : cell)
                : currentRow
        );
        setBoard(newBoard);

        // Calculate the number of marked cells
        const newMarkedCount = newBoard.flat().filter(cell => cell.marked).length;
        setMarkedCount(newMarkedCount);

        // Send the new marked count to the server
        incrementBingoCount(userId, newMarkedCount);
    };

    return (
        <Box p={2}>
            <Grid container spacing={2} justifyContent="center">
                {board.map((row, rowIndex) => (
                    <Grid item xs={12} key={rowIndex}>
                        <Grid container justifyContent="center" spacing={2}>
                            {row.map((cell, colIndex) => (
                                <Grid item key={colIndex}>
                                    <Paper
                                        onClick={() => toggleCell(rowIndex, colIndex)}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: cell.marked ? '#e0e0e0' : '#ffffff',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Typography variant="h6" component="span">
                                            {cell.marked ? 'X' : cell.content}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
