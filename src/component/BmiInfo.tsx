import { Grid, makeStyles, Popover, Theme } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import React, { useState } from "react";

import BmiTable from "./BmiTable";
import CaloriesTable from "./CaloriesTable";

export const BmiInfo = ({ bmr }: { bmr: number }) => {
  const [bmiInfo, setBmiInfo] = useState<HTMLElement | null>(null);

  const handleBmiInfoOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setBmiInfo(event.currentTarget);
  };

  const handleBmiInfoClose = () => {
    setBmiInfo(null);
  };

  const openBmiInfo = Boolean(bmiInfo);
  const classes = useStyles();
  return (
    <>
      <span
        aria-owns={openBmiInfo ? "mouse-over-popover" : undefined}
        aria-haspopup='true'
        onMouseEnter={handleBmiInfoOpen}
        onMouseLeave={handleBmiInfoClose}
      >
        <InfoIcon className={classes.icon} />
      </span>
      <Popover
        id='mouse-over-popover'
        open={openBmiInfo}
        anchorEl={bmiInfo}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleBmiInfoClose}
        disableRestoreFocus
      >
        <Grid container>
          <Grid item xs={12}>
            <BmiTable />
          </Grid>
          <Grid item xs={12}>
            <CaloriesTable bmr={bmr} />
          </Grid>
        </Grid>
      </Popover>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  icon: { fontSize: "1.5rem", marginLeft: "auto" },
  popover: {
    pointerEvents: "none",
    textAlign: "center",
    padding: "1rem",
  },
  paper: {
    padding: theme.spacing(1),
  },
  imageContainer: {
    [theme.breakpoints.down("md")]: {
      width: "80vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "40vw",
    },
  },
}));
