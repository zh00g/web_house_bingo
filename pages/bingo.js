import React from 'react';
import api from './api'; // Make sure the API path is correct
import { Box, Grid, Paper, Typography } from '@mui/material';

const BingoBoard = ({ cellContents, userId }) => {

    if (!Array.isArray(cellContents) || cellContents.length !== 25) {
        console.error("cellContents must be an array with 25 elements.");
        return null; // or return some fallback UI
    }
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
            <Grid container spacing={1} justifyContent="center">
                {board.map((row, rowIndex) => (
                    <Grid item xs={12} key={rowIndex}>
                        <Grid container justifyContent="center" spacing={0.25}>
                            {row.map((cell, colIndex) => (
                                <Grid item key={colIndex}>
                                    <Paper
                                        onClick={() => toggleCell(rowIndex, colIndex)}
                                        style={{
                                            width: 56,
                                            height: 56,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: cell.marked ? '#e0e0e0' : '#ffffff',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            component="div"
                                            style={{
                                                margin: '0.2rem',
                                                textAlign: 'center',
                                                lineHeight: '0.9', // Reduced line height, adjust as needed
                                                whiteSpace: 'normal', // Ensure line breaks occur
                                                fontSize: '0.4rem', // Smaller font size, adjust as needed
                                            }}
                                        >
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

export default BingoBoard;