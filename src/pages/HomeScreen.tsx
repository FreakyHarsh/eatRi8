import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  Radio,
  Select,
  Slider,
  TextField,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Field, FieldAttributes, Form, Formik, useField } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as yup from "yup";

type MyRadioProps = { label: string } & FieldAttributes<{}>;
type MySelectProps = FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return (
    <FormControlLabel
      {...field}
      control={<Radio color='primary' style={{ fontSize: ".8rem" }} />}
      label={label}
    />
  );
};

const MySelect: React.FC = ({ ...props }) => {
  const [field] = useField(props as any);
  return (
    <FormControl variant='outlined' {...field}>
      <InputLabel htmlFor='exercise'>Exercise</InputLabel>
      <Select
        native
        label='Exercise'
        inputProps={{
          name: "exercise",
          id: "exercise",
        }}
      >
        <option value='no'>No exercise</option>
        <option value='little'>1-3 Days/Week</option>
        <option value='moderate'>3-5 Days/Week</option>
        <option value='heavy'>6-7 Days/Week</option>
        <option value='veryHeavy'>Twice per day</option>
      </Select>
    </FormControl>
  );
};

const yupSchema = yup.object({
  height: yup.number().required().min(130).max(230),
  weight: yup.number().required().min(40).max(160),
});
export const HomeScreen = () => {
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = (data: any) => {
    const { height, weight, age, gender, exercise } = data;
    let bmr;
    if (gender === "male") {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.099 * height - 4.33 * age;
    }
    bmr = bmr.toFixed(2);
    const bmi = ((weight * 10000) / Math.pow(height, 2)).toFixed(2);
    console.log(bmi, bmr);
    history.push({ pathname: "./plan", state: { bmi, bmr } });
  };
  return (
    <div style={{ height: "100vh" }}>
      <div className={classes.bg}>
        <Box display='flex' justifyContent='center' alignItems='center' style={{ height: "100%" }}>
          <Card className={classes.cardWidth}>
            <CardContent className={classes.card}>
              <Formik
                initialValues={{ height: 130, weight: 40, age: 20, exercise: "no", gender: "male" }}
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
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      className={classes.gender}
                    >
                      <Typography style={{ color: "#7F8787" }}>Gender:</Typography>
                      <MyRadio name='gender' type='radio' value='male' label='Male' />
                      <MyRadio name='gender' type='radio' value='female' label='Female' />
                    </Box>

                    <MySelect />

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
  gender: {
    "& label": {
      margin: 0,
      "& span": {
        fontSize: ".9rem",
        color: "#52af77",
        fontWeight: 700,
      },
    },
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
