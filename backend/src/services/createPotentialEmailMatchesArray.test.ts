const {
  createPotentialEmailMatchesArray
} = require("./createPotentialEmailMatchesArray");

let contactData = {
  fName: "Jim",
  lName: "Smith",
  website: "google.com"
};

//console.log(createPotentialEmailMatchesArray(contactData))
test("basic url", () => {
  expect(createPotentialEmailMatchesArray(contactData)).toEqual([
    "jim@google.com",
    "jsmith@google.com",
    "jim.smith@google.com"
  ]);
});
