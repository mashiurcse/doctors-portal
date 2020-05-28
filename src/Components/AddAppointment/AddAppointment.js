import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Select, MenuItem } from "@material-ui/core";

const defaultValues = {
  select: "",
};
const AddAppointment = () => {
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  //const { register, errors, handleSubmit } = useForm();
  const { register, errors, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues,
  });
  const selectValue = watch("select");
  const onSubmit = (data) => {
    console.log(data);
    setAppointmentInfo(data);
  };
  console.log(appointmentInfo);

  useEffect(() => {
    register({ name: "select" });
  }, [register]);

  const handleChange = (e) => {
    setValue("select", e.target.value, true);
  };

  return (
    <div>
      <h3 id="serviceName">Your Service is: </h3>
      <div>
        <form
          style={{
            width: "200px",
            display: "block",

            margin: "50px",
          }}
          className="ship-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            name="name"
            //defaultValue={auth.user.name}
            ref={register({ required: true })}
            placeholder="Your Name"
          />
          {errors.name && <span className="error">Name is required</span>}

          <input
            name="email"
            //defaultValue={auth.user.email}
            ref={register({ required: true })}
            placeholder="Your Email"
          />
          {errors.email && <span className="error">Email is required</span>}
          <input
            name="AddressLine1"
            ref={register({ required: true })}
            placeholder="Address Line 1"
          />
          {errors.AddressLine1 && (
            <span className="error">Address is required</span>
          )}
          <input
            name="AddressLine2"
            ref={register}
            placeholder="Address Line 1"
          />
          <input
            name="city"
            ref={register({ required: true })}
            placeholder="City"
          />
          {errors.city && <span className="error">City is required</span>}
          <input
            name="country"
            ref={register({ required: true })}
            placeholder="Country"
          />
          {errors.country && <span className="error">Country is required</span>}
          <input
            name="zipcode"
            ref={register({ required: true })}
            placeholder="Zip Code"
          />
          <br />
          {errors.zipcode && (
            <span className="error">Zip Code is required</span>
          )}
          <Select
            value={selectValue}
            onChange={handleChange}
            displayEmpty
            style={{ width: "180px", border: "1px solid" }}
          >
            <MenuItem value="" disabled>
              Select Time
            </MenuItem>
            <MenuItem value={8}>8:00AM</MenuItem>
            <MenuItem value={8.5}>8:30AM</MenuItem>
            <MenuItem value={8.75}>8:45AM</MenuItem>
          </Select>
          <br />

          <button type="button" onClick={() => reset({ defaultValues })}>
            Reset
          </button>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
