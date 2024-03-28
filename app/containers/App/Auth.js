import React from "react";
import { Switch, Route } from "react-router-dom";
import Outer from "../Templates/Outer";
import { Login, Register, ResetPassword, NotFound } from "../pageListAsync";
import LoginAccount from "../../components/Forms/helpers/LoginAccount";

function Auth() {
  return (
    <Outer>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/loginaccount" component={LoginAccount} />
        <Route path="/register" component={Register} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>
    </Outer>
  );
}

export default Auth;
