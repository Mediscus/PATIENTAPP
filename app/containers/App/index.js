import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import Application from './Application';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import ThemeWrapper from './ThemeWrapper';
import { NotFound } from '../pageListAsync';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  return (
    <ThemeWrapper>
      <Switch>
        <Route path="/" exact component={LoginDedicated} />
        <Route path="/app" component={Application} />
        <Route component={Auth} />
        <Route component={NotFound} />
      </Switch>
    </ThemeWrapper>
  );
}

export default App;
