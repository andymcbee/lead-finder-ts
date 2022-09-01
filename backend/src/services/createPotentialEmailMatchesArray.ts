interface contactData {
  fName: string;
  lName: string;
  website: string;
}

export const createPotentialEmailMatchesArray = (contactData: contactData) => {
  console.log("NEW SERVICE TESTING..");

  let { fName, lName, website } = contactData;

  let emailArr: string[] = [];

  //firstName @ domain.com
  emailArr.push(`${fName}@${website}`.toLowerCase());

  if (lName) {
    //firstInitial lastName @ domain.com
    emailArr.push(`${fName.charAt(0) + lName}@${website}`.toLowerCase());

    // firstName DOT lastName @ domain.com
    emailArr.push(`${fName}.${lName}@${website}`.toLowerCase());
  }
  return emailArr;
};
