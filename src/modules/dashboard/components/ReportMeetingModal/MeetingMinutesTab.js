/** @format */

import React from "react";
import MeetingIdeas from "./MeetingIdeas";

const MeetingMinutesTab = ({ meeting }) => {
  return (
    <div>
      <h4 style={{ color: "blue", fontWeight: "normal" }}>Meeting Minute</h4>
      {meeting?.meeting_minute_story ? (
        <div>
          <br />
          <div
            dangerouslySetInnerHTML={{
              __html: meeting?.meeting_minute_story,
            }}
          />
        </div>
      ) : null}
      {meeting?.meeting_ideas?.length ? (
        <MeetingIdeas ideas={meeting.meeting_ideas} />
      ) : null}
      <MeetingIdeas />
    </div>
  );
};

export default MeetingMinutesTab;
