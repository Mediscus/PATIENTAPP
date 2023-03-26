import * as yup from "yup";
import {
  wards,
  bedFeature,
  bedNumber,
  patientName,
  imagingType,
  templateName,
  subStore,
  employeeName,
  doctorName,
  departmentName,
  labReportItem,
  labTestName,
  componentsName,
  race,
  patientGuarantor,
  gender,
  bloodGroup,
  membership,
  caste,
  marriedStatus,
  diagnosisData,
  itemCategory,
  communityName,
  itemName,
  subDivision,
  country,
  cityType,
  birthCountry,
  addressType,
  reportingItems,
  leaveCategoryName,
  state,
  emergencyType,
  insuranceProvider,
  department,
  vendorDetail,
  currencyCode,
} from "../../api/dummy/DropdownData";

// These Page Contains All The Schemas Of The Application
// 1. Patient Form Schemas

// These Are Some Common Schema Patters Used in Application

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const name = (msg) => yup.string().required(msg).nullable();
const numberVal = (msg) => yup.number().required(msg).nullable();
const date = (msg) => yup.date(msg).required(msg);
const contactNumberVal = () =>
  yup
    .string()
    .min(8)
    .matches(phoneRegExp, "Contact number is not valid")
    .required("Contact Number Rquired")
    .nullable();
const emailVal = () =>
  yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required");

const min3Val = (msg) => yup.string().min(3).required(msg).nullable()

/* ================== Login And Register Form Schemas ================== */

