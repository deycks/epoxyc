import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import EmailIcon from "@mui/icons-material/Email";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import { useTheme } from "@mui/system";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  FormControl,
  Grid,
  Input,
  InputLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  ToggleButton,
} from "@mui/material";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

const whiteLogos = [
  "/images/quote/1solidcoat.png",
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
  width: "84px",
};

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}
const handleCloseBackdrop = (event) => {};

export default function Testimonials() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const [loadingTestimonials, setLoadingTestimonials] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef(undefined);
  const [errors, setErrors] = React.useState({
    firstName: false,
    lastName: false,
    testimonial: false,
    coatType: false,
    imageB64: false,
    rating: false,
  });
  const [fields, setFields] = React.useState({
    firstName: "",
    lastName: "",
    testimonial: "",
    coatType: "",
    imageB64: "",
    rating: "",
  });
  const [page, setPage] = React.useState(1);
  const [userTestimonials, setUserTestimonials] = useState([]);
  const [limit] = useState(10);
  const [openDialogImage, setOpenDialogImage] = React.useState(false);
  const [imageSelected, setImageSelected] = React.useState("");

  useEffect(() => {
    fetchTestimonials();
  }, [page]);

  const handleCloseDialog = () => {
    setOpenDialog(!openDialog);
    setSuccess(false);
  };

  const fetchTestimonials = async () => {
    try {
      setLoadingTestimonials(true);
      const response = await fetch(`/api/testimonials?page=${page}`);
      const data = await response.json();
      setUserTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();
    if (validFields()) {
      setOpenBackDrop(true);
      setSuccess(false);
      setLoading(true);
      try {
        console.log("Submitting testimonial:", fields);
        const response = await fetch("/api/testimonials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fields),
        });
        console.log("Response");
        console.log(response);
        if (!response.ok) {
          setOpenBackDrop(false);
          throw new Error("Network response was not ok");
        }
        // Optionally, reset the form fields
        setFields({
          firstName: "",
          lastName: "",
          testimonial: "",
          coatType: "",
          imageB64: "",
          rating: "",
        });
        setSuccess(true);
        setLoading(false);
        timer.current = setTimeout(() => {
          handleCloseDialog();
          setOpenBackDrop(false);
        }, 2000);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };

  

  const validFields = () => {
    let newErrors = {
      firstName: false,
      lastName: false,
      testimonial: false,
      coatType: false,
      imageB64: false,
      rating: false,
    };
    if (!fields.testimonial) {
      newErrors.testimonial = true;
    }
    if (!fields.firstName) {
      newErrors.firstName = true;
    }
    if (!fields.lastName) {
      newErrors.lastName = true;
    }
    if (!fields.coatType) {
      newErrors.coatType = true;
    }
    if (!fields.rating) {
      newErrors.rating = true;
    }
    if (!fields.imageB64) {
      newErrors.imageB64 = true;
    }
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleInputChange = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
    let newErrors = {
      firstName: false,
      lastName: false,
      testimonial: false,
      coatType: false,
      imageB64: false,
      rating: false,
    };
    setErrors(newErrors);
  };

  const handleImageUpload = (event) => {
    console.log("imagen");
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("desde onload");
      console.log(e.target.result);
      setFields({
        ...fields,
        imageB64: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  };
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleCloseImage = () => {
    setOpenDialogImage(false);
  };
  const handleChangePagination = (event, value) => {
    setPage(value);
  };
  return (
    <div>
      <Container
        id="testimonials"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4" color="text.primary">
            Testimonials
          </Typography>
          <Typography variant="body1" color="text.secondary">
            See what our customers love about our products. Discover how we
            excel in efficiency, durability, and satisfaction. Join us for
            quality, innovation, and reliable support.
          </Typography>
        </Box>
        <Grid container spacing={2}>
              {userTestimonials.map((testimonial, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{ display: loadingTestimonials ? 'none' : 'flex' }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flexGrow: 1,
                      p: 1,
                    }}
                  >
                    <CardContent>
                      <StyledRating
                        name="highlight-selected-only"
                        defaultValue={testimonial.rating}
                        IconContainerComponent={IconContainer}
                        readOnly
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                      />
                      <Typography variant="body1" color="text.primary">
                        {testimonial.coatType == 1 ? "Solid Coat" : 
                          testimonial.coatType == 2 ? "1 Base Coat - Light flake - 1 Top Coat" :
                          testimonial.coatType == 3 ? "1 Base Coat - 1 Full flake coat - 1 Top Coat" :
                          testimonial.coatType == 4 ? "1 Base Coat - 1 Full flake coat - 2 Polyaspartic Top Coats" : ""}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.testimonial}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        pr: 2,
                      }}
                    >
                      <CardHeader
                        avatar={testimonial.avatar}
                        title={
                          testimonial.firstName + " " + testimonial.lastName
                        }
                        subheader={new Date(
                          testimonial.date
                        ).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      />
                      <img
                        src={testimonial.imageB64}
                        alt={`Logo ${index + 1}`}
                        onClick={() => {
                          setImageSelected(testimonial.imageB64); 
                          setOpenDialogImage(true);
                        }}
                        style={logoStyle}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
          {Boolean(loadingTestimonials) && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          )}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: -1 }}>
          <Button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </Button>
          <Button onClick={handleNextPage} disabled={userTestimonials.length < 6}>
            Next
          </Button>
        </Box>
        <ToggleButton
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          <ForwardToInboxIcon sx={{ fontSize: "20px", mr: 1 }} />
          Share your testimony with us.
        </ToggleButton>
      </Container>
      <Dialog onClose={handleCloseDialog} open={openDialog} id="testimonials">
        <Container component="main" maxWidth="md" id="testimonialContainer">
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary" }}>
              <EmailIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Please enter your testimonial
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleButtonClick}
              sx={{ mt: 3 }}
            >
              <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Type of service
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="coatType"
                        name="coatType"
                        value={fields.coatType}
                        label="Type of service"
                        onChange={handleInputChange}
                        error={errors.coatType}
                      >
                        <MenuItem value={1}>Solid Coat</MenuItem>
                        <MenuItem value={2}>
                          1 Base Coat - Light flake - 1 Top Coat
                        </MenuItem>
                        <MenuItem value={3}>
                          1 Base Coat - 1 Full flake coat - 1 Top Coat
                        </MenuItem>
                        <MenuItem value={4}>
                          1 Base Coat - 1 Full flake coat - 2 Polyaspartic Top
                          Coats
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} xl>
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
                    error={errors.testimonial}
                    multiline
                    fullWidth
                    id="testimonial"
                    label="Enter your testimonial"
                    name="testimonial"
                    autoComplete="testimonial"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Rate your experience
                  </Typography>
                  <StyledRating
                    name="rating"
                    defaultValue={3}
                    onChange={handleInputChange}
                    IconContainerComponent={IconContainer}
                    getLabelText={(value) => customIcons[value].label}
                    highlightSelectedOnly
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
                    <FormControl fullWidth>
                      <Input
                        id="image-upload"
                        type="file"
                        inputProps={{ accept: "image/*" }}
                        onChange={handleImageUpload}
                      />
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Grid
                item
                type="submit"
                fullWidth
                alignItems="center"
                container
                direction="column"
                xs={12}
                align="center"
                sx={{ mt: 3, mb: 2 }}
              >
                <Fab
                  aria-label="save"
                  color="primary"
                  sx={buttonSx}
                  onClick={handleButtonClick}
                >
                  {success ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {loading && (
                  <CircularProgress
                    size={68}
                    sx={{
                      color: green[500],
                      position: "relative",
                      top: -62,
                      zIndex: 1,
                    }}
                  />
                )}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Dialog>
      <Dialog
        open={openDialogImage}
        keepMounted
        onClose={handleCloseImage}
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
                ? 'url(' + imageSelected + ')'
                : 'url(' + imageSelected + ')',
            backgroundSize: 'cover',
          })}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImage}>Close</Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={openBackDrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
