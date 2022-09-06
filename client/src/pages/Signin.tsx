import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../redux/auth/authSlice";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  interface stateI {
    state: any;
    auth: any;
  }

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: stateI) => state.auth
  );
  console.log("REDUX STATES IN SIGN UP PAGE::::");
  console.log(isLoading);

  useEffect(() => {
    console.log("REDUX STATES IN USE EFFECT::::");
    console.log(isLoading);
    console.log(user);

    /* if (isError) {
      toast.error(message);
    } */

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const handleSignin = (email: string, password: string) => {
    console.log("handle signup clicked");
    const data = {
      data: {
        email,
        password,
      },
    };

    console.log(data);

    dispatch(login(data));
  };

  return (
    <>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Login
              </h1>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required={false}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={false}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={async () => {
                  console.log("TEST WORKING");

                  await handleSignin(email, password);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
