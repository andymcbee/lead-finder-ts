import axios from "axios";

let baseURL = "";

const token: string | null = JSON.parse(localStorage.getItem("token") || "{}");
console.log("JWT WITHIN INDEX JS API################");
console.log(token);

if (process.env.NODE_ENV === "development") {
  console.log("DEV SERVER DETECTED22222");
  baseURL = "http://localhost:5000";
}

if (process.env.NODE_ENV === "production") {
  throw "Prod API not setup. Add URL in the api/index.tsx file.";
  //  console.log("PROD SERVER DETECTED");
  //  baseURL = "https://simple-events-feed-node-backen.herokuapp.com";
}

console.log("JWT AND BASE URL::::");
console.log(token);
console.log(baseURL);

export const API = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

/* export const API = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${jwt}` },
}); */
