import { API } from "../api/index";

interface PropsI {
  firstName: string;
  lastName: string;
  website: string;
  accountId: string;
}

export const checkValidEmail = async ({
  firstName,
  lastName,
  website,
  accountId,
}: PropsI) => {
  const data = await API.post("/api/v1/contacts/create", {
    data: {
      fName: firstName,
      lName: lastName,
      website,
      accountId,
    },
  });
  console.log("THIS IS THE DATA FROM THE SERVICE POST REQ::::::");
  console.log(data);

  return data.data;
};
