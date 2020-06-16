import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import {
  Grid,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles } from "@material-ui/core/styles";
//import Prescription from "../Prescription/Prescription";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const styles = {
  page: {
    background: "rgb(205, 251, 240)",
    minHeight: "100vh",
  },

  title: {
    paddingTop: 50,
  },

  hr: {
    border: "3px solid #887f7f",
    margin: "30px 5%",
    width: "90%",
  },

  loading: {
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 50,
  },

  countingDivs: {
    width: "40%",
    height: 100,
    marginLeft: "30%",
    margin: "50px 30%",
    display: "flex",
    background: "blue",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
    borderRadius: 20,

    span: {
      marginRight: 10,
    },
  },
};

const Dashboard = () => {
  const classes = useStyles();
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [progress, setProgress] = React.useState(0);
  const [appointments, setAppointments] = useState([]);
  const [pendingAppointCnt, setPendingAppointCnt] = useState(0);

  useEffect(() => {
    fetch("https://doctorsportalapp.herokuapp.com/Appointments")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setPendingAppointCnt(data.filter((ap) => ap.pending === true).length);
        setLoadingAppointments(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, [loadingAppointments]);

  //   const handleApproval = (index) => {
  //     fetch(
  //       `https://doctors-portal-back.herokuapp.com/appointmentStatus/${appointments[index]._id}`,
  //       {
  //         method: "PUT",
  //         body: JSON.stringify({
  //           pending: false,
  //         }),
  //         headers: {
  //           "Content-type": "application/json; charset=UTF-8",
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const updatedAppointments = appointments;
  //         updatedAppointments[index] = data;
  //         setAppointments(updatedAppointments);
  //         setPendingAppointCnt(
  //           updatedAppointments.filter((ap) => ap.pending === true).length
  //         );
  //       })
  //       .catch((err) => console.log(err));
  //   };

  return (
    <div>
      <Container maxWidth="xl" style={styles.page}>
        <Typography variant="h2">Dashboard</Typography>
        <hr style={styles.hr} />

        <Grid container spacing={3}>
          <Grid md={6} sm={12}>
            <div style={styles.countingDivs}>
              <span style={styles.countingDivs.span}>{pendingAppointCnt}</span>
              <Typography variant="h6">Pending Appointments</Typography>
            </div>
          </Grid>
          <Grid md={6} sm={12}>
            <div style={styles.countingDivs}>
              <span style={styles.countingDivs.span}>
                {appointments.length}
              </span>
              <Typography variant="h6">Total Appointments</Typography>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid md={12} xs={12}>
            <Paper elevation={3} style={styles.appointPaper}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">
                        Patient Name
                      </StyledTableCell>
                      <StyledTableCell align="right">Phone</StyledTableCell>

                      <StyledTableCell align="right">
                        Appointment Date
                      </StyledTableCell>
                      <StyledTableCell align="right">Time</StyledTableCell>
                      <StyledTableCell align="right">Approval</StyledTableCell>
                      <StyledTableCell align="right">
                        Prescription
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!loadingAppointments &&
                      appointments.map((appointment, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="right">
                            {appointment.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {appointment.phone}
                          </StyledTableCell>

                          <StyledTableCell align="right">
                            {appointment.appointmentDate}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {appointment.time}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Button
                              variant="contained"
                              color={
                                appointment.pending ? "primary" : "secondary"
                              }
                              // onClick={() => handleApproval(index)}
                            >
                              {appointment.pending ? "Approve" : "Approved"}
                            </Button>
                          </StyledTableCell>
                          {/* <StyledTableCell align="right">
                            {!appointment.prescription && (
                              <Prescription appointment={appointments[index]} />
                            )}
                            {appointment.prescription && (
                              <Button variant="contained" color="secondary">
                                Prescribed
                              </Button>
                            )}
                          </StyledTableCell> */}
                        </StyledTableRow>
                      ))}

                    {loadingAppointments && (
                      <Grid container justify="space-around">
                        <Typography variant="h5" style={styles.loading}>
                          Loading{" "}
                          <CircularProgress
                            variant="determinate"
                            value={progress}
                            color="secondary"
                            style={styles.loadingCircle}
                          />
                        </Typography>
                      </Grid>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
