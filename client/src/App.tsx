import React from "react";
import { Header } from "./components/Header";
import { LeftSideMenu } from "./components/LeftSideMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";

function App() {
  const user = false;
  return (
    <div className="flex flex-col border-solid border-2 border-red-600 min-h-screen min-w-[1000px]">
      <Header />
      <div className="flex flex-1 flex-row border-solid border-2 border-green-600">
        {user && (
          <div className="border-solid border-2 border-cyan-600 w-[200px]">
            <LeftSideMenu />
          </div>
        )}
        <div className="border-solid border-2 border-orange-600 w-full p-8 ">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Signin />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
