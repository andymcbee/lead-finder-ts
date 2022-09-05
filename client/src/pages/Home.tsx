import React, { useState } from "react";
import { LeadFinderForm } from "../components/LeadFinderForm";

interface arrayOfValuesI {
  name: string;
  emailFound: boolean;
}

export const Home = () => {
  const [arrayOfValues, setArrayOfValues] = useState<arrayOfValuesI[]>([]);

  const handleSubmit = (
    firstName: string,
    lastName: string,
    website: string,
    email: string,
    emailFound: boolean
  ) => {
    console.log("PUSH ITEM ");

    /* const updatedArray = arrayOfValues;
    console.log(updatedArray);

    updatedArray.unshift({ name: firstName, emailFound });

    console.log(updatedArray);

    setArrayOfValues(updatedArray);
    console.log("STATE...");
    console.log(arrayOfValues); */

    setArrayOfValues([...arrayOfValues, { name: firstName, emailFound }]);
  };
  return (
    <div className="pageContainer">
      <div className="pageTitle">Home</div>
      <div className="flex gap-5">
        <div className="pageContainer">
          <LeadFinderForm submitHandler={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
