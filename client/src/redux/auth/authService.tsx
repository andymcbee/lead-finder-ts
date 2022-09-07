import { API } from "../../api/index";

//register user

interface userDataI {
  data: {
    email: string;
    password: string;
    confirmPassword?: string;
  };
}

const register = async (userData: userDataI) => {
  const response = await API.post("/api/v1/users/signup", userData);

  if (response.data.token) {
    console.log("IF STATEMENT FIRED IN AUTH SERVICE...");
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  //console.log(response.data);
  /*   if(response.data) {
    localStorage.setItem("token")
  } */

  //check IF response.data... then store JWT in local storage
  // localStorage.setItem("token", JSON.stringify(response.data))

  //then return response.data

  return response.data.data;
};

const login = async (userData: userDataI) => {
  const response = await API.post("/api/v1/users/signin", userData);

  if (response.data.token) {
    console.log("IF STATEMENT FIRED IN AUTH SERVICE...");
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }

  return response.data.data;
};

const logout = async () => {
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
