import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { BmiInfo } from "../component/BmiInfo";
import { Recipe } from "../component/Recipe";
import brownBread from "../utils/brownbread";
import brownRice from "../utils/brownrice";
import chicken from "../utils/chicken";
import dryFruits from "../utils/dryfruits";
import eggs from "../utils/eggs";
import flattenedRice from "../utils/flattenedrice";
import fruits from "../utils/fruits";
import oats from "../utils/oats";
import paneer from "../utils/paneer";
import salad from "../utils/salad";
import tofu from "../utils/tofu";

export const Result = () => {
  const location = useLocation<any>();
  const bmi = location.state.bmi;
  const bmr = location.state.bmr;
  console.log(bmi);
  const classes = useStyles();
  const b = ["oats", "eggs", "dryFruits", "flattenedRice"];
  const l = ["salad", "fruits", "chicken", "brownBread", "eggs"];
  const d = ["paneer", "tofu", "brownRice", "salad"];
  const [breakfast, setBreakfast] = useState<any>();
  const [lunch, setLunch] = useState<any>();
  const [dinner, setDinner] = useState<any>();

  const bkft: any = {
    oats,
    eggs,
    dryFruits,
    flattenedRice,
  };
  const lch: any = {
    salad,
    fruits,
    chicken,
    brownBread,
    eggs,
  };
  const dnr: any = {
    paneer,
    tofu,
    brownRice,
    salad,
  };
  const getRandomIndex = (length: number) => Math.floor(Math.random() * length);

  useEffect(() => {
    const getBreakfast = () => {
      const bk1 = bkft[b[getRandomIndex(b.length)]][getRandomIndex(10)];
      const bk2 = bkft[b[getRandomIndex(b.length)]][getRandomIndex(10)];
      setBreakfast([bk1, bk2]);
    };
    const getLunch = () => {
      const l1 = lch[l[getRandomIndex(l.length)]][getRandomIndex(10)];
      const l2 = lch[l[getRandomIndex(l.length)]][getRandomIndex(10)];
      setLunch([l1, l2]);
    };
    const getDinner = () => {
      const d1 = dnr[d[getRandomIndex(d.length)]][getRandomIndex(10)];
      const d2 = dnr[d[getRandomIndex(d.length)]][getRandomIndex(10)];
      setDinner([d1, d2]);
    };
    getBreakfast();
    getLunch();
    getDinner();
  }, []);
  useEffect(() => {
    console.log("breakfast", breakfast);
    console.log("lunch", lunch);
    console.log("dinner", dinner);
  }, [breakfast, lunch, dinner]);

  return (
    <div style={{ padding: "1rem" }}>
      <Box display='flex' justifyContent='center'>
        <Typography style={{ fontSize: "2rem" }}>Today's Meal Plan 🍴</Typography>
      </Box>

      <Card style={{ padding: "1rem", margin: "1rem 0 2rem 0" }}>
        <Box display='flex' justifyContent='space-around'>
          <div style={{ width: "3rem" }}>
            <img src='/calories.png' width='100%' />
          </div>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-around'
            width='100%'
            style={{ marginLeft: "1.5rem" }}
          >
            <div className={classes.bmiCardRow}>
              Bmi: {bmi} kg/m2
              <span style={{ marginLeft: "auto" }}>
                <BmiInfo />
              </span>
            </div>
            <div className={classes.bmiCardRow}>
              Calories: {(parseFloat(bmr) * 1.2).toFixed(2)} cal
            </div>
          </Box>
        </Box>
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Breakfast' />
            <CardContent className={classes.cardContent}>
              {breakfast?.map((item: any) => (
                <Recipe
                  name={item.recipe.label}
                  imageUrl={item.recipe.image}
                  recipeUrl={item.recipe.url}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Lunch' />
            <CardContent className={classes.cardContent}>
              {lunch?.map((item: any) => (
                <Recipe
                  name={item.recipe.label}
                  imageUrl={item.recipe.image}
                  recipeUrl={item.recipe.url}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Dinner' />
            <CardContent className={classes.cardContent}>
              {dinner?.map((item: any) => (
                <Recipe
                  name={item.recipe.label}
                  imageUrl={item.recipe.image}
                  recipeUrl={item.recipe.url}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  bmiCardRow: {
    display: "flex",
    alignItems: "center",
  },
  cardContent: { paddingTop: 0, gridGap: "1rem", display: "grid" },
}));
