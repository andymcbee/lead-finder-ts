//This service includes the exact domain host provided - included any sub domains.
//It will strip away paramaters and https:// and www.

export const returnRootDomain = (url: string) => {
  let urlObj = new URL(url);
  let domain = urlObj.hostname;
  let arr = urlObj.hostname.split(".");

  if (arr[0] === "www") {
    domain = domain.slice(4);
  }

  return domain;
};
