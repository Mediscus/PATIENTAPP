import * as yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const number = (msg) => yup.number().required(msg).nullable();
const phoneNumber = () => yup.string().min(8).matches(phoneRegExp, "Contact number is not valid").required("Contact Number Required").nullable();
const emailVal = () => yup.string().email("Must be a valid email").max(255).required("Email is required");
const min3 = (msg) => yup.string().min(3).required(msg).nullable();
const string = (msg) => yup.string().required(msg).nullable();

// ========================= Register Doctor Schema Start ========================= // 

export const registerFormSchema = yup.object().shape({
  firstName: min3("First Name Required"),
  lastName: min3("Middle Name Required"),
  middleName: min3("Middle Name Required"),
  email: emailVal(),
  country_code: number("Country Code Required"),
  phone: phoneNumber(),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password too short")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
  conPassword: yup
    .string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    })
    .required("Password Required"),
});
export const changePassSchema = yup.object().shape({
  OldPass: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password too short")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
  NewPass: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password too short")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
  ConPass: yup
    .string()
    .when("NewPass", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("NewPass")], "Both password need to be the same"),
    })
    .required("Password Required"),
});

// ========================= Register Doctor Schema End ========================= // 

export const doctorRegistrationSchema = yup.object().shape({
  healthProfessionalType: string("Health Professional Type Required"),
});

export const addressFormSchema = yup.object().shape({
  addressType: string("Address Type Required"),
  country: string("Country Required"),
  state: string("State Required"),
  city: string("City Required"),
  zipCode: string("Zip Code Required"),
  addressLine1: string("Address Required"),
  addressLine2: string("Address Required"),
});

export const guarantorFormSchema = yup.object().shape({
  type: string("Type Required"),
  name: string("Name Required"),
  relationship: string("Relationship Required"),
  phone: string("Phone Number"),
  dialCountryCode: string("Country Code Required"),
  gender: string("Gender Required"),
  dob: string("Date Of Birth Required"),
  country: string("Country Required"),
  state: string("State Required"),
  city: string("City Required"),
  zipCode: string("Zip Code Required"),
  addressLine1: string("Address Required"),
  addressLine2: string("Address Required"),
});

export const insuranceFormSchema = yup.object().shape({
  providerName: string("Provider Name "),
  insuranceName: string("Insurance Name "),
  cardNumber: string("Card Number  "),
  insuranceNumber: string("Insurance Number"),
  IMISCode: string("IMISCode "),
  initialBalance: string("Balacne Required"),
});

export const emergencyFormSchema = yup.object().shape({
  contactType: string("Contact ype Name "),
  firstName: min3("First Name Required"),
  lastName: min3("Middle Name Required"),
  phoneNumber: string("Insurance Number"),
  dialCountryCode: string("Country Code Required"),
  relationship: string("Relationship Required"),
});

export const socialServiceformSchema = yup.object().shape({
  targetGroup: string("Target Group Name "),
  membership: min3("Membership Required"),
  hasCertificate: min3("Has Certificate Required"),
  certificateType: string("Certificate Type"),
  certificateNumber: string("Certificate Number Required"),
  incomeSource: string("Income Source Required"),
  financialStatus: string("Financial Status Required"),
});

// ========================= Encounter Page Schema Start ========================= // 

export const assesmentFormSchema = yup.object().shape({
  category: string("Category Required"),
  detail: min3("Detail Required"),
});

export const diagnosisFormSchema = yup.object().shape({
  fromDate: string("From Date Required"),
  onsetYear: string("Onset Year Required"),
  status: string("Status Required"),
  doctorRef: string("Doctor Reference Required"),
  sequence: string("Sequence Required"),
  reports: string("Reports Required"),
});

export const labPrescriptionFormSchema = yup.object().shape({
  investigation: string("Investigation Required"),
  investigationType: string("Investigation Type Required"),
  details: string("Details Required"),
  instruction: string("Instruction Required"),
});

// ========================= Encounter Page Schema End ========================= // 

// ========================= Patient Page Schema Start ========================= // 

