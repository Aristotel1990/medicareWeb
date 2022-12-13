import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Signup from "./Signup";

const NavBar = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="  my-0 flex items-center justify-between p-4 z-[100] w-full absolute ">
      <Link to="/">
        <h1 className="text-red-600 text-2xl ml-20 font-bold cursor-pointer">
          Medicare
        </h1>
      </Link>
      {isAuthenticated ? (
        <div>
          <Link to="dashboard">
            <button className="text-black pr-4">Dashboard</button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mr-10">
          <Link to="/login">
            <button className="text-white pr-4">Sign In</button>
          </Link>
          <Link to="/register">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
