import classes from "*.module.css";
import React from "react";
import { makeStyles } from "@material-ui/core";

export const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <img src='/loader.gif' />
    </div>
  );
};

const useStyles = makeStyles({
  loader: {
    backgroundColor: "#FEFCFD",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      width: "100%",
      maxWidth: "15rem",
      objectFit: "cover",
    },
  },
});