export const basicInfoSchema = yup.object().shape({
  relationship: string("Relationship Required"),
  firstName: string("First Name Required"),
  middleName: string("Middle Name Required"),
  lastName: string("Last Name Required"),
  gender: string("Gender Required"),
  mobile: string("Mobile Number Required"),
  // landline: string("Landline Number Required"),
  dialCountryCode: string("Country Code Required"),
  email: string("Email Required"),
  UIDAINumber: string("Addhar Number Required"),
  marriedStatus: string("Married Status Required"),
  castGroup: string("Cast Group Required"),
  occupation: string("Occupation Required"),
  membership: string("Membership Required"),
  employerInfo: string("EmployerInfo Required"),
  race: string("Race Required"),
  panCardNumber: string("PanCardNumber Required"),
  ABHANumber: string("ABHANumber Required"),
  bloodGroup: string("Blood Group Required"),
});

// ========================= Patient Page Schema End ========================= // 

// ========================= Summary Page Schema Start ========================= // 

export const socialHistoryFormSchema = yup.object().shape({
  activityName: string("Activity Name Required"),
  fromDate: string("From Date Required"),
  toDate: string("To Date  Required"),
  comment: string("Comment Required"),
  status: string("Status Required"),
});

export const personalHistorySchema = yup.object().shape({
  handednessType: string("HandednessType Required"),
  education: string("Eduaction Level Required"),
  occupation: string("Occupation Required"),
  marriedStatus: string("Married Status Required"),
  diet: string("Diet Required"),
  mealPattern: string("Meal Pattern Required"),
  averageCalories: string("Average Calories Required"),
  weeklyNightShiftWork: string("Weekly Night Shift Work Required"),
  sleepType: string("Sleep Type Required"),
  averageBedTime: string("Average Bed Time Required"),
  averageWakeUpTime: string("Average Wake Up Time Required"),
  bowelFrequency: string("Bowel Frequency Required"),
  bladderFrequency: string("Bladder Frequency Required"),
});

export const familyHistoryFormSchema = yup.object().shape({
  relationship: string("Relationship Required"),
  fullName: string("Full Name Required"),
  education: string("Education Required"),
  occupation: string("Occupation Required"),
  diagnosis: string("Diagnosis Required"),
  dob: string("Date Of Birth Required"),
});

export const allergiesFormSchema = yup.object().shape({
  allergyType: string("Allergy Type Required"),
  allergyName: min3("Allergy Name Required"),
});

export const vaccinationHistoryFormSchema = yup.object().shape({
  vaccinationName: string("Vaccination Name Required"),
  againstDisease: string("Against Disease Required"),
  schedule: string("Schedule Required"),
  status: string("Status Required"),
});

export const travelHistoryFormSchema = yup.object().shape({
  source: string("Source Required"),
  destination: string("Destination Required"),
  journeyDate: string("Journey Date Required"),
});

export const hospitalizationFormSchema = yup.object().shape({
  diagnosis: string("Diagnosis Required"),
  admitDate: string("Admit Date Required"),
  onsetYear: string("On Set Year Required"),
});

export const surgeryFormschema = yup.object().shape({
  surgeryType: string("Surgery Type Required"),
  surgeryName: string("Surgery Name Required"),
  hospitalName: string("Hospital Name Required"),
  surgeryDate: string("Surgery Date  Required"),
  onsetYear: string("On Set Year Required"),
});

export const bloodTransfusionFormSchema = yup.object().shape({
  transfusionType: string("Transfusion Type Required"),
  transfusionDate: string("Transfusion Date Required"),
  bloodNumber: string("Blood Number Required"),
  hospitalName: string("Hospital Name Required"),
});

export const encounterFormSchema = yup.object().shape({
  diagnosis: string("Diagnosis Required"),
  department: string("Department Required"),
  visitType: string("Visit Type Required"),
});

export const menstrualHistoryFormSchema = yup.object().shape({
  cycle_duration: string("Cycle Duration Required"),
  period_duration: string("Period Duration Required"),
  period_date: string("Period Date Required"),
  ovulation_date: string("OvulationDate Required"),
});

// ========================= Summary Page Schema End ========================= // 


