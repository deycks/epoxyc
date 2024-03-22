import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LaunchIcon from '@mui/icons-material/Launch';
import { alpha } from '@mui/material/styles';


export default function Gallery() {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState("");
  const handleClickOpen = (urlImage) => {
    setImage(urlImage);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const itemData = [
    {
      img: '/images/gallery/1.jpg',
      title: 'Breakfast',
      author: '@bkristastucchio',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: '/images/gallery/2.jpg',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: '/images/gallery/4.jpg',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      img: '/images/gallery/5.jpg',
      title: 'Coffee',
      author: '@nolanissac',
      cols: 2,
    },
    {
      img: '/images/gallery/6.jpg',
      title: 'Hats',
      author: '@hjrc33',
      cols: 2,
    },
    {
      img: '/images/gallery/7.jpg',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: '/images/gallery/8.jpg',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: '/images/gallery/9.jpg',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      img: '/images/gallery/10.jpg',
      title: 'Mushrooms',
      author: '@silverdalex',
      rows: 2,
      cols: 2,
    },
    {
      img: '/images/gallery/11.jpg',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: '/images/gallery/12.jpg',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: '/images/gallery/13.jpg',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
    
    {
      img: '/images/gallery/14.jpg',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
    {
      img: '/images/gallery/15.jpg',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
    {
      img: '/images/gallery/16.jpg',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
    {
      img: '/images/gallery/17.jpg',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
    {
      img: '/images/gallery/18.jpg',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
    {
      img: '/images/gallery/19.jpg',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
  ];

  return (
    <div>
      <Box id="gallery" sx={(theme) => ({
      width: '100%',
      backgroundImage:
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
          : `linear-gradient(#90caf9, ${alpha('#090E10', 0.0)})`,
      backgroundSize: '100% 60%',
      borderRadius:"30px",
      backgroundRepeat: 'no-repeat'
    })}>
          <Typography
        component="h2"
        variant="h4"
        sx={{
          width: { xs: "100%",sm: '100%', md: '100%' },
          textAlign: { xs: "center",sm: 'center', md: 'center' },
        }}
      >
        Portfolio
      </Typography>
    <ImageList gap={1} sx={{  height: 450, transform: 'translateZ(0)', }}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} onClick={(event) => { handleClickOpen(item.img) }}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            // title={item.title}
            // subtitle={item.author}
            textAlign= 'center' 
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <LaunchIcon />
              </IconButton>
            }
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
