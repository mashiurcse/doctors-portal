import React from "react";
import Button from "@material-ui/core/Button";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <h1>Welcome to Doctors Portal</h1>

        <Button
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          href="/bookAppointment"
          variant="contained"
          color="secondary"
        >
          Book Appointment
        </Button>

        <hr />

        <Button
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          href="/addAppointment"
          variant="contained"
          color="secondary"
        >
          Check Appointment
        </Button>
      </div>
    </div>
  );
};

export default Home;
