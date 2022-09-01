const { swapiGetter } = require("./swapiGetter");
import axios from "axios";

jest.mock("axios");
const mockedAxios = jest.mocked(axios, true);

mockedAxios.get.mockResolvedValue({ data: { name: "Luke Skywalker" } });

describe("swapiGetter", () => {
  afterEach(jest.clearAllMocks);
  test("should return a name", async () => {
    const result = await swapiGetter(1);
    expect(result).toBe("Luke Skywalker");
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  test("test 2", async () => {
    const result = await swapiGetter(1);
    expect(result).toBe("Luke Skywalker");
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
