/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'utils/history';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import uiReducer from './modules/ui';
import patients from './modules/Patients';
import initval from './modules/initForm';
import login from './modules/login'
import register from './modules/register'
import chat from '../containers/Pages/Chat/reducers/chatReducer';
import contact from '../containers/Pages/Contact/reducers/contactReducer';
import encounters from './modules/encounters';

/*
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    login,
    ui: uiReducer,
    patients: patients,
    encounters: encounters,
    initval,
    contact,
    chat,
    register,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
