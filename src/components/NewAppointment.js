import React, { useEffect, useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import { getAppointmentByDate, updateDate } from "../redux/slices/user";
import AppointmenSelect from "./AppointmenSelect";
import { useDispatch, useSelector } from "../redux/store";
function NewAppointment() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [date, setdate] = useState(new Date());

  useEffect(() => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    const newDate = { day, month, year };
    setdate(newDate);
    dispatch(getAppointmentByDate({ day, year, month }));
  }, []);

  const handleChange = async (selectedDate) => {
    var myDate = new Date(selectedDate);
    var day = myDate.getDate();
    var month = myDate.getMonth() + 1;
    var year = myDate.getFullYear();
    const newDate = { day, month, year };
    setdate(newDate);
    dispatch(getAppointmentByDate({ day, year, month }));
  };

  const handleClose = (state) => {
    setShow(state);
  };

  const options = {
    title: "Demo Title",

    autoHide: true,

    todayBtn: false,

    clearBtn: true,

    maxDate: new Date("2030-01-01"),

    icons: {
      // () => ReactNode | JSX.Element

      prev: () => <span>Previous</span>,

      next: () => <span>Next</span>,
    },

    datepickerClassNames: "top-12",

    defaultDate: date,

    language: "en",
  };

  return (
    <div class=" p-4 mt-5 mb-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-10">
        Select a day and you can see all available appoinments
      </h3>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />

      <AppointmenSelect date={date} />
    </div>
  );
}

export default NewAppointment;
