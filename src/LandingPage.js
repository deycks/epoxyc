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
import EmailIcon from '@mui/icons-material/Email';
import Pricing from './components-landing/Pricing';
import Testimonials from './components-landing/Testimonials';
import FAQ from './components-landing/FAQ';
import Footer from './components-landing/Footer';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import getLPTheme from './getLPTheme';
import Gallery from './components-landing/Gallery';
import Services from './components-landing/Services';
import Quote from './components-landing/Quote';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {

  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [fields, setFields] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    comments: '',
  });

  const [errors, setErrors] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    comments: false,
  });

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleInputChange = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
    let newErrors = {
      firstName: false,
      lastName: false,
      email: false,
      comments: false,
    };
    setErrors(newErrors);
  };

  const sendContactForm = async (data) =>{
    handleCloseDialog()
    setOpenBackDrop(true)
    fetch("api/contact", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
      .then((res) => 
        {
          setOpenBackDrop(false)
          setOpenSnackBar(true);
        })
      .catch((error) => {
        console.error("Error:", error)
        setOpenBackDrop(false)
      });
  }
  
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(!openDialog);
  };

  const validateFields = () => {
    let newErrors = {
      firstName: false,
      lastName: false,
      email: false,
      comments: false,
    };
    if (!fields.comments) {
      newErrors.comments = true;
    }
    if (!fields.firstName) {
      newErrors.firstName = true;
    }
    if (!fields.lastName) {
      newErrors.lastName = true;
    }
    if (!fields.email) {
      newErrors.email = true;
    }
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      await sendContactForm(fields);
    }
    
  };

  const handleCloseBackdrop = (event) => {}
  
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
      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
        <Alert
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleCloseSnackBar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
          autoHideDuration={1200}
        >
          The email has been sent successfully!. Soon one of our experts will contact you.
        </Alert>
      </Snackbar>
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
        {/* <ToggleButton  onClick={() => window.open("https://wa.me/18329984928?text=I'm%20interested%20in%20your%20epoxy%20flooring%20projects", '_blank', 'noopener')}>
          <WhatsAppIcon sx={{ fontSize: '20px', mr: 1 }} />
          Chat with us
        </ToggleButton> */}
        <ToggleButton  onClick={() =>{ 
          setOpenDialog(true)
        }
        }>
          <EmailIcon sx={{ fontSize: '20px', mr: 1 }} />
          Send us an email
        </ToggleButton>
      </ToggleButtonGroup>
      <Dialog onClose={handleCloseDialog} open={openDialog}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <EmailIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Please enter your comments
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    error={errors.firstName}
                    onChange={handleInputChange}
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    onChange={handleInputChange}
                    error={errors.lastName}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={handleInputChange}
                    error={errors.email}
                    fullWidth
                    id="email"
                    label="Email Address or Phone Number"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={handleInputChange}
                    error={errors.comments}
                    fullWidth
                    name="comments"
                    label="Comments"
                    multiline
                    maxRows={4}
                    id="comments"
                    autoComplete="comments"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Container>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
