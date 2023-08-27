import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import { configModule, hris } from "../../scripts/routes";
import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newConfigModule: {}
    };
  }

  
  componentDidMount() {
    getPermissions().then(response => {
        if (response && response.length) {
            const permNames = response.map((item) => item.name);

            console.log("permNames>>>>>>", permNames);
            configModule.items.forEach(item => {
              if (item.accordion) {
                item.accordion.forEach(acc => {
                  if (acc.name === 'Milestone type' && !permNames.includes('Can manage milestone type setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Milestone status' && !permNames.includes('Can manage milestone status setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Milestone setup' && !permNames.includes('Can manage milestone setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Payment status' && !permNames.includes('Can manage payment status')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Industry Type Setup' && !permNames.includes('Can manage industry type setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Industry Sector Setup' && !permNames.includes('Can manage industry sector setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Location Setup' && !permNames.includes('Can manage location setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Client Company Type' && !permNames.includes('Can manage company type setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Client Company Size' && !permNames.includes('Can manage company size setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Client Setup' && !permNames.includes('Can manage client Setup')) {
                    acc.notVisible = true
                  } 
                  else if ((acc.name === 'Client Bulk Upload') && !permNames.includes('Master Data Bulk Upload')) {
                    acc.notVisible = true
                  }
                  else if ((acc.name === 'Client POC Bulk Upload') && !permNames.includes('Master Data Bulk Upload')) {
                    acc.notVisible = true
                  }
                  else if ((acc.name === 'Service Bulk Upload') && !permNames.includes('Master Data Bulk Upload')) {
                    acc.notVisible = true
                  }else if (acc.name === 'Service/Product Type' && !permNames.includes('Can manage service type setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Service/Product Setup' && !permNames.includes('Can manage activity type setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Activity Type Setup' && !permNames.includes('Can manage service setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Task Priority Setup' && !permNames.includes('Can manage activity priority setup')) {
                    acc.notVisible = true
                  } else if (acc.name === 'Review Setup' && !permNames.includes('Can manage review status')) {
                  } else if (acc.name === 'Function Type' && !permNames.includes('Activity function type setup')) {
                  } else if (acc.name === 'Activity Funtion' && !permNames.includes('Activity function setup')) {
                    acc.notVisible = true
                  } 
                  //performance appraisal
                  else if (acc.name === 'PA Category' && !permNames.includes('Can manage performance appraisal category')) {
                    acc.notVisible = true
                  }
                  else if (acc.name === 'PA Sub Category' && !permNames.includes('Can manage performance appraisal sub-category')) {
                    acc.notVisible = true
                  }
                  else if (acc.name === 'PA Criteria' && !permNames.includes('Can manage performance appraisal criteria')) {
                    acc.notVisible = true
                  }
                  else if (acc.name === 'PA Sub Criteria' && !permNames.includes('Can manage performance appraisal sub-criteria')) {
                    acc.notVisible = true
                  }
                  else if (acc.name === 'Scale setup' && !permNames.includes('Can manage performance appraisal score')) {
                    acc.notVisible = true
                  }
                  else if (acc.name === 'PA Configuration List' && !permNames.includes('Can configure performance appraisal')) {
                    acc.notVisible = true
                  }
                  else if (acc.name === 'PA Configuration Create' && !permNames.includes('Can configure performance appraisal')) {
                    acc.notVisible = true
                  }
                });

                // Not visible page added in case of the first element of a sidebar does not have any permission.
                let finds = item.accordion.filter(it => it.notVisible === true);
                if (item.accordion?.length === finds?.length) item.notVisible = true;
              }

              //Full sidebar hide

              if (item.name === 'Employee Configuration' && !permNames.includes('Can Manage Employee Register')) {
                item.notVisible = true
              }
              else if (item.name === 'Bank Configuration' && !permNames.includes('Can Manage Bank Configuration')) {
                item.notVisible = true
              }
              else if (item.name === 'Team' && !permNames.includes('Can Manage Team')) {
                item.notVisible = true
              }
              else if (item.name === 'Project Management' && !permNames.includes('Can Manage Project Management')) {
                item.notVisible = true
              }
              
            });

            this.setState({newConfigModule: configModule})
        }
    })
  }


  // Main method
  render() {
    return (
      <Wrapper className="flex_r">
        {/* <Sidebar sidebar={configModule} /> */}
        {console.log("newConfigModule>>>>>>>>>>>", this.state.newConfigModule)}
        <Sidebar sidebar={this.state.newConfigModule} />
        <div style={{ width: "100%" }}>
          <Route path="/configuration" component={Panel} exact />
          <Route path="/configuration/:name" component={Panel} exact />
          <Route path="/configuration/:name/:page" component={Panel} />
        </div>
      </Wrapper>
    );
  }
}

export default connect()(Configuration);
