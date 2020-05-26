import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import mask from "../../images/Mask Group 1.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#efeff5",
    boxShadow: "5px 5px #bfe0ff",
  },
}));

const BookApplointment = () => {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
    console.log(date);
    document.getElementById("showDate").innerHTML =
      date.getFullYear().toString() +
      "/" +
      date.getMonth().toString() +
      "/" +
      date.getDate().toString();
  };

  return (
    <div
      style={{
        display: "block",
        justifyContent: "center",
        margin: "50px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ width: "40%" }}>
          <h1>Appointment</h1>

          <Calendar onChange={onChange} value={date}></Calendar>
        </div>
        <div style={{ width: "60%" }}>
          <img style={{ width: "80%" }} src={mask} alt="" />
        </div>
      </div>

      <br />
      <hr />

      <div className={classes.root}>
        <p>
          {" "}
          Available Appointment on >>> <span id="showDate"></span>
        </p>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              Teeth Orthodontics <br /> 8:00 AM - 9:00 AM <br />{" "}
              <small>10 Spaces Available</small>
              <br />
              <Button
                href="/addAppointment"
                variant="contained"
                color="secondary"
              >
                {" "}
                BOOK APPOINTMENT
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              {" "}
              Teeth Orthodontics <br /> 8:00 AM - 9:00 AM <br />{" "}
              <small>10 Spaces Available</small>
              <br />
              <Button
                href="/addAppointment"
                variant="contained"
                color="secondary"
              >
                {" "}
                BOOK APPOINTMENT
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              {" "}
              Teeth Orthodontics <br /> 8:00 AM - 9:00 AM <br />{" "}
              <small>10 Spaces Available</small>
              <br />
              <Button
                href="/bookAppointment"
                variant="contained"
                color="secondary"
              >
                {" "}
                BOOK APPOINTMENT
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              {" "}
              Teeth Orthodontics <br /> 8:00 AM - 9:00 AM <br />{" "}
              <small>10 Spaces Available</small>
              <br />
              <Button
                href="/bookAppointment"
                variant="contained"
                color="secondary"
              >
                {" "}
                BOOK APPOINTMENT
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              {" "}
              Teeth Orthodontics <br /> 8:00 AM - 9:00 AM <br />{" "}
              <small>10 Spaces Available</small>
              <br />
              <Button
                href="/bookAppointment"
                variant="contained"
                color="secondary"
              >
                {" "}
                BOOK APPOINTMENT
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              {" "}
              Teeth Orthodontics <br /> 8:00 AM - 9:00 AM <br />{" "}
              <small>10 Spaces Available</small>
              <br />
              <Button
                href="/bookAppointment"
                variant="contained"
                color="secondary"
              >
                {" "}
                BOOK APPOINTMENT
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default BookApplointment;
