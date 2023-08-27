import { Col, Icon } from "antd";
import orderBy from "lodash/orderBy";
import React from "react";

const MeetingAgendaList = ({ agendaList, setAgendaList, isDelete }) => {
  return (
    <>
      {agendaList
        ? orderBy(
            agendaList.map((d, i) => ({ id: i, data: d })),
            "id",
            "desc"
          )?.map(({ id, data }, index) => {
            return (
              <div key={id}>
                <Col span={isDelete ? 23 : 24} className="my-1">
                  {/* <Badge status="processing" text={item} /> */}
                  {index + 1}. {data}
                </Col>
                {isDelete && (
                  <Col span={1} className="my-1">
                    <Icon
                      type="delete"
                      style={{ color: "#F2473F" }}
                      onClick={() => {
                        //console.log({ agendaList, id });
                        setAgendaList(
                          agendaList?.filter((agenda, i) => i !== id)
                        );
                      }}
                    />
                  </Col>
                )}
              </div>
            );
          })
        : null}
    </>
  );
};

export default MeetingAgendaList;
