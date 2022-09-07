import React from "react";
import { Header } from "./components/Header";
import { LeftSideMenu } from "./components/LeftSideMenu";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Contacts } from "./pages/Contacts";

import { useSelector } from "react-redux";

interface stateI {
  state: any;
  auth: any;
}

function App() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: stateI) => state.auth
  );

  return (
    <div className="flex flex-col border-solid border-2 border-red-600 min-h-screen min-w-[1000px]">
      <Header />
      <div className="flex flex-1 flex-row border-solid border-2 border-green-600">
        {user && (
          <div className="border-solid border-2 border-cyan-600 w-[250px]">
            <LeftSideMenu />
          </div>
        )}
        <div className="border-solid border-2 border-orange-600 w-full p-8 ">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
