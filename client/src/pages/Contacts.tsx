import react, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContacts, reset } from "../redux/contacts/contactsSlice";

export const Contacts = () => {
  //fetch data, store it in state onpage NOT GLOBAL
  //map it, and return a <th> for each one, with the relevant data
  //place that block within the <tr> block

  interface stateI {
    state: any;
    auth: any;
    contacts: any;
  }

  const dispatch = useDispatch<any>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: stateI) => state.auth
  );

  const { contacts } = useSelector((state: stateI) => state.contacts);

  const tableRows = contacts.map((item: any) => {
    console.log(item);
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {item.first_name + " " + item.last_name}
        </th>
        <td className="py-4 px-6">{item.email}</td>
        <td className="py-4 px-6">{item.emailstatus}</td>
        <td className="py-4 px-6">{item.website}</td>
      </tr>
    );
  });

  console.log(tableRows);

  useEffect(() => {
    console.log("USE EFF FIRED IN CONTACTS PAGE........");
    dispatch(getContacts(user?.accountId));

    dispatch(reset());
  }, []);
  console.log("CONTACTS:::::::::;");
  console.log(contacts);

  return (
    <div className="pageContainer">
      <div className="pageTitle">Contacts</div>

      <div className="flex gap-5">
        <div className="pageContainer">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Status
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Website
                  </th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 
<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="py-4 px-6">Sliver</td>
                  <td className="py-4 px-6">Laptop</td>
                  <td className="py-4 px-6">$2999</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="py-4 px-6">White</td>
                  <td className="py-4 px-6">Laptop PC</td>
                  <td className="py-4 px-6">$1999</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="py-4 px-6">Black</td>
                  <td className="py-4 px-6">Accessories</td>
                  <td className="py-4 px-6">$99</td>
                </tr> */
