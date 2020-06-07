import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Grid, Typography} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Schedule from "../Schedule/Schedule";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const styles = {
  page: {
    background: "#cce9f1",
    minHeight: "100vh",
  },

  title: {
    paddingTop: 50,
  },

  datepicker: {
    marginTop: 50,
  },

  img: {
    height: "70%",
    width: "90%",
    marginTop: 50,
  },

  appointmentDate: {
    background: "yellow",
    borderRadius: 5,
    padding: "0 10px",
  },

  loading: {
    fontWeight: "bold",
    marginTop: 50,
  },

  loadingCircle: {},

  hr: {
    border: "3px solid #887f7f",
    margin: 50,
  },
};

const Appointment = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [dateChanged, setDateChanged] = useState(false);

  useEffect(() => {
    //get all schedules
    fetch("https://doctors-portal-back.herokuapp.com/schedules")
      .then((res) => res.json())
      .then((data) => {
        setSchedules(data);
        //setLoadingSchedules(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAppointmentDate(date);
    setDateChanged(!dateChanged);
  };

  const getFormattedDate2 = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`;
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="xl" style={styles.page}>
        <Grid container spacing={3}>
          <Grid md={6} xs={12}>
            <Typography variant="h2" style={styles.title}>
              Appointment
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around" align="center">
                <Calendar
                  margin="normal"
                  id="date-picker-dialog"
                  onChange={handleDateChange}
                  value={selectedDate}
                  showWeekNumbers={true}
                  minDate={new Date()}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid md={6} xs={12}>
            <img
              src={require("../../images/Mask Group 1.png")}
              alt=""
              style={styles.img}
            />
          </Grid>
        </Grid>

        <hr style={styles.hr} />

        <Typography variant="h3">
          Available appointments on{" "}
          <span style={styles.appointmentDate}>
            {getFormattedDate2(appointmentDate)}
          </span>
        </Typography>

        <Grid container spacing={3}>
          {schedules.map((schedule) => {
            return (
              <Grid md={4} xs={12}>
                {dateChanged && (
                  <Schedule
                    schedule={{
                      ...schedule,
                    }}
                    appointmentDate={appointmentDate}
                  />
                )}
                {!dateChanged && (
                  <Schedule
                    schedule={{
                      ...schedule,
                    }}
                    appointmentDate={appointmentDate}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Appointment;
