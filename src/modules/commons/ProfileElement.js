import React, { Component, Fragment } from "react";
import { Typography, Button } from "antd";
import { slice_15 } from "../../scripts/slice";

class ProfileElement extends Component {
  render() {
    return (
        <div key={this.props.data.id}>
            <Typography.Text className="FIX_th" strong>
            {this.props.data.title}
            </Typography.Text>
            <div>
            <Typography.Text>
                {this.props.data.description || "Not found"}
            </Typography.Text>
            </div>
            {this.props.data.file ? (
            <Fragment>
                <div className="space" />
                <div>
                <Button
                    icon="download"
                    onClick={() => {
                    window.open(this.props.data.file.link, "_blank");
                    }}
                >
                    <Typography.Text className="FIX_th">
                    {slice_15(this.props.data.file.name || "Download")}
                    </Typography.Text>
                </Button>
                </div>
            </Fragment>
            ) : (
            []
            )}
        </div>
    );
  }
}

export default ProfileElement;
