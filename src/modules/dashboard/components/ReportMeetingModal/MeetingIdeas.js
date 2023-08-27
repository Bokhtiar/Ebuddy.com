/** @format */

import React from "react";
import { List, Typography } from "antd";
const mock = {
  meeting_ideas: [
    {
      id: 45,
      meeting_id: 935,
      name: "idea 1",
      description: "",
      created_at: "2023-06-13T17:58:37.000000Z",
      updated_at: null,
      deleted_at: null,
    },
    {
      id: 46,
      meeting_id: 935,
      name: "idea 2",
      description: "",
      created_at: "2023-06-13T17:58:37.000000Z",
      updated_at: null,
      deleted_at: null,
    },
  ],
};
const { Item } = List;
// const {Meta} = Item;
const { Text } = Typography;

const MeetingIdeas = ({ ideas }) => {
  return (
    <div>
      <List
        header={<div>Meeting Ideas</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={ideas}
        renderItem={({ name, description }) => (
          <Item>
            <Item.Meta
              title={<Text>{name ? name : ""}</Text>}
              description={description ? description : ""}
            />
            {/* <Text>{item}</Text> */}
          </Item>
        )}
      />
    </div>
  );
};

export default MeetingIdeas;
