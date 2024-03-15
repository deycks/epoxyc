import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';

const whiteLogos = [
  '/images/piso-gris-HD.jpg',
  '/images/antes.jpg',
  '/images/despues.jpg',
  '/images/piso-rosa.jpg',
  '/images/piso-rosa2.jpg',
  '/images/chidita.jpg',
];

const darkLogos = [
  '/images/piso-gris-HD.jpg',
  '/images/antes.jpg',
  '/images/despues.jpg',
  '/images/piso-rosa.jpg',
  '/images/piso-rosa2.jpg',
  '/images/chidita.jpg',
];

const logoStyle = {
  width: '100px',
  height: '80px',
  margin: '0 32px',
  opacity: 0.7,
};


export default function Gallery() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState("");

  const handleClickOpen = (urlImage) => {
    setImage(urlImage);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>
    <Box id="gallery" sx={{ py: 4 ,color: 'black',
        bgcolor: '#ddedfe',}}>

    <Typography
        component="h2"
        variant="h4"
        sx={{
          width: { xs: "100%",sm: '100%', md: '100%' },
          textAlign: { xs: "center",sm: 'center', md: 'center' },
        }}
      >
        Gallery
      </Typography>
      <ImageList
      sx={{
        marginLeft:3,
        marginRight:3,
        width: { sm: '90%', md: '90%' },
        height: { sm: '100%', md: '100%' }
      }}>
      {logos.map((logo, index) => (
        <ImageListItem key={index}
        onClick={(event) => { handleClickOpen(logo) }}
        >
              <img
                srcSet={`${logo}?w=161&fit=crop&auto=format&dpr=2 2x`}
                src={`${logo}?w=161&fit=crop&auto=format`}
                alt={logo}
                loading="lazy"
              />
        </ImageListItem>
      ))}
    </ImageList>

    </Box>
    <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Box
          id="imageGallery"
          sx={(theme) => ({
            alignSelf: 'center',
            height: {  xs: 300, sm: 700, md:435 },
            width: { xs: 300, sm: 700, md:552 },
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url(' + image + ')'
                : 'url(' + image + ')',
            backgroundSize: 'cover',
          })}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
