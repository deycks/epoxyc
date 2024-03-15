import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import LandingPage from '../src/LandingPage'

export default function Index() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 2 }}>
        {/* <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js example
        </Typography> */}
        {/* < Link href="/about" color="secondary"> */}
          {/* Go to the about page */}
        {/* </Link> */}
        <LandingPage/>
        {/* <ProTip /> */}
        <Copyright />
      </Box>
    </Container>
  );
}
