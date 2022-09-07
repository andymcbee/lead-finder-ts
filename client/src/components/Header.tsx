import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../redux/auth/authSlice";
import { Link } from "react-router-dom";

interface stateI {
  state: any;
  auth: any;
}

export const Header = () => {
  const dispatch = useDispatch<any>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: stateI) => state.auth
  );

  useEffect(() => {
    console.log("USE EFFECT TRIGGERED.... IN HEADER COMPONENT...");
    console.log(user);
  }, [user]);

  const handleLogout = () => {
    console.log("LOG OUT CLICKED");
    dispatch(logout());

    reset();
  };

  return (
    <nav className="flex justify-between bg-teal-500 p-6 border-solid border-2 border-blue-600">
      <div className="flex items-center flex-shrink-0 text-white mr-6 border-solid border-2 border-blue-600">
        <span className="font-semibold text-xl tracking-tight">
          Lead Finder App
        </span>
      </div>
      {user && (
        <div className="flex items-center w-auto border-solid border-2 border-blue-600">
          <div className="text-sm flex-grow">
            {/*      <a
              href="#responsive-header"
              className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-4"
            >
              Dashboard
            </a> */}
            <Link
              className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-4"
              to="/"
            >
              Dashboard
            </Link>
            {/*  <a
              href="#responsive-header"
              className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-4"
              onClick={() => handleLogout()}
            >
              Logout
            </a> */}
            <Link
              className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-4"
              to="/"
              onClick={() => handleLogout()}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
      {!user && (
        <div className="flex items-center w-auto border-solid border-2 border-blue-600">
          <div className="text-sm flex-grow">
            <Link
              className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-4"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-4"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
