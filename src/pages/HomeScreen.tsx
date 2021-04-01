import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Slider,
  TextField,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as yup from "yup";

const yupSchema = yup.object({
  height: yup.number().required().min(130).max(230),
  weight: yup.number().required().min(40).max(160),
});
export const HomeScreen = () => {
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = (data: any) => {
    const { height, weight, age } = data;
    const bmi = ((weight * 10000) / Math.pow(height, 2)).toFixed(2);
    history.push({ pathname: "./plan", state: { bmi } });
  };
  return (
    <div style={{ height: "100vh" }}>
      <div className={classes.bg}>
        <Box display='flex' justifyContent='center' alignItems='center' style={{ height: "100%" }}>
          <Card className={classes.cardWidth}>
            <CardContent className={classes.card}>
              <Formik
                initialValues={{ height: 130, weight: 40, age: 20 }}
                onSubmit={(data) => onSubmit(data)}
                validationSchema={yupSchema}
              >
                {({ values, handleChange, handleBlur, setFieldValue, errors, isSubmitting }) => (
                  <Form>
                    <Field
                      name='height'
                      as={TextField}
                      type='number'
                      variant='outlined'
                      label='Height(cm)'
                      placeholder='Height in cm'
                      helperText={errors.height}
                      error={!!errors.height}
                      style={{ marginTop: "10px" }}
                    />
                    <Field
                      name='weight'
                      as={TextField}
                      type='number'
                      variant='outlined'
                      label='Weight(cm)'
                      placeholder="Weight in kg's"
                      helperText={errors.weight}
                      error={!!errors.weight}
                    />
                    <div style={{ padding: "0 5px" }}>
                      <Typography style={{ color: "#7F8787" }}>Age: {values.age}</Typography>
                      <PrettoSlider
                        valueLabelDisplay='auto'
                        aria-label='pretto slider'
                        defaultValue={20}
                        name='age'
                        onChange={(event, value) => setFieldValue("age", value)}
                      />
                    </div>
                    <Button
                      style={{ color: "white" }}
                      variant='contained'
                      color='primary'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <CircularProgress size={24} />
                          <span style={{ marginLeft: "5px" }}>calculating...</span>
                        </>
                      ) : (
                        "Calculate"
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  bg: {
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bg.jpg')",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  card: {
    "& form": { display: "flex", flexDirection: "column", gap: "1rem" },
    "& .MuiFormHelperText-contained": {
      margin: 0,
    },
    opacity: 0.95,
    borderRadius: 5,
  },
  cardWidth: {
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
    },
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
