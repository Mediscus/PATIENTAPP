/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from "redux-form";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "utils/history";

import languageProviderReducer from "containers/LanguageProvider/reducer";
import uiReducer from "./modules/ui";
import patients from "./modules/Patients";
import initval from "./modules/initForm";
import login from "./modules/login";
import register from "./modules/register";
import chat from "../containers/Pages/Chat/reducers/chatReducer";
import contact from "../containers/Pages/Contact/reducers/contactReducer";
import encounters from "./modules/encounters";
import otpReducer from "./modules/otpReducer";
import AllergyReducer from "./modules/AllergyReducer";
<<<<<<< HEAD
import MedicationReducer from "./modules/MedicationReducer";
import VaccinationReducer from "./modules/VaccinationReducer";
=======
import DiagnosisReducer from "./modules/DiagnosisReducer";
>>>>>>> c72b9a7d5ecafdd9a43807b3f33c4a3708a5bf24

/*
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    login,
    otp: otpReducer,
    ui: uiReducer,
    patients: patients,
    encounters: encounters,
    initval,
    contact,
    chat,
    register,
    allergy: AllergyReducer,
<<<<<<< HEAD
    medication: MedicationReducer,
    vaccine: VaccinationReducer,
=======
    diagnosis: DiagnosisReducer,
>>>>>>> c72b9a7d5ecafdd9a43807b3f33c4a3708a5bf24
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