export const registerFormSchema = yup.object().shape({
  firstName: min3Val("First Name Required"),
  middleName: min3Val("Middle Name Required"),
  lastName: min3Val("Middle Name Required"),
  email: emailVal(),
  country_code: numberVal("Country Code Required"),
  phone: contactNumberVal(),
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

export const loginFormSchema = yup.object().shape({
  loginID: emailVal(),
  password: name("Password Required"),
});

/* ====================== 1. Patient Form Schemas ====================== */

export const PatientInformationFormSchema = yup.object().shape({
  firstName: name("First Name Required"),
  middleName: name("Middle Name Required"),
  lastName: name("Last Name Required"),
  gender: name("Gender is Required"),
  dob: name("Date Of Birth Required"),
  mobile: contactNumberVal("Phone Number is Required"),
  landline: contactNumberVal("Landline Number is Required"),
  email: emailVal("Invalid email").required("Required"),
  country: name("Country is Required"),
  state: name("State is Required"),
  bloodGroup: name("Blood Group is Required"),
  membership: name("Membership is Required"),
  castGroup: name("Caste is Required"),
  marriedStatus: name("Married Status Required"),
  employerInfo: name("Employer Info Required"),
  occupation: name("Occupation Required"),
  race: name("Race Required"),
  panCardNumber: name("Pan Number is Required"),
  addressLine1: name("Address is Required"),
});

export const AddressFormSchema = yup.object().shape({
  addressType: name("Address Type Required"),
  firstStreet: name("Street Required"),
  secondStreet: name("Street Required"),
  birthCountry: name("Birth Country is Required"),
  birthCity: name("Birth City is Required"),
  zipCode: name("Zip Code is Required"),
});

export const GuarantorFormSchema = yup.object().shape({
  patientGuarantor: name("Patient Guarantor Required"),
  patientName: name("Patient Name Required"),
  guarantorName: name("Guarantor Name Required"),
  guarantorRelation: name("Guarantor Relation Required"),
  gender: name("Gender Required"),
  phoneNumber: name("Phone Number is Required"),
  dob: yup.date("Data Invalid").required("Date Required"),
  firstStreet: name("First Name Required"),
  secondStreet: name("Second Name Required"),
  country: name("Country Required"),
  state: name("state Required"),
  city: name("city Required"),
  zipCode: name("Zip Code is Required"),
});

export const InsuranceFormSchema = yup.object().shape({
  insuranceProvider: name("Insurance Provider Required"),
  insuranceName: name("Insurance Name Required"),
  nstcNumber: numberVal("NSTC Number is Required"),
  nssiNumber: numberVal("NSSI Number is Required"),
  imisCode: name("IMIS Required"),
  initialBalance: numberVal("Initial Balance Required"),
});

export const EmergencyContactFormSchema = yup.object().shape({
  type: name("Type Required"),
  fName: name("First Name Required"),
  lName: name("Last Name Required"),
  phoneNumber: numberVal("Phone Number is Required"),
  relationship: name("Relationship Required"),
  comments: name("Comments Required"),
});

/* ===================================================================== */

export const SubCategorySchema = yup.object().shape({
  subCatName: name("Name is Required"),
  category: name("Category is Required"),
});

export const coaFormSchema = yup.object().shape({
  primaryGroup: name("Primary Group is Required"),
  coaName: name("COA is required"),
});

export const voucherHeadFormSchema = yup.object().shape({
  voucherHeadName: name("Voucher Head Name Required"),
});

export const voucherFormSchema = yup.object().shape({
  voucherName: name("Voucher Name Required"),
  voucherCode: name("Voucher Code Required"),
  description: name("Description Required"),
});

export const CostCenterItemFormSchema = yup.object().shape({
  costCenterItem: name("Cost Center Item Name Required"),
});

export const changeDoctorSchema = yup.object().shape({
  doctorName: name("Doctor Name Required"),
});

export const PhoneBookingFormSchema = yup.object().shape({
  fName: name("First Name Required"),
  lName: name("Last Name Required"),
  gender: name("Gender Required"),
  dob: date("Date Required"),
  contactNumber: contactNumberVal(),
  appointmentDate: date("Date Required"),
});

export const CancelFormSchema = yup.object().shape({
  remarks: name("Remarks Required"),
});

export const EditDoctorFormSchema = yup.object().shape({
  departmentName: name("Department Name Required"),
  departmentCode: name("Department Code Required"),
  parentDepartment: name("Parent Department Required"),
  departmentHead: name("Department Head Required"),
  roomNo: name("Room Number Required"),
  status: name("Status required"),
  appointmentApplicable: name("Applicable required"),
  description: name("Description required"),
  noticeText: name("Notice Text required"),
});

export const ReceiveFormSchema = yup.object().shape({
  remarks: name("Remarks Required"),
});

export const AddDepositSchema = yup.object().shape({
  amount: name("Amount Required"),
  remarks: name("Remarks Required"),
  personName: name("Person Name Required"),
  paymentMode: name("Payment Mode Required"),
  detail: name("Detail Required"),
});

export const ExternalFormSchema = yup.object().shape({
  referrerName: name("Referal Name Required"),
});

export const NewPatientFormSchema = yup.object().shape({
  fName: name("First Name Required"),
  lName: name("Last Name Required"),
  gender: name("Gender is Required"),
  ageNumber: name("Age is Required"),
  contactNumber: contactNumberVal(),
  country: name("country is Required"),
  state: name("State is Required"),
});

export const MapCompFormSchema = yup.object().shape({
  labReportItem: yup
    .string()
    .test("labReportItem", function (value) {
      if (labReportItem.includes(value)) {
        return true;
      }
      return false;
    })
    .required("OT Assistant Name is Required"),
  testName: yup
    .string()
    .test("testName", function (value) {
      if (labTestName.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Test Name Required"),
  componentName: yup
    .string()
    .test("componentName", function (value) {
      if (componentsName.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Component Name Required"),
  positiveIndicator: name("Positive Indicator Required"),
});

export const LabCategoryFormSchema = yup.object().shape({
  categoryName: name("Category Name is Required"),
});

export const LookUpFormSchema = yup.object().shape({
  moduleName: name("Module Name is Required"),
  lookupName: name("Lookup Code is Required"),
  description: name("Description Required"),
  lookUpData: yup.array().of(
    yup.object().shape({
      name: name("Name required"),
    })
  ),
});
export const VendorFormSchema = yup.object().shape({
  vendorName: name("Vendor Name is Required"),
  vendorCode: numberVal("Vendor Code is Required"),
  contactNumber: contactNumberVal(),
  email: emailVal(),
  address: name("Address Required"),
});
export const OperationTheatreFormSchema = yup.object().shape({
  patientName: name("PatientName Name Required"),
  otDate: yup.date("Data inválida").required("Data deve ser informada"),
  time: name("Time Required"),
  surgery: name("Surgery is Required"),
  procedure: name("Procedure is Required"),
  nurseName: name("Nurse Name is Required"),
  diagnosis: name("Diagnosis is Required"),
  remarks: name("Remarks is Required"),
});

export const UplodFilesFormSchema = yup.object().shape({
  department: yup
    .string()
    .test("department", function (value) {
      if (department.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Departement Name is Required"),
  title: yup.string().required("Title is Required"),
  remarks: yup.string().required("Remarks is Required"),
});
export const AccountHeadFormSchema = yup.object().shape({
  accountHead: yup.string().required("Account Head is Required"),
  description: yup.string().required("Description Required"),
  status: yup.string().required("Status is required"),
});
export const CompanyFormSchema = yup.object().shape({
  companyName: yup.string().required("Company Name is Required"),
  code: yup.string().required("Code Required"),
  address: yup.string().required("Address is required"),
  description: yup.string().required("Description is required"),
  email: yup.string().required("Email is required"),
  contactNumber: yup.number().required("Contact Number is required"),
});
export const CurrencyFormSchema = yup.object().shape({
  currencyCode: yup.string().required("CurrencyCode is Required"),
  description: yup.string().required("Description Required"),
  status: yup.string().required("Status is required"),
});
export const InvoiceHeaderFormSchema = yup.object().shape({
  hospitalName: yup.string().required("Hospital Name is Required"),
  address: yup.string().required("Address is Required"),
  contactNumber: yup.number().required("Number is Required"),
  email: yup.string().required("Email is required"),
  panNumber: yup.number().required("Pan number required"),
  dda: yup.number().required("DDA required"),
  description: yup.string().required("Description required"),
  status: yup.string().required("Status required"),
});
export const MeasurementFormSchema = yup.object().shape({
  unitOfMeasurement: yup.string().required("UnitOfMeasurement is Required"),
  description: yup.string().required("Description Required"),
  status: yup.string().required("Status is required"),
});
export const PackagingFormSchema = yup.object().shape({
  packagingType: yup.string().required("Packaging Type is Required"),
  description: yup.string().required("Description Required"),
  status: yup.string().required("Status is required"),
});
export const VendorsFormSchema = yup.object().shape({
  vendorName: yup.string().required("Vendor Name is Required"),
  contactAddress: yup.string().required("Contact Address is Required"),
  contactNumber: yup.number().required("Contact Number is Required"),
  panNo: yup.number().required("Pan Number is Required"),
  vendorCountry: yup.string().required("Vendor Country is Required"),
  currencyCode: yup.string().required("Currency Code is Required"),
  bankDetails: yup.string().required("Bank Detail is Required"),
  vendorCode: yup.number().required("Vendor Code is Required"),
  contactPerson: yup.string().required("Contact Person is Required"),
  email: yup.string().required("Email is Required"),
  creditPeriod: yup.number().required("Credit Period is Required"),
  govtRegDate: yup.date("Invalid Date").required("Data is required"),
  status: yup.string().required("Status is Required"),
});
export const ScanDoneFormSchema = yup.object().shape({
  scanedOn: yup.date("Date Required").required("Date Is Required"),
  scanedTime: yup.string().required("Scaned Time is Required"),
  remarks: yup.string().required("First Name Required"),
});
export const VaccinationPatientFormSchema = yup.object().shape({
  motherName: yup.string().required("Mother Name is Required"),
  babyName: yup.string().required("Baby Name is Required"),
  dob: yup.date("Date Of Birth").required("Date Of Birth required"),
  gender: yup.string().required("Gender Required"),
  country: yup.string().required("Country Required"),
  state: yup.string().required("State Required"),
  address: yup.string().required("Address Required"),
  regdNo: yup.number().required("Register Number Required"),
  fatherName: yup.string().required("Father Name Required"),
  contactNumber: yup.number().required("Contact Number Required"),
  caste: yup.string().required("Caste Required"),
});
export const AssignDoctorFormSchema = yup.object().shape({
  doctorName: yup.string().required("Doctor Name Required"),
});
export const AdmitFormSchema = yup.object().shape({
  departmentName: yup.string().required("Department Name is Required"),
  admittingDoctor: yup.string().required("Admitting Doctor Required"),
  bithDate: yup.date("Data Invalid").required("Data is required"),
  admissionTime: yup.string().required("Time required"),
  wardName: yup
    .string()
    .test("wards", function (value) {
      if (wards.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Ward Required"),
  bedFeature: yup
    .string()
    .test("bedFeature", function (value) {
      if (bedFeature.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Bad Feature Required"),
  bedNumber: yup
    .string()
    .test("bedNumber", function (value) {
      if (bedNumber.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Bad Number Required"),
  admissionNotes: yup.string().required("Admission Notes Required"),
});
export const TransferPatientSchema = yup.object().shape({
  remarks: yup.string().required("Remarks Required"),
});
export const UploadConsentSchema = yup.object().shape({
  remarks: yup.string().required("Remarks Required"),
});
export const updateBalanceFormSchema = yup.object().shape({
  newBalance: yup.string().required("New Balance Required"),
  remarks: yup.string().required("Remarks Required"),
});
export const birthFormSchema = yup.object().shape({
  certificateNumber: yup.string().required("Cerificate Number Required"),
  birthCondition: yup.string().required("Birth Condition Required"),
  birthDate: yup.date("Data Invalid").required("Data is required"),
  birthTime: yup.string().required("Birth Time Required"),
  gender: yup.string().required("Gender Required"),
  weight: yup.number().required("Weight Required"),
  fatherName: yup.string().required("Father Name Required"),
  birthNumberType: yup.string().required("Birth Number Type Required"),
  birthType: yup.string().required("Birth Type Required"),
  issuedBy: yup.string().required("IssuedBy Required"),
  certifiedBy: yup.string().required("CertifiedBy Required"),
});
export const deathFormSchema = yup.object().shape({
  patientName: yup
    .string()
    .test("patientName", function (value) {
      if (patientName.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Patient Name Required"),
  certificateNumber: yup.string().required("Birth Condition Required"),
  deathDate: yup.date("Data Invalid").required("Data is required"),
  deathTime: yup.string().required("Birth Time Required"),
});
export const departmentFormSchema = yup.object().shape({
  departmentName: yup.string().required("Department Name Required"),
  departmentCode: yup.number().required("Department Code is required"),
  parentDepartmentName: yup
    .string()
    .required("Parent Department Name Required"),
  departmenHead: yup.string().required("Department Head Required"),
  roomNo: yup.string().required("Room Number Required"),
  status: yup.string().required("IsActive Required"),
  appointmentApplicable: yup
    .string()
    .required("Appointment Applicable Required"),
  description: yup.string().required("Description Required"),
  noticeText: yup.string().required("Notice Text Required"),
});
export const subStoreFormSchema = yup.object().shape({
  subStoreName: yup.string().required("SubStore Name Required"),
  subStoreCode: yup.number().required("SubStore Code is required"),
  email: yup.string().required("Email Required"),
  contactNumber: yup.number().required("Contact Number Required"),
  location: yup.string().required("Location Required"),
  subStoreDescription: yup.string().required("Sub Store Description Required"),
  subStoreLabel: yup.string().required("Sub Store Label Required"),
  verificationLevel: yup.number().required("Verification Level Required"),
});
export const imagingTypeFormSchema = yup.object().shape({
  imagingItem: yup.string().required("Imaging Item Name Required"),
  status: yup.string().required("Isactive required"),
});
export const imagingItemFormSchema = yup.object().shape({
  imagingType: yup
    .string()
    .test("imagingType", function (value) {
      if (imagingType.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Imaging Type Required"),
  templateName: yup
    .string()
    .test("templateName", function (value) {
      if (templateName.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Template Name Required"),
  imagingName: yup.string().required("Imaging Name Required"),
  status: yup.string().required("Isactive required"),
  validForReporting: yup.string().required("Valid For Reporting Required"),
});
export const templateFormSchema = yup.object().shape({
  moduleName: yup.string().required("Imaging Name Required"),
  templateName: yup.string().required("Template Name Required"),
  templateCode: yup.string().required("Template Name Required"),
  status: yup.string().required("Active required"),
  footerNotes: yup.string().required("Valid For Reporting Required"),
});
export const wardFormSchema = yup.object().shape({
  wardName: yup.string().required("Ward Name Required"),
  wardCode: yup.string().required("Ward Code Required"),
  wardLocation: yup.string().required("Ward Location Required"),
  subStore: yup
    .string()
    .test("subStore", function (value) {
      if (subStore.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Ward Required"),
  status: yup.string().required("Status Required"),
});
export const BedFeatureFormSchema = yup.object().shape({
  featureName: yup.string().required("Feature Required"),
  featureFullName: yup.string().required("Feature Full Required"),
  isTaxApplicable: yup.string().required("IsTaxApplicable Full Required"),
  status: yup.string().required("Status Required"),
  price: yup.string().required("Price Required"),
});
export const BedFormSchema = yup.object().shape({
  wardName: yup.string().required("Ward Name Required"),
  singleBedNumber: yup.number().required("Bad Number Required"),
  multiInputOne: yup.number().required("Bad Number Required"),
  multiInputTwo: yup.number().required("Bad Number Required"),
  status: yup.string().required("Status Required"),
});
export const UserFormSchema = yup.object().shape({
  employeeName: yup
    .string()
    .test("employeeName", function (value) {
      if (employeeName.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Employee Name is Required"),
  userName: yup.string().required("User Name Required"),
  email: yup.string().required("Email Required"),
  password: yup.string().required("Password Required"),
  status: yup.string().required("Status Required"),
});
export const UserRollFormSchema = yup.object().shape({
  roleName: yup.string().required("Role Name Required"),
  roleDescription: yup.string().required("Role Description Required"),
  application: yup.string().required("Role Application Required"),
  initialPage: yup.string().required("InitialPage Required"),
  rolePriority: yup.string().required("RolePriority Required"),
  status: yup.string().required("Status Required"),
});
export const ServiceDepartmentFormSchema = yup.object().shape({
  department: yup.string().required("Department Name Required"),
  serviceDepartmentName: yup
    .string()
    .required("Service Department Name Required"),
  shortNameOrCode: yup.string().required("Short Name Or Code Required"),
  integrationName: yup.string().required("Integration Name Required"),
  needParent: yup.string().required("Need Parent Required"),
  status: yup.string().required("Status Required"),
});
export const OrganizationFormSchema = yup.object().shape({
  organizationName: yup.string().required("Organization Name Required"),
  status: yup.string().required("Status Required"),
});
export const MembershipFormSchema = yup.object().shape({
  community: yup
    .string()
    .test("community", function (value) {
      if (communityName.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Community Required"),
  membershipName: yup.string().required("Membership Name Required"),
  discount: yup.number().required("Discount Required"),
  description: yup.string().required("Description Required"),
  status: yup.string().required("Status Required"),
});
export const ReportingItemFormSchema = yup.object().shape({
  reportName: yup
    .string()
    .test("community", function (value) {
      for (let i = 0; i < reportingItems.length; i++) {
        if (reportingItems[i].reportName === value) {
          return true;
        }
      }
      return false;
    })
    .required("Roporting Name Required"),
  roportingItemName: yup.string().required("Roporting Item Name Required"),
  roportingCountUnit: yup.string().required("Roporting Count Unit Required"),
  status: yup.string().required("Status Required"),
});
export const EmployeeRollFormSchema = yup.object().shape({
  role: yup.string().required("Role Required"),
  description: yup.string().required("Description Required"),
  status: yup.string().required("Status Required"),
});
export const EmployeeTypeFormSchema = yup.object().shape({
  type: yup.string().required("Type Required"),
  description: yup.string().required("Description Required"),
  status: yup.string().required("Status Required"),
});
export const MunicipalityFormSchema = yup.object().shape({
  countryName: yup
    .string()
    .test("country", function (value) {
      if (country.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Country Name Required"),
  subDivision: yup
    .string()
    .test("subDivision", function (value) {
      if (subDivision.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Sub Division Required"),
  municipalityName: yup.string().required("Municipality Name Required"),
  type: yup
    .string()
    .test("type", function (value) {
      if (cityType.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Type Required"),
});
export const CountryFormSchema = yup.object().shape({
  countryName: yup.string().required("Country Name Required"),
  countryShortName: yup.string().required("Country Short Name Required"),
  isdName: yup.string().required("ISD Name Required"),
  subDivisionType: yup.string().required("Sub Division Type Required"),
  status: yup.string().required("Status Required"),
});
export const SubDivisionFormSchema = yup.object().shape({
  countryName: yup
    .string()
    .test("country", function (value) {
      if (country.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Country Name Required"),
  subDivisionName: yup.string().required("Sub Division Name Required"),
  subDivisionCode: yup.string().required("Sub Division Code Required"),
  status: yup.string().required("Status Required"),
});
export const ReactionFormSchema = yup.object().shape({
  reactionName: yup.string().required("Reaction Name Required"),
  reactionCode: yup.string().required("Reaction Code Required"),
  status: yup.string().required("Status Required"),
});
export const ExternalRefferalFormSchema = yup.object().shape({
  referrerName: yup.string().required("Referrer Name Required"),
  address: yup.string().required("Address Required"),
  contactNumber: yup.number().required("Contact Number Required"),
  email: yup.string().required("Email Required"),
  panNumber: yup.string().required("Pan Number Required"),
  nmcNumber: yup.string().required("NMC Number Required"),
  tdsPercent: yup.number().required("TDS Percent Required"),
  incentiveApplication: yup.string().required("Incentive Application Required"),
  status: yup.string().required("Status Required"),
});
export const BankFormSchema = yup.object().shape({
  bankName: yup.string().required("Bank Name Required"),
  bankShortName: yup.string().required("Bank Short Name Required"),
  description: yup.string().required("Description Required"),
  status: yup.string().required("Status Required"),
});
export const PrinterFormSchema = yup.object().shape({
  groupName: yup.string().required("Group Name Required"),
  printerDisplayName: yup.string().required("Printer Display Name Required"),
});
export const PrintExportConfigFormSchema = yup.object().shape({
  settingName: yup.string().required("Setting Name  Required"),
  pageHeaderText: yup.string().required("Page Header Text Required"),
  moduleName: yup.string().required("Module Name Required"),
});
export const SupplierFormSchema = yup.object().shape({
  supplierName: yup.string().required("Supplier Name Required"),
  phoneNumber: yup.number().required("Contact Number Required"),
  contactAddress: yup.string().required("Contact Address Required"),
  panNo: yup.string().required("Pan Number Required"),
});
export const PharmacyCompanyFormSchema = yup.object().shape({
  companyName: yup.string().required("Company Name Required"),
});
export const CategoryFormSchema = yup.object().shape({
  categoryName: yup.string().required("Category Name Required"),
});
export const UnitOfMeasurementFormSchema = yup.object().shape({
  unitOfMeasurement: yup.string().required("Category Name Required"),
});
export const ItemTypeFormSchema = yup.object().shape({
  typeOfItem: yup.string().required("Type of Item Required"),
  category: yup
    .string()
    .test("category", function (value) {
      if (itemCategory.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Category Required"),
});
export const TaxFormSchema = yup.object().shape({
  taxName: yup.string().required("Tax Name Required"),
  taxPercentage: yup.string().required("Tax Percentage Required"),
});
export const GenericFormSchema = yup.object().shape({
  genericName: yup.string().required("Generic Name Required"),
  genericCategory: yup.string().required("Generic Category Required"),
});
export const DispensaryFormSchema = yup.object().shape({
  dispensaryName: yup.string().required("Dispensary Name Required"),
  dispensaryType: yup.string().required("Dispensary Type Required"),
});
export const RackFormSchema = yup.object().shape({
  rackName: yup.string().required("Rack Name Required"),
  location: yup.string().required("location Type Required"),
});
export const CreditOrganizationsFormSchema = yup.object().shape({
  organizationName: yup.string().required("Organization Name Required"),
});
export const InvoiceHeadersFormSchema = yup.object().shape({
  hospitalName: yup.string().required("Hospital Name Required"),
  address: yup.string().required("Address Required"),
  phoneNumber: yup.string().required("Phone Number Required"),
  email: yup.string().required("Email Required"),
  // image : yup.string().required("Logo file is required"),
});
export const ShiftsManageFormSchema = yup.object().shape({
  shiftsName: yup.string().required("Shift Name Required"),
  startTime: yup.string().required("Start Time Required"),
  endTime: yup.string().required("end time required"),
  // image : yup.string().required("Logo file is required"),
});
export const HolidayFormSchema = yup.object().shape({
  holidayName: yup.string().required("Holiday Name Required"),
  holidayDate: yup.string().required("Holiday Date Required"),
});
export const LeaveFormRuleSchema = yup.object().shape({
  categoryName: yup
    .string()
    .test("categoryName", function (value) {
      if (leaveCategoryName.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Category Name Required"),
  year: yup.string().required("Year Required"),
  days: yup.string().required("Days Required"),
  payPercent: yup.string().required("Pay Percent Required"),
});
export const LeaveCategoryFormSchema = yup.object().shape({
  leaveCat: yup.string().required("Leave Category Required"),
  leaveCatCode: yup.string().required("Leave Category Required"),
  description: yup.string().required("Description Required"),
});
export const DesignationFormSchema = yup.object().shape({
  designationName: yup.string().required("Designation Name Required"),
});
export const FiscalYearListFormSchema = yup.object().shape({
  primaryGroup: name("Primary Group Required"),
  coaName: name("COA Name Required"),
  description: name("Description Required"),
});
export const CoreCFGFormSchema = yup.object().shape({
  countryName: name("Country Name Required"),
  countryId: name("Country Id Required"),
});
export const UpdateDateFormSchema = yup.object().shape({
  newExpiryDate: name("New Expiry Date Required"),
  oldExpiryDate: name("Old Expiry Date Required"),
  newBatchNumber: name("New Batch Number Required"),
  oldBatchNumber: name("Old Batch Number Required"),
});
export const UpdatePriceFormSchema = yup.object().shape({
  newSalesPrice: numberVal("New Sales Price Required"),
  oldSalesPrice: numberVal("Old Sales Price Required"),
});
export const SaleListFormSchema = yup.object().shape({
  category: name("Category Required"),
});
export const AddAppointmentFormSchema = yup.object().shape({
  title: name("Title Required"),
  firstName: name("First Name Required"),
  middleName: name("Middle Name Required"),
  lastName: name("Last Name Required"),
  contactNumber: contactNumberVal("Mobile Number is Not Valid"),
  gender: name("Gender is Required"),
  address: name("Address is Required"),
  area: name("Area is Required"),
  city: name("City is Required"),
  state: name("State Required"),
  country: name("Country Required"),
  bloodGroup: name("Blood Group is Required"),
  marriedStatus: name("Married Status Group is Required"),
  religion: name("Religion is Required"),
  race: name("Race Required"),
});
export const FractionPercentFormSchema = yup.object().shape({
  hospitalPercent: numberVal("Hospital Percent Required"),
  doctorPercent: numberVal("Doctor Percent Required"),
});
export const EmployeeSetupFormSchema = yup.object().shape({
  doctorName: yup
    .string()
    .test((value) => {
      if (doctorName.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Doctor Name Required"),
  tdsPercent: numberVal("Tds Percent Required"),
});
export const EditFormSchema = yup.object().shape({
  itemName: name("Item Name Required"),
  assignedTo: numberVal("Assigned To Required"),
  referredBy: numberVal("Referred By Required"),
});
export const EditTdsSchema = yup.object().shape({
  tdsPercent: numberVal("Tds Percent Required"),
});
export const ItemGroupDistributionSchema = yup.object().shape({
  employeeInfo: yup.array().of(
    yup.object().shape({
      employeeName: yup
        .string()
        .test("employeeName", "Employee Name is invalid", (value) => {
          if (doctorName.includes(value)) {
            return true;
          }
          return false;
        })
        .required("Employee Name required"),
      percent: name("Percent required"),
    })
  ),
});
export const EditItemsFormSchema = yup.object().shape({
  departmentName: yup
    .string()
    .test("departmentName", "Department Name Invalid", (value) => {
      if (departmentName.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Department Name required"),
  itemName: yup
    .string()
    .test("itemName", "Item Name invalid", (value) => {
      if (itemName.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Item Name required"),
});
export const CancelAdmissionFormSchema = yup.object().shape({
  remarks: name("Remarks Required Form"),
});
export const stickerSchema = yup.object().shape({
  printer: name("Printer Required"),
});
export const transferFormSchema = yup.object().shape({
  requestingDepartment: name("Requesting Department Required"),
  secondaryDoctor: name("Secondary Doctor Required"),
  ward: name("Ward Name Required"),
  bedFeature: name("Bad Feature Required"),
  bedNumber: name("Bad Feature Required"),
  transferRemarks: name("Transfer Remarks Required"),
});
export const admitFormSchema = yup.object().shape({
  case: name("Case Required"),
  admittingDepartment: name("Admitting Department Required"),
  ward: name("Ward Required"),
  bedFeature: name("Bad Feature Required"),
  bedNumber: name("Bad Number Required"),
  billingInfo: yup.object().shape({
    membership: name("Membership Required"),
  }),
});
export const stockTransferFormSchema = yup.object().shape({
  case: name("Case Required"),
  admittingDepartment: name("Admitting Department Required"),
  ward: name("Ward Required"),
  bedFeature: name("Bad Feature Required"),
  bedNumber: name("Bad Number Required"),
  billingInfo: yup.object().shape({
    membership: name("Membership Required"),
  }),
});
export const StockRequisitionFormSchema = yup.object().shape({
  requisedStock: yup.array().of(
    yup.object().shape({
      itemName: yup
        .string()
        .test("itemName", "Item Name is invalid", (value) => {
          if (itemName.includes(value)) {
            return true;
          }
          return false;
        })
        .required("Item Name required"),
    })
  ),
});
export const socialServiceFormSchema = yup.object().shape({
  fName: name("First Name Required"),
  lName: name("Last Name Required"),
  gender: name("Gender Name Required"),
  country: name("Country Required"),
  targetGroup: name("Target Group Required"),
  membership: name("Membership Required"),
});
export const newVisitFormFormSchema = yup.object().shape({
  visitInfo: yup.object().shape({
    departmentName: name("Department Name Required"),
    doctorName: name("Doctor Name Required"),
  }),
  patientInfo: yup.object().shape({
    fName: name("First Name Required"),
    lName: name("Last Name Required"),
    gender: name("Gender Name Required"),
    country: name("Country Required"),
    membership: name("Membership Required"),
    contactNumber: name("Contact Number Required"),
    age: name("Age Rquired,"),
    address: name("Address Required"),
  }),
});
export const followUpFormFormSchema = yup.object().shape({
  visitInfo: yup.object().shape({
    departmentName: name("Department Name required"),
    doctorName: name("Doctor Name required"),
  }),
});
export const PurchaseOrderFormSchema = yup.object().shape({
  vendorName: yup
    .string()
    .test("vendorName", "Vendor Name is invalid", (value) => {
      for (let i = 0; i < vendorDetail.length; i++) {
        const vendorName = vendorDetail[i].vendorName;
        if (vendorName == value) {
          return true;
        }
        return false;
      }
    })
    .required("Vendor Name required"),
  currencyCode: yup
    .string()
    .test("currencyCode", "Currency Code is Invalid", (value) => {
      for (let i = 0; i < currencyCode.length; i++) {
        const currencyVal = currencyCode[i].value;
        if (currencyVal == value) {
          return true;
        }
        return false;
      }
    })
    .required("Currency Code required"),
});
export const AddDonationFormSchema = yup.object().shape({
  vendorName: name("Name Required"),
  billNo: name("Bill Number Required"),
  tableData: yup.array().of(
    yup.object().shape({
      quantity: yup
        .string()
        .test("quantity", "Invalid", (value) => value > 0)
        .required("Quantity Required"),
      rate: yup
        .string()
        .test("rate", "Invalid", (value) => value > 0)
        .required("Rate Required"),
    })
  ),
});
export const RequestQuotationFormFormSchema = yup.object().shape({
  subject: name("Subject Required"),
  description: name("Description Required"),
  vendorName: name("Vendor Name Required"),
  tableData: yup.array().of(
    yup.object().shape({
      itemName: name("Item Name Required"),
      quantity: yup
        .string()
        .test("quantity", "Invalid", (value) => value > 0)
        .required("Quantity Required"),
    })
  ),
});
export const ItemFormSchema = yup.object().shape({
  itemCategory: name("Item Category Required"),
  itemName: name("Item Name Required"),
  itemSubCategory: name("Item SubCategory Required"),
  jinsiAcPanNumber: name("जिन्सी खाता पाना नं Required"),
  unitOfMeasurement: name("Measurement Required"),
});
export const NewItemchema = yup.object().shape({
  tableData: yup.array().of(
    yup.object().shape({
      department: yup
        .string()
        .test("department", "Invalid Name", (value) => {
          if (departmentName.includes(value)) {
            return true;
          }
          return false;
        })
        .required("Department Name Required")
        .nullable(),
      requestedBy: yup
        .string()
        .test("requestedBy", "Invalid Name", (value) => {
          if (doctorName.includes(value)) {
            return true;
          }
          return false;
        })
        .required("Requested By Required")
        .nullable(),
      assignedTo: yup
        .string("Invalid Name")
        .test("assignedTo", "Invalid Name", (value) => {
          if (doctorName.includes(value)) {
            return true;
          }
          return false;
        })
        .required("Assigned To Required")
        .nullable(),
      price: yup
        .string()
        .test("quantity", "Invalid", (value) => value > 0)
        .required("Price Required"),
    })
  ),
});
export const EditItemchema = yup.object().shape({
  itemsData: yup.array().of(
    yup.object().shape({
      assignedTo: yup
        .string("Invalid Name")
        .test("assignedTo", "Invalid Name", (value) => {
          if (doctorName.includes(value)) {
            return true;
          }
          return false;
        })
        .required("Assigned To Required")
        .nullable(),
      quantity: yup
        .string()
        .test("quantity", "Invalid", (value) => value > 0)
        .required("Quantity Required"),
      price: yup
        .string()
        .test("quantity", "Invalid", (value) => value > 0)
        .required("Price Required"),
    })
  ),
});
export const BillingEditItemchema = yup.object().shape({
  assignedTo: yup
    .string("Invalid Name")
    .test("assignedTo", "Invalid Name", (value) => {
      if (doctorName.includes(value)) {
        return true;
      }
      return false;
    })
    .required("Assigned To Required")
    .nullable(),
  quantity: yup
    .string()
    .test("quantity", "Invalid", (value) => value > 0)
    .required("Quantity Required"),
  price: yup
    .string()
    .test("price", "Invalid", (value) => value > 0)
    .required("Price Required"),
  remarks: name("Remarks Required"),
});
export const HandoverSchema = yup.object().shape({
  bankName: name("Bank Name Required"),
  amount: yup
    .string()
    .test("amount", "Invalid Amount", (value) => value > 0)
    .required("Amount Required")
    .nullable(),
});
export const LabComponentFormSchema = yup.object().shape({
  labtestComponent: yup.array().of(
    yup.object().shape({
      companyName: name("Name Required"),
    })
  ),
});
export const specimenFormSchema = yup.object().shape({
  specimanName: name("Speciman Name is Required"),
});
export const labTestFormSchema = yup.object().shape({
  testInfo: yup.object().shape({
    testName: name("Lab Test Name Required"),
    category: name("Lab Category Required"),
    serviceDepartment: name("Service Department Required"),
  }),
});
export const ReportTemplateFormSchema = yup.object().shape({
  templateName: name("Template Name Required"),
  templateShortName: name("Template Short Name Required"),
  templateType: name("Template Type Required"),
});
export const WardBillingDetailSchema = yup.object().shape({
  employeeInfo: yup.array().of(
    yup.object().shape({
      department: name("Department Required"),
      requestedBy: name("RequesteBy Required"),
      assignedTo: name("AssignedTo Required"),
      itemName: name("Item Name Required"),
    })
  ),
});
export const RequisitionSchema = yup.object().shape({
  storeName: name("Store Name Required"),
  issueNumber: name("Issue Number Required"),
  remarks: name("Remark Required"),
  itemDetail: yup.array().of(
    yup.object().shape({
      itemName: name("Item Name Required"),
      dispatchQty: yup
        .string()
        .test("amount", "Invalid Quantity", (value) => value > 0)
        .required("Dispatched Quantity Required")
        .nullable(),
    })
  ),
});
export const PurchaseRequestSchema = yup.object().shape({
  vendorName: name("Vendor Name Required"),
  requestDate: name("Request Date Required"),
  remarks: name("Remark Required"),
  itemDetail: yup.array().of(
    yup.object().shape({
      itemName: name("Item Name Required"),
      quantity: yup
        .string()
        .test("quantity", "Invalid Quantity", (value) => value > 0)
        .required("Dispatched Quantity Required")
        .nullable(),
      supplyRequiredBefore: name("Ivailid Value"),
    })
  ),
});
export const WriteOffGoodsSchema = yup.object().shape({
  WriteOff: yup.array().of(
    yup.object().shape({
      itemName: name("Item Name Required"),
      batchNo: name("BatchNo is Required"),
      remarks: name("Remark Required"),
    })
  ),
});
export const EmergencyPatientFormSchema = yup.object().shape({
  firstName: name("First Name Required"),
  lastName: name("Last Name Required"),
  gender: name("Gender Required"),
  country: name("Country Required"),
  state: name("State Required"),
  address: name("Address Required"),
  case: name("Case Required"),
  contactNumber: name("Contact Number Required"),
  referredBy: name("Referred By Required"),
});
export const AddMedicineSchema = yup.object().shape({
  MedicineDetail: yup.array().of(
    yup.object().shape({
      medicineName: name("Medicine Name Required"),
      qty: yup
        .string()
        .test("quantity", "Invalid Quantity", (value) => value > 0)
        .required("Quantity Required"),
    })
  ),
});
export const newPatientFormSchema = yup.object().shape({
  patientInformation: yup.object().shape({
    fName: name("First Name Required"),
    lName: name("Last Name Required"),
    gender: name("Gender Name Required"),
    country: name("Country Required"),
  }),
  insuranceInformation: yup.object().shape({
    nshiNumber: name("NSHI Number Required"),
    insuranceBalanceAmt: name("Insurance Balance Required"),
    isFamilyHead: name("Family head is required"),
  }),
});
export const govNewVisitSchema = yup.object().shape({
  visitInfo: yup.object().shape({
    departmentName: name("Department Name Required"),
  }),
});
export const billingItemFormSchema = yup.object().shape({
  departmentName: name("Department Name Required"),
  itemName: name("Item Name Required"),
  price: name("Price Required"),
});
export const billingPackageFormSchema = yup.object().shape({
  packageName: name("Package Name Required"),
  description: name("Description Required"),
  itemsDatail: yup.array().of(
    yup.object().shape({
      department: name("Department Required"),
      itemName: name("Item Name is Required"),
      qty: yup
        .string()
        .test("quantity", "Invalid Quantity", (value) => value > 0)
        .required("Dispatched Quantity Required")
        .nullable(),
    })
  ),
});
export const employeeFormSchema = yup.object().shape({
  fName: name("First Name Required"),
  lName: name("Last Name Required"),
  gender: name("Gender Required"),
});
export const OrderFormSchema = yup.object().shape({
  supplierName: name("Supplier is Required"),
  Orders: yup.array().of(
    yup.object().shape({
      itemName: name("Item Name is Required"),
      quantity: yup
        .string()
        .test("quantity", "Invalid Quantity", (value) => value > 0)
        .required("Dispatched Quantity Required")
        .nullable(),
    })
  ),
});
export const AddNewGrItemSchema = yup.object().shape({
  itemName: name("Item Name is Required"),
  batchNumber: yup
    .string()
    .test("batchNumber", "Invalid Batch Number", (value) => value > 0)
    .required("Invalid Batch Number")
    .nullable(),
  expDate: name("Required"),
  itemQty: yup
    .string()
    .test("quantity", "Invalid Quantity", (value) => value > 0)
    .required("Item Quantity Required")
    .nullable(),
  rate: yup
    .string()
    .test("quantity", "Invalid Rate", (value) => value > 0)
    .required("Rate Required")
    .nullable(),
});
export const addItemFormSchema = yup.object().shape({
  salesCategory: name("Sales Category Required"),
  itemName: name("Item Name Required"),
  itemCode: name("Item Code  Required"),
  companyName: name("Company Name is Required"),
  itemType: name("Item Type Required"),
  unitOfMeasurement: name("Unit Required"),
  genericName: name("Generic Name Required"),
});
export const breakageItemFormSchema = yup.object().shape({
  remark: name("Remark Required"),
  BreakageItems: yup.array().of(
    yup.object().shape({
      itemName: name("Item  Required"),
      quantity: yup
        .string()
        .test("quantity", "Invalid Quantity", (value) => value > 0)
        .required("Quantity Required")
        .nullable(),
    })
  ),
});
export const dispensaryRequestSchema = yup.object().shape({
  dispensaryName: name("Dispensary Name Required"),
  remarks: name("Remark Required"),
  itemDetail: yup.array().of(
    yup.object().shape({
      itemName: name("Item  Required"),
      quantity: yup
        .string()
        .test("quantity", "Invalid Quantity", (value) => value > 0)
        .required("Quantity Required")
        .nullable(),
    })
  ),
});
export const addFractionFormSchema = yup.object().shape({
  itemDetail: yup.array().of(
    yup.object().shape({
      department: name("Department  Required"),
      designation: name("Designation  Required"),
    })
  ),
});
