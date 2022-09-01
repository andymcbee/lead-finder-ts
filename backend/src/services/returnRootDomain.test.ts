const { returnRootDomain } = require("./returnRootDomain");

//note: If sub domain(s) included, it will be returned.

test("basic url", () => {
  expect(returnRootDomain("https://google.com/")).toBe("google.com");
});

test("url with subdomain", () => {
  expect(returnRootDomain("https://subdomain.google.com/")).toBe(
    "subdomain.google.com"
  );
});

test("url with query", () => {
  expect(returnRootDomain("https://google.com/?query=123")).toBe("google.com");
});

test("url with path", () => {
  expect(returnRootDomain("https://google.com/search/")).toBe("google.com");
});

test("url with sub domain, path and query", () => {
  expect(
    returnRootDomain("https://subdomain.google.com/search/?query=123")
  ).toBe("subdomain.google.com");
});
