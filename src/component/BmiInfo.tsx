import { Popover, makeStyles, Theme, Grid } from "@material-ui/core";
import React, { useState } from "react";
import InfoIcon from "@material-ui/icons/Info";
import CaloriesTable from "./CaloriesTable";
import Skeleton from "@material-ui/lab/Skeleton";

export const BmiInfo = ({ bmr }: { bmr: number }) => {
  const [bmiInfo, setBmiInfo] = useState<HTMLElement | null>(null);
  const [imgLoader, setImgLoader] = useState(true);

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
          <Grid item xs={12} style={{ position: "relative" }}>
            <Skeleton
              variant='rect'
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: 10, position: "absolute" }}
            />
            <img
              src='/bmichart.png'
              onLoad={() => setImgLoader(!imgLoader)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 10,
                position: "absolute",
                top: 0,
              }}
            />
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
