import React from "react";
import axios from "axios";

interface PropsI {
  firstName: string;
  lastName: string;
  website: string;
}

export const checkValidEmail = async ({
  firstName,
  lastName,
  website,
}: PropsI) => {
  console.log("DATA IN ASYNC CALL, FROM PROPS...");
  console.log(firstName);
  console.log(lastName);

  console.log(website);

  const data = await axios.post(
    "http://localhost:5000/api/v1/contacts/create",
    {
      data: {
        fName: firstName,
        lName: lastName,
        website,
      },
    }
  );
  console.log("THIS SHOULD FIRE SECOND");
  /*   console.log("TESTING... THIS IS THE CONSOLE LOG IN THE SERVICE...");
  console.log(data.data); */
  return data.data;
};
