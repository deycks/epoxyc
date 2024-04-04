import * as React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { TextField, CardContent, Grid } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const steps = ["Select Coating Service", "Measures", "Quote"];

const services = [
  {
    id: 1,
    price: 3,
    name: "Solid Coat",
    src: "/images/quote/1solidcoat.png",
  },
  {
    id: 2,
    price: 4,
    name: "1 base coat      Light flake     1 Top coat",
    src: "/images/quote/baseCoatLightFlake.png",
  },
  {
    id: 3,
    price: 5,
    name: "1 base coat   1 Full flake coat   1 Top coat",
    src: "/images/quote/baseCoatFullfFake.png",
  },
  {
    id: 4,
    price: 6.5,
    name: "1 base coat  1 Full flake coat  2 polyaspartic top coats",
    src: "/images/quote/polyaspartic.png",
  },
];
const logoStyle = {
  width: "250px",
  height: "150px",
  margin: "5px",
};

export default function Quote() {
  const [serviceSelected, setServiceSelected] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [total, setTotal] = React.useState(0.0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [skipped, setSkipped] = React.useState(new Set());

  const [values, setValues] = React.useState({
    width: "",
    height: "",
  });

  const handleChange = (event) => {
    setErrorMessage("");
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const generateQuote = () => {
    if (values.width <= 0) {
      setErrorMessage("Please type a valid width");
      return;
    }
    if (values.height <= 0) {
      setErrorMessage("Please type a valid height");
      return;
    }
    let sftq = values.width * values.height;
    let price = services.find(
      (service) => service.id === serviceSelected.id
    ).price;
    let total = sftq * price;
    setTotal(total.toFixed(2));
    handleNext();
  };

  const continueQoute = () =>{
    window.open("https://wa.me/18329984928?text="+
                "Hi!!%0AI'm%20interested%20in%20your%20epoxy%20flooring%20Coating%20Service:%0A"+
                serviceSelected.name+"%0A"+
                "My measurements are:%0A"+
                "Length: "+values.height +" Width: "+values.width, '_blank', 'noopener')
                handleNext()
  }

  const selectService = (item) => {
    setServiceSelected(item);
    handleNext();
  };
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container
      id="quote"
      sx={{
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
          Quote
        </Typography>
        <Typography variant="body1" color="text.secondary">
          To personalize your request, you could make a quote below.
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Paper elevation={3}>
              <br></br>
            <Typography sx={{ mt: 2, mb: 1 }}>
            Please send your WhatsApp message and a professional agent coating will respond to your request soon.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
            </Paper>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <br></br>
            <Paper elevation={3}>
              {Boolean(activeStep == 0) && (
                <Typography variant="body1" color="text.secondary">
                  Click on one the image to select the Coating Service you want
                  to quote
                </Typography>
              )}
              {Boolean(activeStep == 0) &&
                services.map((item, index) => (
                  <img
                    src={item.src+"?w=248&fit=crop&auto=format"}
                    alt=""
                    style={logoStyle}
                    onClick={() => {
                      selectService(item);
                    }}
                  />
                ))}

              {Boolean(activeStep == 1) && (
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    You select "{serviceSelected.name}" service to generate the
                    quote
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Please enter the measurements of the place where you want to
                    put the coating
                  </Typography>{" "}
                  <br></br>
                  {errorMessage}
                  <Grid container spacing={3}>
                    <Grid item md={3} xs={12}>
                      <TextField
                        fullWidth
                        label="Width"
                        name="width"
                        type="number"
                        onChange={handleChange}
                        value={values.width}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <TextField
                        fullWidth
                        label="Length"
                        name="height"
                        type="number"
                        onChange={handleChange}
                        value={values.height}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <Button variant="outlined" onClick={generateQuote}>
                        Calculate
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              )}

              {Boolean(activeStep == 2) && (
                <Container>
                  <Typography variant="body1" color="text.primary">
                    The price of the service is: $ {total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    It is a unique opportunity to bring quality and satisfaction
                    to your life without sacrificing your wallet.
                  </Typography>
                  <br></br>
                  <Grid item md={3} xs={12}>
                  <Typography variant="body2" color="text.secondary">
                  Click to get personalized attention and give continuity to your quote
                  </Typography>
                    <Button variant="outlined"
                    onClick={continueQoute} 
                    startIcon={<SendIcon />}> 
                      Continue
                    </Button>
                  </Grid>
                  <br></br>
                </Container>
              )}
            </Paper>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

              {Boolean(activeStep == 2) && (
                <Button onClick={handleReset}>Generate new quote</Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
      <br></br>
    </Container>
  );
}
