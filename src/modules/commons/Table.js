import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Typography,
  Icon,
  Button,
  Col,
  Avatar,
  Tag,
  Empty,
  Popover,
  Collapse,
  Checkbox
} from "antd";
import dummy from "../../assets/dummy.jpg";
import { _slice_ } from "../../scripts/slice";

// this.props
// -----------------------------------------------------------------
// width_class : 'width-1200',
// data : {
// header_buttons : true,
// header : [
//   {
//     type : 'text',
//     name : 'contact no',
//     lg : 2
//   },{
//     type : 'icon',
//     icon_type : 'menu',
//     lg : 1
//   }
// ],
// body : [
//   {
//     buttons : true,
//     data : [
//       {
//         type : 'head',
//         lg : 2,
//         src : 'www.google.com'
//       },{
//         type : 'text'
//         lg : 2,
//         name : 'blabla'
//       }
//     ]
//   }
// ]
// }
// -----------------------------------------------------------------

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }

  render() {
    return (
      <div
        className={
          this.props.pagination
            ? "bottom-margin table-container"
            : "table-container"
        }
      >
        <div className={this.props.data.width_class || ""}>
          {this.props.data.back_header ? (
            <Row className="pad P-BG centered bottom-bod">
              <Link className="back-btn-link" to={this.props.data.back_header}>
                <Typography.Text strong className="FIX_th">
                  <Icon type="arrow-left" /> {` Back`}
                </Typography.Text>
              </Link>
            </Row>
          ) : (
            <Row
              gutter={18}
              className={`${
                this.props.data.header_buttons ? "semi-pad " : "pad "
              }${
                this.props["top-bod"] ? "top-bod " : ""
              }P-BG centered bottom-bod`}
            >
              {this.props.data && this.props.data.header
                ? this.props.data.header.map(elem => {
                    switch (elem.type) {
                      case "icon":
                        return (
                          <Col lg={elem.lg} xs={elem.lg} md={elem.lg}>
                            <Icon type={elem.icon_type} />
                          </Col>
                        );
                      case "button":
                        return (
                          <Col lg={elem.lg} xs={elem.lg} md={elem.lg}>
                            <Button
                              onClick={elem.method}
                              type={elem.btn_type}
                              ghost={elem.ghost}
                              block={elem.block}
                              disabled={elem.btn_disabled}
                            >
                              {elem.name}
                            </Button>
                          </Col>
                        );
                      case "cbs-button":
                        return (
                          <Col lg={elem.lg} xs={elem.lg} md={elem.lg}>
                            <Button
                              onClick={_ =>
                                elem.method(elem.btn_id, this.state.selected)
                              }
                              type="primary"
                              ghost
                              style={
                                this.state.selected.length > 0
                                  ? {
                                      color: elem.btn_color,
                                      borderColor: elem.btn_color
                                    }
                                  : {}
                              }
                              disabled={this.state.selected.length < 1}
                            >
                              {elem.name}
                            </Button>
                          </Col>
                        );
                      default:
                        return (
                          <Col lg={elem.lg} xs={elem.lg} md={elem.lg}>
                            <Typography.Text className="FIX_th" strong>
                              {elem.name}
                            </Typography.Text>
                          </Col>
                        );
                    }
                  })
                : ""}
            </Row>
          )}
          {this.props.data && this.props.data.body ? (
            this.props.data.body.length > 0 ? (
              this.props.data.body.map(elem => {
                if (elem.to) {
                  return (
                    <Link className="LINK" to={elem.to}>
                      <Row
                        gutter={18}
                        className={
                          elem.buttons
                            ? "semi-pad bottom-bod centered"
                            : "pad bottom-bod centered"
                        }
                      >
                        {elem.data.map(value => {
                          switch (value.type) {
                            case "icon":
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <Icon type={value.icon_type} />
                                </Col>
                              );
                            case "head":
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <Avatar
                                    size="small"
                                    src={value.src || dummy}
                                  />
                                </Col>
                              );
                            case "button":
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.md}>
                                  <Button
                                    onClick={e => {
                                      e.preventDefault();
                                      value.method(value.btn_id);
                                    }}
                                    type={value.btn_type}
                                    ghost={value.ghost}
                                    icon={value.icon}
                                    loading={value.loading}
                                    block
                                    disabled={
                                      elem.selectable &&
                                      elem.collapse.filter(val => {
                                        return this.state.selected.includes(
                                          val.id
                                        );
                                      }).length < 1
                                    }
                                  >
                                    {value.name}
                                  </Button>
                                </Col>
                              );
                            case "tag":
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <Tag color={value.color}>{value.name}</Tag>
                                </Col>
                              );
                            case "head-array": //fallback
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <div className="flex_r">
                                    {value.src.slice(0, 2).map(head => {
                                      return (
                                        <div id={head.id} className="right-pad">
                                          <Popover content={head.name}>
                                            <Avatar
                                              size="medium"
                                              src={head.profile_pic || dummy}
                                            />
                                          </Popover>
                                        </div>
                                      );
                                    })}
                                    {value.src.length > 2 ? (
                                      <Popover
                                        trigger="click"
                                        style={{ position: "relative" }}
                                        placement="left"
                                        content={
                                          <div>
                                            {value.src.map(head => {
                                              return (
                                                <div key={head.id}>
                                                  <Avatar
                                                    size="medium"
                                                    src={
                                                      head.profile_pic || dummy
                                                    }
                                                  />
                                                  <Typography.Text className="left-pad">
                                                    {head.name}
                                                  </Typography.Text>
                                                  <div className="half-pad" />
                                                </div>
                                              );
                                            })}
                                          </div>
                                        }
                                      >
                                        <Button type="link">
                                          {`+ ${value.src.length - 2} more`}
                                        </Button>
                                      </Popover>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </Col>
                              );
                            case "popover":
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <Popover
                                    trigger="click"
                                    content={
                                      value.popover ? (
                                        value.popover.map(rows => {
                                          return (
                                            <Row className="P-BG">
                                              {rows.data.map(pops => {
                                                switch (pops.type) {
                                                  case "head":
                                                    return (
                                                      <Col
                                                        lg={pops.lg}
                                                        xs={pops.lg}
                                                        md={pops.lg}
                                                        className="half-pad right-pad"
                                                      >
                                                        <Avatar
                                                          src={pops.src}
                                                        />
                                                      </Col>
                                                    );
                                                  case "text":
                                                    return (
                                                      <Col
                                                        lg={pops.lg}
                                                        xs={pops.lg}
                                                        md={pops.lg}
                                                        className="half-pad"
                                                      >
                                                        <Typography.Text>
                                                          {pops.name}
                                                        </Typography.Text>
                                                        <div>
                                                          <Tag
                                                            color={pops.color}
                                                          >
                                                            {pops.tag}
                                                          </Tag>
                                                        </div>
                                                      </Col>
                                                    );
                                                }
                                              })}
                                            </Row>
                                          );
                                        })
                                      ) : (
                                        <Empty className="big-space" />
                                      )
                                    }
                                  >
                                    <Icon type={value.icon_type} />
                                  </Popover>
                                </Col>
                              );
                            default:
                              return (
                                <Col lg={value.lg} xs={value.xs} md={value.lg}>
                                  <Typography.Text>
                                    {_slice_(value.name, 200)}
                                  </Typography.Text>
                                </Col>
                              );
                          }
                        })}
                      </Row>
                    </Link>
                  );
                } else if (elem.collapse) {
                  return (
                    <Collapse
                      style={{
                        backgroundColor: "transparent",
                        border: "0",
                        padding: "0"
                      }}
                      expandIcon={({ isActive }) => (
                        <Col
                          style={{ display: "flex", alignItems: "center" }}
                          lg={1}
                        >
                          <Icon
                            style={{ fontSize: "12pt", color: "#0084E5" }}
                            type={isActive ? "minus-square" : "plus-square"}
                          />
                        </Col>
                      )}
                    >
                      <Collapse.Panel
                        showArrow={true}
                        style={{ borderRadius: "0" }}
                        header={
                          <Row
                            gutter={18}
                            className={
                              elem.buttons
                                ? "semi-pad bottom-bod centered"
                                : "pad bottom-bod centered"
                            }
                          >
                            {elem.selectable ? ( // this.state.current_type === 3 ?// only for organization CBS
                              <Col lg={{ span: 1, offset: 1 }}>
                                <Checkbox
                                  onChange={e => {
                                    e.target.checked
                                      ? this.setState({
                                          selected: [
                                            ...this.state.selected,
                                            ...elem.collapse.map(item => {
                                              return item.id;
                                            })
                                          ]
                                        })
                                      : this.setState({
                                          selected: this.state.selected.filter(
                                            value => {
                                              return !elem.collapse
                                                .map(item => {
                                                  return item.id;
                                                })
                                                .includes(value);
                                            }
                                          )
                                        });
                                  }}
                                  onClick={event => {
                                    event.stopPropagation();
                                  }}
                                  checked={
                                    this.state.selected.toString().indexOf(
                                      elem.collapse
                                        .map(item => {
                                          return item.id;
                                        })
                                        .toString()
                                    ) > -1
                                  }
                                />
                              </Col>
                            ) : (
                              ""
                            )}
                            {elem.data.map(value => {
                              switch (value.type) {
                                case "icon":
                                  return (
                                    <Col
                                      lg={value.lg}
                                      xs={value.lg}
                                      md={value.lg}
                                    >
                                      <Icon type={value.icon_type} />
                                    </Col>
                                  );
                                case "head":
                                  return (
                                    <Col
                                      lg={value.lg}
                                      xs={value.lg}
                                      md={value.lg}
                                    >
                                      <Avatar
                                        size="small"
                                        src={value.src || dummy}
                                      />
                                    </Col>
                                  );
                                case "button":
                                  return (
                                    <Col
                                      lg={value.lg}
                                      xs={value.lg}
                                      md={value.md}
                                    >
                                      <Button
                                        onClick={e => {
                                          e.stopPropagation();
                                          let cbs_list = elem.collapse.map(
                                            cbs => {
                                              return cbs.id;
                                            }
                                          );
                                          if (elem.selectable) {
                                            value.method(
                                              value.btn_id,
                                              cbs_list.filter(cbs =>
                                                this.state.selected.includes(
                                                  cbs
                                                )
                                              )
                                            );
                                          } else {
                                            value.method(
                                              value.btn_id,
                                              cbs_list
                                            );
                                          }
                                        }}
                                        type="primary"
                                        ghost
                                        style={
                                          elem.collapse.filter(val => {
                                            return this.state.selected.includes(
                                              val.id
                                            );
                                          }).length < 1
                                            ? {}
                                            : {
                                                color: value.btn_color,
                                                borderColor: value.btn_color
                                              }
                                        }
                                        disabled={
                                          elem.selectable &&
                                          elem.collapse.filter(val => {
                                            return this.state.selected.includes(
                                              val.id
                                            );
                                          }).length < 1
                                        }
                                      >
                                        {value.name}
                                      </Button>
                                    </Col>
                                  );
                                case "tag":
                                  return (
                                    <Col
                                      lg={value.lg}
                                      xs={value.lg}
                                      md={value.lg}
                                    >
                                      <Tag color={value.color}>
                                        {value.name}
                                      </Tag>
                                    </Col>
                                  );
                                case "popover":
                                  return (
                                    <Col
                                      lg={value.lg}
                                      xs={value.lg}
                                      md={value.lg}
                                    >
                                      <Popover
                                        trigger="click"
                                        content={
                                          value.popover ? (
                                            value.popover.map(rows => {
                                              return (
                                                <Row className="P-BG">
                                                  {rows.data.map(pops => {
                                                    switch (pops.type) {
                                                      case "head":
                                                        return (
                                                          <Col
                                                            lg={pops.lg}
                                                            xs={pops.lg}
                                                            md={pops.lg}
                                                            className="half-pad right-pad"
                                                          >
                                                            <Avatar
                                                              src={pops.src}
                                                            />
                                                          </Col>
                                                        );
                                                      case "text":
                                                        return (
                                                          <Col
                                                            lg={pops.lg}
                                                            xs={pops.lg}
                                                            md={pops.lg}
                                                            className="half-pad"
                                                          >
                                                            <Typography.Text>
                                                              {pops.name}
                                                            </Typography.Text>
                                                            <div>
                                                              <Tag
                                                                color={
                                                                  pops.color
                                                                }
                                                              >
                                                                {pops.tag}
                                                              </Tag>
                                                            </div>
                                                          </Col>
                                                        );
                                                    }
                                                  })}
                                                </Row>
                                              );
                                            })
                                          ) : (
                                            <Empty className="big-space" />
                                          )
                                        }
                                      >
                                        <Icon type={value.icon_type} />
                                      </Popover>
                                    </Col>
                                  );
                                default:
                                  return (
                                    <Col
                                      lg={value.lg}
                                      xs={value.xs}
                                      md={value.lg}
                                    >
                                      <Typography.Text>
                                        {_slice_(value.name, 200)}
                                      </Typography.Text>
                                    </Col>
                                  );
                              }
                            })}
                          </Row>
                        }
                      >
                        {elem.collapse.map(item => {
                          return (
                            <div className="table-collapse">
                              <Link to={item.to}>
                                <Row
                                  gutter={18}
                                  className={
                                    item.buttons
                                      ? "semi-pad bottom-bod centered"
                                      : "pad bottom-bod centered"
                                  }
                                >
                                  {item.selectable ? ( // this.state.;current_type === 3 ?// only for organization CBS
                                    <Col lg={{ offset: 2, span: 1 }}>
                                      <Checkbox
                                        onClick={e => {
                                          e.preventDefault();
                                        }}
                                        onChange={e => {
                                          e.stopPropagation();
                                          e.target.checked
                                            ? this.setState({
                                                selected: [
                                                  ...this.state.selected,
                                                  item.id
                                                ]
                                              })
                                            : this.setState({
                                                selected: this.state.selected.filter(
                                                  value => {
                                                    return value !== item.id;
                                                  }
                                                )
                                              });
                                        }}
                                        checked={this.state.selected.includes(
                                          item.id
                                        )}
                                      />
                                    </Col>
                                  ) : (
                                    ""
                                  )}
                                  {item.data.map(cbs => {
                                    switch (cbs.type) {
                                      case "icon":
                                        return (
                                          <Col
                                            lg={cbs.lg}
                                            xs={cbs.lg}
                                            md={cbs.lg}
                                          >
                                            <Icon type={cbs.icon_type} />
                                          </Col>
                                        );
                                      case "head":
                                        return (
                                          <Col
                                            lg={cbs.lg}
                                            xs={cbs.lg}
                                            md={cbs.lg}
                                          >
                                            <Avatar
                                              size="small"
                                              src={cbs.src || dummy}
                                            />
                                          </Col>
                                        );
                                      case "button":
                                        return (
                                          <Col
                                            lg={cbs.lg}
                                            xs={cbs.lg}
                                            md={cbs.md}
                                          >
                                            <Button
                                              onClick={e => {
                                                e.preventDefault();
                                                this.setState(
                                                  {
                                                    selected: [item.id]
                                                  },
                                                  () => {
                                                    cbs.method(
                                                      cbs.btn_id,
                                                      this.state.selected
                                                    );
                                                  }
                                                );
                                              }}
                                              type="primary"
                                              ghost
                                              style={{
                                                color: cbs.btn_color,
                                                borderColor: cbs.btn_color
                                              }}
                                            >
                                              {cbs.name}
                                            </Button>
                                          </Col>
                                        );
                                      case "tag":
                                        return (
                                          <Col
                                            lg={cbs.lg}
                                            xs={cbs.lg}
                                            md={cbs.lg}
                                          >
                                            <Tag color={cbs.color}>
                                              {cbs.name}
                                            </Tag>
                                          </Col>
                                        );
                                      case "popover":
                                        return (
                                          <Col
                                            lg={cbs.lg}
                                            xs={cbs.lg}
                                            md={cbs.lg}
                                          >
                                            <Popover
                                              trigger="click"
                                              content={
                                                cbs.popover ? (
                                                  cbs.popover.map(rows => {
                                                    return (
                                                      <Row className="P-BG">
                                                        {rows.data.map(pops => {
                                                          switch (pops.type) {
                                                            case "head":
                                                              return (
                                                                <Col
                                                                  lg={pops.lg}
                                                                  xs={pops.lg}
                                                                  md={pops.lg}
                                                                  className="half-pad right-pad"
                                                                >
                                                                  <Avatar
                                                                    src={
                                                                      pops.src
                                                                    }
                                                                  />
                                                                </Col>
                                                              );
                                                            case "text":
                                                              return (
                                                                <Col
                                                                  lg={pops.lg}
                                                                  xs={pops.lg}
                                                                  md={pops.lg}
                                                                  className="half-pad"
                                                                >
                                                                  <Typography.Text>
                                                                    {_slice_(
                                                                      pops.name,
                                                                      200
                                                                    )}
                                                                  </Typography.Text>
                                                                  <div>
                                                                    <Tag
                                                                      color={
                                                                        pops.color
                                                                      }
                                                                    >
                                                                      {pops.tag}
                                                                    </Tag>
                                                                  </div>
                                                                </Col>
                                                              );
                                                          }
                                                        })}
                                                      </Row>
                                                    );
                                                  })
                                                ) : (
                                                  <Empty className="big-space" />
                                                )
                                              }
                                            >
                                              <Icon type={cbs.icon_type} />
                                            </Popover>
                                          </Col>
                                        );
                                      default:
                                        return (
                                          <Col
                                            lg={cbs.lg}
                                            xs={cbs.xs}
                                            md={cbs.lg}
                                          >
                                            <Typography.Text>
                                              {_slice_(cbs.name, 200)}
                                            </Typography.Text>
                                          </Col>
                                        );
                                    }
                                  })}
                                </Row>
                              </Link>
                            </div>
                          );
                        })}
                        {/* {elem.collapse.length >= 5 ? (
                          // <Link className='LINK' to={`/cbs/user-cbs/${elem.emp_id}`}>
                          <Button
                            style={{ width: "100%", textAlign: "center" }}
                            type="link"
                            onClick={() => {
                              this.setState({
                                show_all: elem.emp_id
                              });
                            }}
                          >
                            Show {elem.collapse.length - 4} more
                          </Button>
                        ) : (
                          // </Link>
                          ""
                        )} */}
                      </Collapse.Panel>
                    </Collapse>
                  );
                } else {
                  return (
                    <Fragment>
                      <Row
                        gutter={18}
                        className={
                          elem.buttons
                            ? "semi-pad bottom-bod centered"
                            : "pad bottom-bod centered"
                        }
                      >
                        {elem.data.map(value => {
                          switch (value.type) {
                            case "icon":
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <Icon type={value.icon_type} />
                                </Col>
                              );
                            case "head":
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <Avatar
                                    size={value.size || "small"}
                                    src={value.src || dummy}
                                  />
                                </Col>
                              );
                            case "head-array": //fallback
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <div className="flex_r">
                                    {value.src.slice(0, 2).map(head => {
                                      return (
                                        <div id={head.id} className="right-pad">
                                          <Popover content={head.name}>
                                            <Avatar
                                              size="medium"
                                              src={head.profile_pic || dummy}
                                            />
                                          </Popover>
                                        </div>
                                      );
                                    })}
                                    {value.src.length > 2 ? (
                                      <Popover
                                        trigger="click"
                                        style={{ position: "relative" }}
                                        placement="left"
                                        content={
                                          <div>
                                            {value.src.map(head => {
                                              return (
                                                <div key={head.id}>
                                                  <Avatar
                                                    size="medium"
                                                    src={
                                                      head.profile_pic || dummy
                                                    }
                                                  />
                                                  <Typography.Text className="left-pad">
                                                    {head.name}
                                                  </Typography.Text>
                                                  <div className="half-pad" />
                                                </div>
                                              );
                                            })}
                                          </div>
                                        }
                                      >
                                        <Button type="link">
                                          {`+ ${value.src.length - 2} more`}
                                        </Button>
                                      </Popover>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </Col>
                              );
                            case "button":
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <Button
                                    onClick={
                                      value.btn_id
                                        ? _ => value.method(value.btn_id)
                                        : ""
                                    }
                                    type={value.btn_type}
                                    ghost={value.ghost}
                                    icon={value.icon}
                                    block={value.block}
                                    disabled={value.btn_disabled}
                                  >
                                    {value.name}
                                  </Button>
                                </Col>
                              );
                            case "style-btn": //used in work from home subordinates
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <Link to={value.to}>
                                    <Button type='primary'>{value.name}</Button>
                                  </Link>
                                </Col>
                              );
                            case "button-group":
                              return (
                                <Col
                                  key={new Date()}
                                  lg={value.lg}
                                  xs={value.lg}
                                  md={value.lg}
                                  className="right-text"
                                >
                                  <Button.Group>
                                    {value.buttons.map(button_g => {
                                      return (
                                        <Button
                                          onClick={_ =>
                                            button_g.method(button_g.btn_id)
                                          }
                                          key={button_g.id}
                                          type={button_g.btn_type}
                                          disabled={button_g.btn_disabled}
                                          icon={button_g.icon}
                                        >
                                          {button_g.name}
                                        </Button>
                                      );
                                    })}
                                  </Button.Group>
                                </Col>
                              );
                            case "tag":
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <Tag color={value.color}>{value.name}</Tag>
                                </Col>
                              );
                            case "popover":
                              return (
                                <Col lg={value.lg} xs={value.lg} md={value.lg}>
                                  <Popover
                                    trigger="click"
                                    content={
                                      value.popover ? (
                                        value.popover.map(rows => {
                                          return (
                                            <Row className="P-BG">
                                              {rows.data.map(pops => {
                                                switch (pops.type) {
                                                  case "head":
                                                    return (
                                                      <Col
                                                        lg={pops.lg}
                                                        xs={pops.lg}
                                                        md={pops.lg}
                                                        className="half-pad right-pad"
                                                      >
                                                        <Avatar
                                                          src={pops.src}
                                                        />
                                                      </Col>
                                                    );
                                                  case "text":
                                                    return (
                                                      <Col
                                                        lg={pops.lg}
                                                        xs={pops.lg}
                                                        md={pops.lg}
                                                        className="half-pad"
                                                      >
                                                        <Typography.Text>
                                                          {pops.name}
                                                        </Typography.Text>
                                                        <div>
                                                          <Tag
                                                            color={pops.color}
                                                          >
                                                            {pops.tag}
                                                          </Tag>
                                                        </div>
                                                      </Col>
                                                    );
                                                }
                                              })}
                                            </Row>
                                          );
                                        })
                                      ) : (
                                        <Empty className="big-space" />
                                      )
                                    }
                                  >
                                    <Icon type={value.icon_type} />
                                  </Popover>
                                </Col>
                              );
                            default:
                              return (
                                <Col lg={value.lg} xs={value.xs} md={value.lg}>
                                  <Typography.Text>
                                    {_slice_(value.name, 200)}
                                  </Typography.Text>
                                </Col>
                              );
                          }
                        })}
                      </Row>
                    </Fragment>
                  );
                }
              })
            ) : (
              <Fragment>
                <div className="big-space" />
                <Empty className="big-space" />
              </Fragment>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Table;
