import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/system";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from "@mui/material";
import { alpha } from '@mui/material';

const whiteLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg",
];

const darkLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
];

const logoStyle = {
  width: "100px",
  height: "80px",
  margin: "0 32px",
  opacity: 0.7,
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const itemData = [
  {
    img: "/images/services/solidcoat.jpg",
    title: "Solid Coat",
    psinopsis: "@bkristastucchio",
    description:"Aqui podemos poner ua pequeña descripcion de este piso",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "/images/services/light-flake.png",
    title: "1 Base Coat - Light flake - 1 Top Coat",
    description:"Aqui podemos poner ua pequeña descripcion de este piso",
    psinopsis: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },{
    img: "/images/services/full-flake.jpg",
    title: "1 Base Coat - 1 Full flake coat - 1 Top Coat",
    description:"Aqui podemos poner ua pequeña descripcion de este piso",
    psinopsis: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },{
    img: "/images/services/polyaspartic.jpg",
    title: "1 Base Coat - 1 Full flake coat - 2 Polyaspartic Top Coats",
    description:"Aqui podemos poner ua pequeña descripcion de este piso",
    psinopsis: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  }
];

export default function Services() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      id="services"
      sx={(theme) => ({
      width: '100%',
      backgroundImage:
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
          : `linear-gradient(#90caf9, ${alpha('#090E10', 0.0)})`,
      backgroundSize: '100% 60%',
      borderRadius:"30px",
      backgroundRepeat: 'no-repeat'
    })}>
      <Grid container sx={{
        marginLeft:{ xs: "1%", sm: "20%", md: "1.5%" }
      }}>
        <Typography
          component="h2"
          variant="h4"
          color={"black"}
          sx={{
            width: { xs: "100%", sm: "100%", md: "100%" },
            marginLeft:{ xs: "0%", sm: "-20%", md: "1.5%" },
            textAlign: { xs: "center", sm: "center", md: "center" },
          }}
        >
          <br/>
          Our Coating Services
          <br/>
        </Typography>
        
        {itemData.map((item) => (
          <Grid item md={4}
          xs={12} padding={1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar src="/log-transparente.png" />
              }
              // action={
              //   <IconButton aria-label="settings">
              //     <MoreVertIcon />
              //   </IconButton>
              // }
              title={item.title}
              // subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="194"
              image={item.img}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              {/* <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore> */}
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep
                  skillet over medium-high heat. Add chicken, shrimp and
                  chorizo, and cook, stirring occasionally until lightly
                  browned, 6 to 8 minutes. Transfer shrimp to a large plate and
                  set aside, leaving chicken and chorizo in the pan. Add
                  pimentón, bay leaves, garlic, tomatoes, onion, salt and
                  pepper, and cook, stirring often until thickened and fragrant,
                  about 10 minutes. Add saffron broth and remaining 4 1/2 cups
                  chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with
                  artichokes and peppers, and cook without stirring, until most
                  of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                  medium-low, add reserved shrimp and mussels, tucking them down
                  into the rice, and cook again without stirring, until mussels
                  have opened and rice is just tender, 5 to 7 minutes more.
                  (Discard any mussels that don&apos;t open.)
                </Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then
                  serve.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
          </Grid>
        ))}
        
      </Grid>
    </Box>
  );
}
