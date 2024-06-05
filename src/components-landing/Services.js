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
import { alpha } from "@mui/material";

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
    description:
      "This is the most affordable process that we offer , It is a 1 solid color coat with no texture . Some imperfections might still be visible . 10-15 years life spam.",
    rows: 2,
    cols: 2,
    item: 1,
    featured: true,
    oneday: true,
  },
  {
    img: "/images/services/light-flake.png",
    title: "1 Base Coat - Light flake - 1 Top Coat",
    description:
      "This is a 2 coat process with random flakes . This flor has a high gloss finish with little texture . 15-20+ years life spam",
    psinopsis: "@bkristastucchio",
    rows: 2,
    cols: 2,
    item: 2,
    featured: true,
    oneday: true,
  },
  {
    img: "/images/services/full-flake.jpg",
    title: "1 Base Coat - 1 Full flake coat - 1 Top Coat",
    description:
      "This is a very decorative floor it consist of 1 base coat ,1 full layer of  flakes , and 1 top coat sealer . This is a floor with good texture and covers all imperfections on your concrete . 15-20+ years life spam",
    psinopsis: "@bkristastucchio",
    rows: 2,
    cols: 2,
    item: 3,
    featured: true,
    oneday: true,
  },
  {
    img: "/images/services/polyaspartic.jpg",
    title: "1 Base Coat - 1 Full flake coat - 2 Polyaspartic Top Coats",
    description: `This is our 3 coat process. 
    It consist of 1 base coat - 1 full flake  - and 2 top coat sealer. 
    It takes 2 days to finish the process. 
    We offer this option for those who want a smoother finish and higher gloss . Adds more life to your floor 20+years life spam . Adding a second top coat sealer can cause the floor to be slippery when wet.`,
    psinopsis: "@bkristastucchio",
    rows: 2,
    item: 4,
    cols: 2,
    featured: true,
    twodays: true,
  },
];

export default function Services() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;
  const [expandedTwoDays, setExpandedTwoDays] = React.useState(false);
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);

  const handleExpand = (item) => {
    switch (item.item) {
      case 1:
        setExpanded1(!expanded1);
        break;
      case 2:
        setExpanded2(!expanded2);
        break;
      case 3:
        setExpanded3(!expanded3);
        break;
      case 4:
        setExpandedTwoDays(!expandedTwoDays);
        break;

      default:
        break;
    }
  };

  return (
    <Box
      id="services"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#90caf9, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 60%",
        borderRadius: "30px",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Grid
        container
        sx={{
          marginLeft: { sm: "20%", md: "1.5%" },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          color={"black"}
          sx={{
            width: { xs: "100%", sm: "100%", md: "100%" },
            marginLeft: { xs: "0%", sm: "-20%", md: "1.5%" },
            textAlign: { xs: "center", sm: "center", md: "center" },
          }}
        >
          <br />
          Our Coating Services
          <br />
        </Typography>

        {itemData.map((item) => (
          <Grid item md={4} xs={12} padding={1}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={<Avatar src="/log-transparente.png" />}
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
                {/* <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton> */}

                {(() => {
                  switch (item.item) {
                    case 1:
                      return (
                        <ExpandMore
                          expand={expanded1}
                          onClick={() => handleExpand(item)}
                          aria-expanded={expanded1}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      );
                    case 2:
                      return (
                        <ExpandMore
                          expand={expanded2}
                          onClick={() => handleExpand(item)}
                          aria-expanded={expanded2}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      );
                    case 3:
                      return (
                        <ExpandMore
                          expand={expanded3}
                          onClick={() => handleExpand(item)}
                          aria-expanded={expanded3}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      );
                    case 4:
                      return (
                        <ExpandMore
                          expand={expandedTwoDays}
                          onClick={() => handleExpand(item)}
                          aria-expanded={expandedTwoDays}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      );
                    default:
                      return null;
                  }
                })()}
              </CardActions>
              {(() => {
                switch (item.item) {
                  case 1:
                    return (
                      <Collapse in={expanded1} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography
                            component="h2"
                            variant="h4"
                            sx={{
                              color: (theme) => {
                                if (theme.palette.mode === "light") {
                                  return "black";
                                }
                                return "white";
                              },
                            }}
                          >
                            One - Day Process
                          </Typography>
                          <Box
                            sx={{
                              m: "auto",
                              width: 320,
                              height: 250,
                              backgroundSize: "contain",
                              backgroundRepeat: "no-repeat",
                              backgroundImage: (theme) =>
                                "url(/images/oneday.png)",
                            }}
                          />
                        </CardContent>
                      </Collapse>
                    );
                  case 2:
                    return (
                      <Collapse in={expanded2} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography
                            component="h2"
                            variant="h4"
                            sx={{
                              color: (theme) => {
                                if (theme.palette.mode === "light") {
                                  return "black";
                                }
                                return "white";
                              },
                            }}
                          >
                            One - Day Process
                          </Typography>
                          <Box
                            sx={{
                              m: "auto",
                              width: 320,
                              height: 250,
                              backgroundSize: "contain",
                              backgroundRepeat: "no-repeat",
                              backgroundImage: (theme) =>
                                "url(/images/oneday.png)",
                            }}
                          />
                        </CardContent>
                      </Collapse>
                    );
                  case 3:
                    return (
                      <Collapse in={expanded3} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography
                            component="h2"
                            variant="h4"
                            sx={{
                              color: (theme) => {
                                if (theme.palette.mode === "light") {
                                  return "black";
                                }
                                return "white";
                              },
                            }}
                          >
                            One - Day Process
                          </Typography>
                          <Box
                            sx={{
                              m: "auto",
                              width: 320,
                              height: 250,
                              backgroundSize: "contain",
                              backgroundRepeat: "no-repeat",
                              backgroundImage: (theme) =>
                                "url(/images/oneday.png)",
                            }}
                          />
                        </CardContent>
                      </Collapse>
                    );
                  case 4:
                    return (
                      <Collapse
                        in={expandedTwoDays}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent>
                          <Typography
                            component="h2"
                            variant="h4"
                            sx={{
                              color: (theme) => {
                                if (theme.palette.mode === "light") {
                                  return "black";
                                }
                                return "white";
                              },
                            }}
                          >
                            Two - Days Process
                          </Typography>
                          <Box
                            sx={{
                              m: "auto",
                              width: 320,
                              height: 250,
                              backgroundSize: "contain",
                              backgroundRepeat: "no-repeat",
                              backgroundImage: (theme) =>
                                "url(/images/two-days.png)",
                            }}
                          />
                        </CardContent>
                      </Collapse>
                    );
                  default:
                    return null;
                }
              })()}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
