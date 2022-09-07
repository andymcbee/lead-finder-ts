import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { checkValidEmail } from "../services/checkValidEmail";
import { useSelector } from "react-redux";

interface PropsI {
  //handleSubmit: React.ReactNode | React.ReactNode[];
  submitHandler: (
    firstName: string,
    lastName: string,
    website: string,
    email: string,
    emailFound: boolean
  ) => void;
}

export const LeadFinderForm = ({ submitHandler }: PropsI) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [website, setWebsite] = useState("");

  interface stateI {
    state: any;
    auth: any;
  }

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: stateI) => state.auth
  );

  return (
    <div className="">
      <h3 className="text-md font-semibold text-gray-900">Lead Finder</h3>
      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-6 mb-6">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={true}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Website
            </label>
            <input
              type="text"
              id="website"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={async () => {
                //submitHandler(firstName, lastName, website);
                console.log("THIS SHOULD FIRE FIRST...");

                const emailData = await checkValidEmail({
                  firstName: firstName,
                  lastName: lastName,
                  website: website,
                  accountId: user.accountId,
                });

                console.log("EMAIL DATA::::");
                console.log(emailData);

                const email = emailData.email;
                const emailFound = emailData.emailFound;
                console.log("STATUS::::");
                console.log(emailFound);

                submitHandler(firstName, lastName, website, email, emailFound);

                console.log("THIS SHOULD FIRE THIRD");
                console.log(emailData);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={async () => {
                await createEvent({
                  data: {
                    startTimeUnix: startDate / 1000,
                    endTimeUnix: endDate / 1000,
                    name,
                    description,
                    address,
                    organizationId,
                  },
                });

                closeModal();
              }}
            >
              Submit
            </button>
            <button
              onClick={() => closeModal()}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Back
            </button>
          </div> */
}
