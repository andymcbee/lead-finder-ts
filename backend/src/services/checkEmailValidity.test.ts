import { checkEmailValidity } from "./checkEmailValidity";
import axios from "axios";

interface apiRes {
  status: string;
  result: string;
  flags: [];
  suggested_correction: string;
  execution_time: number
}


jest.mock("axios");
const mockedAxios = jest.mocked(axios, true);


describe("neverbounceEmailVerifySuccessful", () => {
  afterEach(jest.clearAllMocks);

  test("should return a valid email", async () => {
    mockedAxios.post.mockResolvedValue({ data: { status: "success", result: "valid" } });
    const result = await checkEmailValidity("andrew@getreviewrobin.com");
    console.log("RESULT.........")
    console.log(result.data.email);
    
     expect(result?.data.email).toBe("andrew@getreviewrobin.com");
     
  expect(result?.data.status).toBe("success");
     expect(result?.data.result).toBe("valid"); 


  });
  test("unsuccessful verification", async () => {
    mockedAxios.post.mockResolvedValue({ data: {  status: "success", result: "invalid" } });
    const result = await checkEmailValidity("tim@getreviewrobin.com");
    console.log(result);
    expect(result?.data.email).toBe("tim@getreviewrobin.com");
    expect(result?.data.status).toBe("success");
    expect(result?.data.result).toBe("invalid");

  });

  test("successful catchall verification", async () => {
        mockedAxios.post.mockResolvedValue({ data: {  status: "success", result: "catchall" } });

    const result = await checkEmailValidity("tim@google.com");
    console.log(result);
    expect(result?.data.email).toBe("tim@google.com");
    expect(result?.data.status).toBe("success");
    expect(result?.data.result).toBe("catchall");

  }); 
});

