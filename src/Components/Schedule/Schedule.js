import React from "react";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useForm } from "react-hook-form";

const styles = {
  paper: {
    minHeight: "300px",
    width: "90%",
    marginLeft: "5%",
    marginTop: 70,
    marginBottom: 10,
    padding: 30,
  },

  appoinmentBtn: {
    background:
      "linear-gradient( to right, rgb(94, 218, 194), rgb(8, 178, 199))",
    color: "white",
    padding: 10,
    marginTop: 20,
  },

  successMsg: {
    background: "green",
    color: "white",
  },

  errorMsg: {
    background: "red",
    color: "white",
  },

  doctorSelect: {
    width: "100%",
  },
};

const Schedule = (props) => {
  let { schedule, appointmentDate } = props;
  let { department } = schedule;
  let [selectedDate, setSelectedDate] = React.useState(appointmentDate);
  let [time, setTime] = React.useState("");
  let [applySuccessful, setApplySuccessful] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, errors } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setApplySuccessful(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getFormatedDate = (date) => {
    const datee = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${(datee < 10 ? "0" : "") + datee}-${
      (date.getMonth() + 1 < 10 ? "0" : "") + month
    }-${year}`;
  };

  const onSubmit = (data, e) => {
    const appointment = {
      ...data,
      Department:  department ,
      appointmentDate: getFormatedDate(selectedDate),
      pending: true,
      prescription: false,
    };

    fetch("http://localhost:4200/addAppointments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((res) => res.json())
      .then((data) => {
        setApplySuccessful(true);
        e.target.reset(); //clear form
      })
      .catch((err) => console.log(err));
  };

  const handleTimeChange = (event) => {
    const timee = event.target.name;
    setTime(event.target.value);
  };

  return (
    <div>
      <Paper style={styles.paper} elevation={3}>
        <Typography variant="h4">{schedule.department}</Typography>

        <Typography variant="h5">{schedule.time}</Typography>

        <Typography variant="h6">
          {`${schedule.spaceAvailable} spaces available.`}
        </Typography>

        <Button style={styles.appoinmentBtn} onClick={handleClickOpen}>
          Book Appointment
        </Button>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{schedule.department}</DialogTitle>
        {applySuccessful && (
          <Typography variant="h6" style={styles.successMsg}>
            Thank you for your Appointment!
          </Typography>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>Fill up the Appointment Form.</DialogContentText>

            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">
                Select Time
              </InputLabel>
              <Select
                native
                label="Select Time"
                value={time}
                onChange={handleTimeChange}
                autofocus
                inputRef={register({ required: true })}
                inputProps={{
                  name: "Appointment Time",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option>8:00AM - 8:30AM</option>
                <option>8:40AM - 9:10AM</option>
                <option>9:20AM - 9:50AM</option>
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Your Name"
              type="text"
              inputRef={register({ required: true })}
              error={errors.name ? true : false}
              fullWidth
            />
            {errors.name && <div>Name is required</div>}

            <TextField
              type="email"
              id="email"
              name="email"
              inputRef={register({ required: true })}
              label="Email"
              fullWidth
              error={errors.email ? true : false}
            />
            {errors.email && <div>Email is required</div>}

            <TextField
              margin="dense"
              id="phone"
              name="phone"
              label="Your Phone"
              type="text"
              inputRef={register({ required: true })}
              error={errors.phone ? true : false}
              fullWidth
            />
            {errors.phone && <div>Phone is required</div>}

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {/* <Grid container justify="space-around" align="center"> */}
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                name="datePicker"
                label="Select Appointment Date"
                format="dd-MM-yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                disablePast
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                style={styles.datepicker}
              />
              {/* </Grid> */}
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Get Appointment
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Schedule;
