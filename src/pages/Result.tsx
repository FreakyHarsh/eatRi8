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

const getRecipe = (search: string) => {
  return fetch(baseURL + "/recipe", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ search }),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      return response.hits;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const Result = () => {
  const {
    state: {
      bmi: { bmi },
    },
  } = useLocation<any>();

  const classes = useStyles();
  const b = ["oats", "eggs", "dry fruits", "flattened rice"];
  const l = ["salad", "fruits", "chicken", "brown bread", "eggs"];
  const d = ["paneer", "tofu", "brown rice", "salad"];
  const [breakfast, setBreakfast] = useState<any>();
  const [lunch, setLunch] = useState<any>();
  const [dinner, setDinner] = useState<any>();

  useEffect(() => {
    const getBreakfast = async () => {
      const randomBreakfastIngredient = b[Math.round(Math.random() * b.length)];
      const res = await getRecipe(randomBreakfastIngredient);
      setBreakfast([
        res[Math.round(Math.random() * 10)].recipe,
        res[Math.round(Math.random() * 10)].recipe,
      ]);
    };
    getBreakfast();
  }, []);
  useEffect(() => {
    const getLunch = async () => {
      const randomLunchIngredient = l[Math.round(Math.random() * b.length)];
      const res = await getRecipe(randomLunchIngredient);
      setLunch([
        res[Math.round(Math.random() * 10)].recipe,
        res[Math.round(Math.random() * 10)].recipe,
      ]);
    };
    getLunch();
  }, []);
  useEffect(() => {
    const getDinner = async () => {
      const randomDinnerIngredient = d[Math.round(Math.random() * b.length)];
      console.log(randomDinnerIngredient);
      const res = await getRecipe(randomDinnerIngredient);
      setBreakfast([
        res[Math.round(Math.random() * 10)].recipe,
        res[Math.round(Math.random() * 10)].recipe,
      ]);
    };
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
              Bmi: {parseInt(bmi)} kg/m2
              <span style={{ marginLeft: "auto" }}>
                <BmiInfo />
              </span>
            </div>
            <div className={classes.bmiCardRow}>Calories: {parseInt(bmi) * 1.2 * 100} cal</div>
          </Box>
        </Box>
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Breakfast' />
            <CardContent className={classes.cardContent}>
              {breakfast?.map((item: any) => (
                <Recipe name={item.label} imageUrl={item.image} recipeUrl={item.url} />
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Lunch' />
            <CardContent className={classes.cardContent}>
              {lunch?.map((item: any) => (
                <Recipe name={item.label} imageUrl={item.image} recipeUrl={item.url} />
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Dinner' />
            <CardContent className={classes.cardContent}>
              {dinner?.map((item: any) => (
                <Recipe name={item.label} imageUrl={item.image} recipeUrl={item.url} />
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
