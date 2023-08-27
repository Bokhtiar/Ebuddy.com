import React, { useState } from "react";
import { Wrapper } from "../commons/Wrapper";
import { Typography, Row, Col, Upload, Icon, Result, Button } from "antd";
import sample from "../../assets/sample-work-station.jpeg";
import { postData } from "../../scripts/api-service";
import { WFH_FILE_UPLOAD } from "../../scripts/api";
import { useHistory } from "react-router-dom";
import { alertPop } from "../../scripts/message";
import add from "../../assets/add_new.svg";

const WorkStation = props => {
  const [imageUrl, setImageUrl] = useState();
  const [applied, setApplied] = useState();
  const [loading, setLoading] = useState();
  const [file, setFile] = useState();
  const history = useHistory();

  const fileUpload = async () => {
    setLoading(true);
    const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "workstation");
    let res = await postData(WFH_FILE_UPLOAD, formData);
    if (res) {
      alertPop("success", "File uploaded");
      props.method()
      setApplied(true)
    }
    setLoading(false);
  };

  return (
    <Wrapper className="pad">
      {props.eligibility === "no-data" ? (
        applied ? (
          <div className="full-width center-text">
            <div className='big-space' />
            <Result
              status="warning"
              title="Your application is pending"
              subTitle="Please communicate with your team leader for approving your work from home."
            />
          </div>
        ) : (
          <>
            <div className="vertical-pad" />
            <div className="center-text">
              <Typography.Paragraph strong>
                To activate this feature please upload your worksation photo.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Example of home workstation could similar to this on the left
                side.
              </Typography.Paragraph>
              <div className="pad" />
              <Row gutter={12}>
                <Col className="right-text" span={12}>
                  <img
                    className="sample-desk-img"
                    src={sample}
                    alt="sample desk"
                  />
                </Col>
                <Col className="file-upload" span={12}>
                  <input
                    type="file"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file.type.split("/")[0] === "image") {
                        if (file.size <= 2000000) {
                          let reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onload = async e => {
                            setImageUrl(e.target.result);
                            setFile(file);
                          };
                        } else {
                          alertPop(
                            "error",
                            "File size should be less than 2MB."
                          );
                        }
                      } else {
                        alertPop("error", "Invalid format");
                      }
                      return;
                    }}
                  />
                  {imageUrl ? (
                    <img src={imageUrl} />
                  ) : (
                    <div className="upload-graphic">
                      <img src={add} />
                      <div className="pad">
                        <Typography.Text className="FIX_th">
                          Select an image
                        </Typography.Text>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
              <div className="pad" />
              <Button
                disabled={!file}
                loading={loading}
                type="primary"
                size="large"
                style={{ width: "20rem" }}
                onClick={fileUpload}
              >
                Upload
              </Button>
            </div>
          </>
        )
      ) : (
        <div className="full-width center-text">
          <div className='big-space' />
          <Result
            status="warning"
            title="Your application is pending"
            subTitle="Please communicate with your team leader for approving your work from home."
          />
        </div>
      )}
    </Wrapper>
  );
};

export default WorkStation;
