import { createSlice } from "@reduxjs/toolkit";
import { map } from "lodash";
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  user: {},
  isLoading: false,
  error: false,
  errorText: null,
  openModal: false,
  doctor: [],
  myDoctor: null,
  yourAppointment: [],
  status: false,
  appointmenList: [
    {
      id: 1,
      name: "8.00-8.30 AM",
      active: false,
    },
    {
      id: 2,
      name: "8.30-9.00 AM",
      active: false,
    },
    {
      id: 3,
      name: "9.00-9.30 AM",
      active: false,
    },
    {
      id: 4,
      name: "9.30-10.00 AM",
      active: false,
    },
    {
      id: 5,
      name: "10.00-10.30 AM",
      active: false,
    },
    {
      id: 6,
      name: "10.30-11.00 AM",
      active: false,
    },
    {
      id: 7,
      name: "11.00-11.30 AM",
      active: false,
    },
    {
      id: 8,
      name: "11.30-12.00 AM",
      active: false,
    },
    {
      id: 9,
      name: "12.00-12.30 PM",
      active: false,
    },
    {
      id: 10,
      name: "12.30-13.00 PM",
      active: false,
    },
    {
      id: 11,
      name: "13.00-13.30 PM",
      active: false,
    },
    {
      id: 12,
      name: "13.30-14.00 PM",
      active: false,
    },
    {
      id: 13,
      name: "14.00-14.30 PM",
      active: false,
    },
    {
      id: 14,
      name: "14.30-15.00 PM",
      active: false,
    },

    {
      id: 15,
      name: "15.00-15.30 PM",
      active: false,
    },
    {
      id: 16,
      name: "15.30-16.00 PM",
      active: false,
    },
  ],
  myAppointment: [],
  date: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    getCurrentUserSucces(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
    getDoctorSuccess(state, action) {
      state.isLoading = false;
      state.doctor = action.payload;
    },
    newAppointmenSuccess(state, action) {
      state.isLoading = false;
      state.yourAppointment = [...action.payload];
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetDate(state, action) {
      state.appointmenList = [
        {
          id: 1,
          name: "8.00-8.30 AM",
          active: false,
        },
        {
          id: 2,
          name: "8.30-9.00 AM",
          active: false,
        },
        {
          id: 3,
          name: "9.00-9.30 AM",
          active: false,
        },
        {
          id: 4,
          name: "9.30-10.00 AM",
          active: false,
        },
        {
          id: 5,
          name: "10.00-10.30 AM",
          active: false,
        },
        {
          id: 6,
          name: "10.30-11.00 AM",
          active: false,
        },
        {
          id: 7,
          name: "11.00-11.30 AM",
          active: false,
        },
        {
          id: 8,
          name: "11.30-12.00 AM",
          active: false,
        },
        {
          id: 9,
          name: "12.00-12.30 PM",
          active: false,
        },
        {
          id: 10,
          name: "12.30-13.00 PM",
          active: false,
        },
        {
          id: 11,
          name: "13.00-13.30 PM",
          active: false,
        },
        {
          id: 12,
          name: "13.30-14.00 PM",
          active: false,
        },
        {
          id: 13,
          name: "14.00-14.30 PM",
          active: false,
        },
        {
          id: 14,
          name: "14.30-15.00 PM",
          active: false,
        },

        {
          id: 15,
          name: "15.00-15.30 PM",
          active: false,
        },
        {
          id: 16,
          name: "15.30-16.00 PM",
          active: false,
        },
      ];
    },
    updateDate(state, action) {
      state.date = action.payload;
    },
    getAppointmenListSuccess(state, action) {
      state.isLoading = false;
      const data = action.payload;
      const defautData = [
        {
          id: 1,
          name: "8.00-8.30 AM",
          active: false,
        },
        {
          id: 2,
          name: "8.30-9.00 AM",
          active: false,
        },
        {
          id: 3,
          name: "9.00-9.30 AM",
          active: false,
        },
        {
          id: 4,
          name: "9.30-10.00 AM",
          active: false,
        },
        {
          id: 5,
          name: "10.00-10.30 AM",
          active: false,
        },
        {
          id: 6,
          name: "10.30-11.00 AM",
          active: false,
        },
        {
          id: 7,
          name: "11.00-11.30 AM",
          active: false,
        },
        {
          id: 8,
          name: "11.30-12.00 AM",
          active: false,
        },
        {
          id: 9,
          name: "12.00-12.30 PM",
          active: false,
        },
        {
          id: 10,
          name: "12.30-13.00 PM",
          active: false,
        },
        {
          id: 11,
          name: "13.00-13.30 PM",
          active: false,
        },
        {
          id: 12,
          name: "13.30-14.00 PM",
          active: false,
        },
        {
          id: 13,
          name: "14.00-14.30 PM",
          active: false,
        },
        {
          id: 14,
          name: "14.30-15.00 PM",
          active: false,
        },

        {
          id: 15,
          name: "15.00-15.30 PM",
          active: false,
        },
        {
          id: 16,
          name: "15.30-16.00 PM",
          active: false,
        },
      ];
      const isEmptyCart = data.length === 0;

      if (isEmptyCart) {
        state.appointmenList = defautData;
      } else {
        state.appointmenList = map(defautData, (_product) => {
          const found = data.find((ele) => ele.interval === _product.id);

          if (found) {
            return {
              ..._product,
              active: true,
            };
          }
          return _product;
        });
      }
    },
    getTwoDoctorsSuccess(state, action) {
      state.isLoading = false;
      state.doctor = action.payload;
    },
    getMyDoctorSucces(state, action) {
      state.isLoading = false;
      state.myDoctor = action.payload;
    },
    getAllAppointmenSuccess(state, action) {
      state.isLoading = false;
      state.myAppointment = action.payload;
    },
    changeStatus(state, action) {
      state.openModal = action.payload;
    },
    reRender(state, action) {
      state.status = !state.status;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { resetDate, updateDate, changeStatus, reRender } = slice.actions;

// ----------------------------------------------------------------------
export function getTowDoctors() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/users/doctors`);
      dispatch(slice.actions.getTwoDoctorsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getMyDoctor() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/users/mydoctor`);
      dispatch(slice.actions.getMyDoctorSucces(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getCurrentUser() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/users`);
      dispatch(slice.actions.getCurrentUserSucces(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function selectDoctor(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/users/doctor/${id}`);
      dispatch(slice.actions.getDoctorSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function newAppointmen({ day, year, month, interval }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.post(`/api/v1/users/newappointment`, {
        data: { year, month, day, interval },
      });
      dispatch(slice.actions.newAppointmenSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserList() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/user/manage-users");
      dispatch(slice.actions.getUserListSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getAppointmentByDate({ day, year, month }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/api/v1/users/appointment`, {
        data: { year, month, day },
      });
      dispatch(slice.actions.getAppointmenListSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export async function editUser(data) {
  return axios.post(`/api/v1/users/edit`, { data });
}
export async function editDoctor(data) {
  console.log("🚀 ~ file: user.js:428 ~ editDoctor ~ data", data);

  return axios.post(`/api/v1/users/doctor`, { data });
}
export function getAllppointment() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/users/list`);
      dispatch(slice.actions.getAllAppointmenSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export async function deleteAppointment(id) {
  console.log("🚀 ~ file: user.js:449 ~ deleteAppointment ~ id", id);

  return axios.post(`/api/v1/users/delete`, { id });
}
