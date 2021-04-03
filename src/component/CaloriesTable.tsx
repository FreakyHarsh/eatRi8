import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    marginTop: "1rem",
    "& thead th": {
      backgroundColor: "black",
      color: "white",
    },
  },
});

function createData(name: string, requiredCalories: string) {
  return { name, requiredCalories };
}

export default function CaloriesTable({ bmr }: { bmr: number }) {
  const classes = useStyles();

  const rows = [
    createData("Little to no exercise", (bmr * 1.2).toFixed(2)),
    createData("Light exercise (1-3 days/week)", (bmr * 1.375).toFixed(2)),
    createData("Moderate exercise (3-5 days/week)", (bmr * 1.55).toFixed(2)),
    createData("Heavy exercise (6-7 days/week)", (bmr * 1.725).toFixed(2)),
    createData("Very Heavy exercise (Twice per day)", (bmr * 1.9).toFixed(2)),
  ];
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table' size='small' className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Exercise Level Daily</TableCell>
            <TableCell align='right'>Kcal/day</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.requiredCalories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
