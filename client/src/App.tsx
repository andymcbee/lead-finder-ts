import React from "react";
import { Header } from "./components/Header";
import { LeftSideMenu } from "./components/LeftSideMenu";
import { ContentContainer } from "./components/ContentContainer";
import { Tester } from "./components/Tester";

function App() {
  return (
    <div className="flex flex-col border-solid border-2 border-red-600 min-h-screen min-w-[1000px]">
      <Header />
      <div className="flex flex-1 flex-row border-solid border-2 border-green-600">
        <div className="border-solid border-2 border-cyan-600 w-[200px]">
          <LeftSideMenu />
        </div>
        <div className="flex flex-col gap-5 border-solid border-2 border-orange-600 w-full p-8 ">
          <ContentContainer heading="Test" content={<Tester />} />
        </div>
      </div>
    </div>
  );
}

export default App;
