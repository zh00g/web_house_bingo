import styles from '../styles/Home.module.css';

// pages/index.js
import React from 'react';
import Head from 'next/head';
import BingoBoard from './bingo'; // Adjust the import path as needed
import Welc from './welc'; // Adjust the import path as needed
import Leaderboard from './leaderboard';
import { Button, Container, Typography, Box, Dialog } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const [openLeaderboard, setOpenLeaderboard] = React.useState(false);

  // Function to open the dialog
  const handleOpenLeaderboard = () => {
    setOpenLeaderboard(true);
  };

  // Function to close the dialog
  const handleCloseLeaderboard = () => {
    setOpenLeaderboard(false);
  };

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };
  const [showButton, setShowButton] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const loggedIn = React.useRef(false);
  const cellContents = [
    'come in costume',
    'venmo us $5 for alc :)',
    'win a game of pong',
    'do a dare',
    'make a cocktail for someone',
    'take a selfie with everyone here',
    'make friends with someone you dont know',
    'free space',
    'freestyle',
    'do a shot with someone you dont know',
    'queue up a song',
    'trade a WNRS card with someone',
    'take a photo with the hosts <3',
    'free!!',
    'win costume contest',
    'win a card game',
    'text the one that got away...',
    'dont yak :)',
    'take a polaroid!',
    'trade a WNRS card with 3 ppl',
    'win a game of rage cage',
    'win RPS against someone',
    'compliment 5 ppl!',
    'exchange # w someone u dont know',
    'say hi to all the hosts hehe',
  ]
  const [shuffledCellContents, setShuffledCellContents] = React.useState([]);
  const [showLeaderboard, setShowLeaderboard] = React.useState(false);

  const handleLogin = (name) => {
    loggedIn.current = true;
    setUser(name);
    setShuffledCellContents(shuffleArray([...cellContents]));
  };

  const router = useRouter();

  if (router.pathname === '/leaderboard') {
    return <Leaderboard />;
  }

  if (router.pathname === '/leaderboard') {
    return <Leaderboard showButton={false} setShowLeaderboard={setShowLeaderboard} />;
  }

  // if (showLeaderboard) {
  //   return <Leaderboard showButton={true} setShowLeaderboard={setShowLeaderboard} />;
  // }

  if (!loggedIn.current) {
    return <Welc onLogin={handleLogin} />;
  }

  return (
    <>
      <Head>
        <title>Roar + Pour</title>
        <meta name="description" content="Bingo Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container sx={{ bgcolor: '#c2261b', color: 'white', minHeight: '100vh' }} maxWidth="sm">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography variant="button" component="h1" gutterBottom align="center">
            hey, {user}!
          </Typography>
          <Typography variant="button" component="h1" gutterBottom align="center">
            roar + pour!!!
          </Typography>
          <BingoBoard userId={user} cellContents={shuffledCellContents} />
          {/* <Link href="/leaderboard">
            <Typography variant='button'> view leaderboard</Typography>
          </Link> */}
          <Button sx={{
            mt: 2,
            color: 'white',
            backgroundColor: '#f0bf2e',
            '&:hover': {
              backgroundColor: 'darkgoldenrod', // Darker shade of gold for hover effect
            },
          }} onClick={handleOpenLeaderboard}>show leaderboard</Button>

          <Dialog maxWidth="xl" fullWidth open={openLeaderboard} onClose={handleCloseLeaderboard}>
            <Leaderboard showButton={true} setOpenLeaderboard={setOpenLeaderboard}/>
          </Dialog>
        </Box>



      </Container>
    </>
  );
}
