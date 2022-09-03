import React, { useState } from "react";
import { BiLoader } from "react-icons/bi";

interface PropsI {
  text: string;
}

export const ActivityFeedItem = ({ text }: PropsI) => {
  const [divText, setDivText] = useState(text);
  const [checked, setChecked] = useState(false);
  const [positiveHit, setPositiveHit] = useState(true);

  setTimeout(() => {
    console.log("Hello, World!");
    setChecked(true);
  }, 3000);

  if (!checked) {
    return (
      <div className="">
        <BiLoader />
      </div>
    );
  } else {
    return <>{checked && positiveHit && <div>{divText} Checked!</div>}</>;
  }
};
