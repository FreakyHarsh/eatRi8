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
    "& thead th": {
      backgroundColor: "black",
      color: "white",
    },
  },
});

function createData(bmi: string, weightStatus: string) {
  return { bmi, weightStatus };
}

export default function BmiTable() {
  const classes = useStyles();

  const rows = [
    createData("Below 18.5", "Underweight"),
    createData("18.5-24.9", "Normal weight"),
    createData("25.0-29.9", "Overweight"),
    createData("30.0-34.9", "Obesity class I"),
    createData("35.0-39.9", "Obesity class II"),
    createData("Above 40", "Obesity class III"),
  ];
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table' size='small' className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>BMI</TableCell>
            <TableCell align='right'>Weight Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.bmi}>
              <TableCell component='th' scope='row'>
                {row.bmi}
              </TableCell>
              <TableCell align='right'>{row.weightStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
