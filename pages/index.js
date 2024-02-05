import styles from '../styles/Home.module.css';

// pages/index.js
import React from 'react';
import Head from 'next/head';
import { BingoBoard } from './bingo'; // Adjust the import path as needed
import { Welc } from './welc'; // Adjust the import path as needed
import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const [user, setUser] = React.useState(null);
  const cellContents = [
    'test1',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6',
    'test7',
    'test8',
    'test9',
    'test10',
    'test11',
    'test12',
    'test13',
    'test14',
    'test15',
    'test16',
    'test17',
    'test18',
    'test19',
    'test20',
    'test21',
    'test22',
    'test23',
    'test24',
    'test25',
  ]
  const [shuffledCellContents, setShuffledCellContents] = React.useState([]);

  const handleLogin = (name) => {
    setUser(name);
    setShuffledCellContents(shuffleArray([...cellContents]));
  };

  if (!user) {
    return <Welc onLogin={handleLogin} />;
  }

  return (
    <>
      <Head>
        <title>Roar + Pour</title>
        <meta name="description" content="Bingo Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Hey, {user}!
          </Typography>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Roar + Pour
          </Typography>
          <BingoBoard userId={user} cellContents={shuffledCellContents} />
        </Box>
      </Container>
    </>
  );
}
