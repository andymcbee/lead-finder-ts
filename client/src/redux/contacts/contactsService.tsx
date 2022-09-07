import { API } from "../../api";

const fetchContacts = async (accId: string) => {
  console.log("FETCH CONTACTS SERVICE FIRED....");
  const response = await API.get(`/api/v1/contacts/${accId}`);

  /*   if (response.data) {
    console.log("IF STATEMENT FIRED IN AUTH SERVICE...");
    localStorage.setItem("token", JSON.stringify(response.data.token));
  } */
  //console.log(response.data);
  /*   if(response.data) {
    localStorage.setItem("token")
  } */

  //check IF response.data... then store JWT in local storage
  // localStorage.setItem("token", JSON.stringify(response.data))

  //then return response.data
  console.log(response.data.data.contacts);
  //return response.data.data;

  return response.data.data.contacts.reverse();
};

const contactsService = {
  fetchContacts,
};

export default contactsService;
