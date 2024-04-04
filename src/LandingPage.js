import * as React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from './components-landing/AppAppBar';
import Hero from './components-landing/Hero';
import LogoCollection from './components-landing/LogoCollection';
import Highlights from './components-landing/Highlights';
import Pricing from './components-landing/Pricing';
import Features from './components-landing/Features';
import Testimonials from './components-landing/Testimonials';
import FAQ from './components-landing/FAQ';
import Footer from './components-landing/Footer';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import getLPTheme from './getLPTheme';
import Gallery from './components-landing/Gallery';
import Services from './components-landing/Services';
import Quote from './components-landing/Quote';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  const handleClose = () => {
    alert();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '150dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton  onClick={() => window.open("https://wa.me/18329984928?text=I'm%20interested%20in%20your%20epoxy%20flooring%20projects", '_blank', 'noopener')}>
          <WhatsAppIcon sx={{ fontSize: '20px', mr: 1 }} />
          Chat with us
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? defaultTheme : LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Hero />
        {/* <LogoCollection /> */}
        <Divider/>
        <Pricing /> 
        <Divider /> 
        <br/>

        <Services/>
        <Divider />
        <Quote/>
        <Divider />
        <Gallery/>
        {/* <Divider/>
        <Features /> */}
        <Divider />
        <Testimonials />
        <Divider />
        {/* <Highlights />
        <Divider /> */}
        
        <FAQ />
        <Divider />
        <Footer /> 
      </Box>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
