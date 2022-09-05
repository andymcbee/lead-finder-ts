import axios from "axios";
require("dotenv").config();

export const checkEmailValidity = async (email: string) => {
  console.log("API KEY....");
  console.log(process.env.NEVERBOUNCE_API_KEY);

  interface apiRes {
    status: string;
    result: string;
    flags: [];
    suggested_correction: string;
    execution_time: number;
  }

  try {
    const { data }: { data: apiRes } = await axios.post(
      `https://api.neverbounce.com/v4/single/check?key=${process.env.NEVERBOUNCE_API_KEY}&email=${email}`
    );

    return { data: { email, ...data } };
  } catch (error) {
    console.log(error);
  }
};
