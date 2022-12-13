import jwtDecode from "jwt-decode";
//
import axios from "./axios";

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};
const formatInterval = (interval) => {
  switch (interval) {
    case 1:
      return "8.00-8.30 AM";
    case 2:
      return "8.30-9.00 AM";

    case 3:
      return "9.00-9.30 AM";
    case 4:
      return "9.30-10.00 AM";
    case 5:
      return "10.00-10.30 AM";
    case 6:
      return "10.30-11.00 AM";
    case 7:
      return "11.00-11.30 AM";
    case 8:
      return "11.30-12.00 AM";
    case 9:
      return "12.00-12.30 PM";
    case 10:
      return "12.30-13.00 PM";
    case 11:
      return "13.00-13.30 PM";
    case 12:
      return "13.30-14.00 PM";
    case 13:
      return "14.00-14.30 PM";
    case 14:
      return "14.30-15.00 PM";
    case 15:
      return "15.00-15.30 PM";
    case 16:
      return "15.30-16.00 PM";
  }
};

export { isValidToken, setSession, formatInterval };
