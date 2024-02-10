import React from 'react';
import api from './api'; // Make sure the API path is correct
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const BingoBoard = ({ cellContents, userId }) => {
    const [isBingo, setIsBingo] = React.useState(false);
    const [completedRows, setCompletedRows] = React.useState(new Array(5).fill(false));
    const [completedCols, setCompletedCols] = React.useState(new Array(5).fill(false));
    const [completedDiags, setCompletedDiags] = React.useState({ left: false, right: false });

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

    const checkForBingo = (board) => {
        let newBingo = false;
        board.forEach((row, rowIndex) => {
            if (!completedRows[rowIndex] && row.every(cell => cell.marked)) {
                newBingo = true;
                completedRows[rowIndex] = true; // Mark this row as completed
            }
        });

        board[0].forEach((_, colIndex) => {
            if (!completedCols[colIndex] && board.every(row => row[colIndex].marked)) {
                newBingo = true;
                completedCols[colIndex] = true; // Mark this column as completed
            }
        });

        if (!completedDiags.left && board.every((row, idx) => row[idx].marked)) {
            newBingo = true;
            completedDiags.left = true; 
        }
        if (!completedDiags.right && board.every((row, idx) => row[board.length - 1 - idx].marked)) {
            newBingo = true;
            completedDiags.right = true; 
        }

        return newBingo;
    };

    const toggleCell = (row, col) => {
        const newBoard = board.map((currentRow, rowIndex) =>
            rowIndex === row
                ? currentRow.map((cell, cellIndex) =>
                    cellIndex === col ? { ...cell, marked: !cell.marked } : cell)
                : currentRow
        );
        setBoard(newBoard);

        const newMarkedCount = newBoard.flat().filter(cell => cell.marked).length;
        setMarkedCount(newMarkedCount);

        incrementBingoCount(userId, newMarkedCount);

        const hasNewBingo = checkForBingo(newBoard);
        if (hasNewBingo) {
            console.log('New Bingo!');
            setIsBingo(true);
        }
    };

    const handleClose = () => {
        setIsBingo(false);
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
                                            backgroundColor: cell.marked ? '#fcd151' : '#ffffff',
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
                                                fontSize: cell.marked ? '0.8rem' : '0.4rem', // Smaller font size, adjust as needed
                                                color: cell.marked ? 'white' : 'inherit',
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

                <Dialog
                    open={isBingo}
                    onClose={handleClose}
                    aria-labelledby="bingo-dialog-title"
                >
                    <DialogTitle id="bingo-dialog-title" sx={{ textAlign: 'center' }}>
                        BINGO
                    </DialogTitle>
                    <DialogContent sx={{ textAlign: 'center' }}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Box>
                                <img src="/sleepdragon.png" alt="bingo slep dragon" style={{ width: '100px'}} />
                            </Box>
                            <Box>
                                <DialogContentText>
                                    bingo!!! alright now get another one lol
                                </DialogContentText>
                            </Box>
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: 'center' }}>
                        <Button fullWidth sx={{
                            color: 'white',
                            backgroundColor: '#f0bf2e',
                            '&:hover': {
                                backgroundColor: 'darkgoldenrod', // Darker shade of gold for hover effect
                            },
                        }} onClick={handleClose}>close</Button>
                    </DialogActions>
                </Dialog>

            </Grid>
        </Box>
    );
};

export default BingoBoard;