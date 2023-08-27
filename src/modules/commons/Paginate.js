import React, { Component, Fragment } from "react";
import { Pagination, Button } from "antd";

export default class Paginate extends Component {
  render() {
    return (
      <Fragment>
        {this.props.page_info &&
        this.props.page_info.current_page &&
        this.props.page_info.count > 1 ? (
          <div className="semi-pad top-bod right-text pagination">
            <Pagination
              onChange={e => {
                this.props.paginate(e)
              }}
              current={this.props.current ? parseInt(this.props.current) : 1}
              total={this.props.page_info.count * 10}
              itemRender={(current, type, originalElement) => {
                if (type === "prev") {
                  return <Button>Prev</Button>;
                }
                if (type === "next") {
                  return <Button style={{marginLeft : '0.6rem'}}>Next</Button>;
                }
                return originalElement;
              }}
            />
          </div>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}
