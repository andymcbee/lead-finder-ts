import React, { useState } from "react";
import { LeadFinderForm } from "../components/LeadFinderForm";
import { ActivitySidebarFeed } from "../components/ActivitySidebarFeed";

export const Home = () => {
  const [arrayOfValues, setArrayOfValues] = useState([
    { name: "", status: "" },
  ]);

  const handleSubmit = (
    firstName: string,
    lastName: string,
    website: string
  ) => {
    console.log("PUSH ITEM TRIGGERED");

    setArrayOfValues([
      ...arrayOfValues,
      { name: firstName, status: "not checked" },
    ]);
  };
  return (
    <div className="pageContainer">
      <div className="pageTitle">Home</div>
      <div className="flex gap-5">
        <div className="pageContainer">
          <LeadFinderForm submitHandler={handleSubmit} />
        </div>
        <div className="pageContainer w-[350px]">
          <ActivitySidebarFeed arrayOfValues={arrayOfValues} />
        </div>
      </div>
    </div>
  );
};
