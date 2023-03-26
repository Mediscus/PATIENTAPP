import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Templates/Dashboard";
import { ThemeContext } from "./ThemeWrapper";
import {
  DashboardPage,
  AllPatient,
  Details,
  Chat,
  Contact,
  Profile,
  ChangePassword,
  Parent,
  NotFound
} from "../pageListAsync";

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        <Route exact path="/app" component={DashboardPage} />
        <Route path="/app/all-patient">
          <Switch>
            <Route exact path="/app/all-patient" component={AllPatient} />
            <Route path="/app/all-patient/details/:patientRef" component={Details} />
          </Switch>
        </Route>
        <Route path="/app/pages/chat" component={Chat} />
        <Route path="/app/pages/contact" component={Contact} />
        <Route path="/app/pages/doctor-profile" component={Profile} />
        <Route path="/app/changePassword" component={ChangePassword} />
        <Route exact path="/app/pages" component={Parent} />
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
