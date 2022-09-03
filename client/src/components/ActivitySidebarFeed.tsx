import React, { useState, useEffect } from "react";
import { ActivityFeedItem } from "./ActivityFeedItem";

interface PropsI {
  arrayOfValues: { name: string; status: string }[] | undefined;
}

export const ActivitySidebarFeed = ({ arrayOfValues }: PropsI) => {
  console.log("ARRAY IN ACTIVITY FEED...");

  const [feed, setFeed] = useState(arrayOfValues);

  useEffect(() => {
    setFeed(arrayOfValues);
  }, [arrayOfValues]);

  return (
    <div className="">
      <h3 className="text-md font-semibold text-gray-900">Lead Finder</h3>
      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-6 mb-6">
          {feed?.map((x) => {
            return <ActivityFeedItem text={x.name} />;
          })}
        </div>
      </div>
    </div>
  );
};

/* 
<EventCard
key={x._id}
event={x}
editEvent={editEvent}
deleteEvent={deleteEvent}
user={user}
createEvent={createEvent}
/> */
