export const bedFeature = ["ICU", "Pediatric", "NICU", "POST OP"];
export const bedNumber = ["101", "102", "103", "104"];
export const patientName = ["Rakesh Kumar", "Mukesh Kumar", "Ravi Kumar"];
export const imagingType = ["ASAS", "C.T SCAN", "USG"];
export const templateName = ["NCET Scan of PNS", "CET Scan of PNS"];
export const subStore = ["Account Store", "Billing Store", "Lab Store"];
export const employeeName = ["Abc", "xyz"];
export const doctorName = ["Dr. Dristi", "Dr.Mukesh", "Dr. Abhay Singh"];
export const otAssistantName = ["Dr. Dristi", "Dr. Mukesh"];
export const labReportItem = ["Hb (Hematology)", "RBC Count (Hematology)"];
export const labTestName = ["ABG", "ACP", "ADP"];
export const componentsName = ["pH", "Speciman"];
export const race = ["Race 1", "Race 2", "Race 3"];
export const patientGuarantor = ["Self", "Other"];
export const gender = ["Male", "Female", "Other"];
export const bloodGroup = ["A+", "B+", "O+", "O-", "A-", "A+"];
export const membership = ["General (0%)", "Helpless (0%)", "Disability (0%)"];
export const ageUnit = ["Years", "Months", "Days"];
export const marriedStatus = ["Married", "Unmarried"];
export const country = ["India", "China", "United State", "Canada", "France"];
export const cityType = ["Sub Metro", "Metro", "Nagar Palika"];
export const birthState = ["Maharashtra"];
export const addressType = ["Permanent", "Temporary"];
export const leaveCategoryName = ["sick", "medical", "earned"];
export const emergencyType = ["Kin", "Emergency Contact", "Both"];
export const insuranceProvider = ["Goverment Insurance"];
export const printingType = ["Browser", "Server", "Dotmatrix"];
export const religion = ["Hindu", "Muslim", "Sikh"];
export const printers = ["Printer 1", "Printer 2"];
export const paymentMode = ["Cash", "Cheque", "Smart Card"];
export const financialStatus = ["Poor", "Ulta Poor", "Not Poor"];
export const batchNo = ["1", "2", "3", "4", "5", "6", "7"];
export const bittenOn = ["Foot", "Leg", "Finger", "Hand", "Other"];
export const bittenSnake = [
  "Krait",
  "Cobra",
  "Dhaman",
  "Viper",
  "Uncknown",
  "Other",
];

export const firstAid = [
  "Application Of Tourniquest",
  "Sucking Of Wound",
  "Other",
];

export const storName = [
  "Accounting Store",
  "Administration Store",
  "Billing Store",
  "Cabin/Deluxe/Suite Store",
  "Clinicians",
  "CT/MRI/X-RAY Store",
];


export const additionalItemName = [
  {
    id: 1,
    label: "Health Card-1",
    value: "Health Card-1",
  },
  {
    id: 2,
    label: "Health Card-2",
    value: "Health Card-2",
  },
  {
    id: 3,
    label: "Health Card-3",
    value: "Health Card-3",
  },
];

export const caseType = [
  "General",
  "Police Case",
  "OCMC",
  "Safe Mother Program",
  "Safe Children Program",
];
export const emergencyCase = [
  "General",
  "Dog Bite",
  "Snake Bite",
  "Animal Bite",
  "Emergency Labor",
  "Medico-legal",
];
export const patientCaseType = [
  "Police Case",
  "Suicide",
  "OCMC",
  "Poisoning",
  "Drugs Abuse",
  "Alcohol Abuse",
  "Accident",
  "Rape",
  "Physical Assault",
  "Cut injury",
  "Others",
];
export const incomeSource = [
  "Unskilled Labour in Agriculture or Other ",
  "Skilled Labour in Agriculture or Other ",
  "Agriculture/Farming ",
  "Private Sector/Government Sector ",
  "Foreign employment in Malaysia or UAE ",
  "Others ",
];
export const targetGroup = [
  "Poor/Ultra Poor",
  "Helpless",
  "Disability",
  "Senior Citizen",
  "Victim Of Gender Violence",
  "FCHV",
];
export const wards = [
  "General",
  "ICU",
  "Pediatric",
  "Male Ward",
  "NICU ",
  "Post OP",
  "Female Ward",
  "Suite",
  "Ward11 ",
];
export const valueLookp = [
  "Urine-Color",
  "Turbidity",
  "Urine Reaction",
  "Nil-Trace",
  "Nil-Plenty",
  "Nagative-Positive",
];
export const wardName = [
  {
    id: 1,
    wardName: "General",
    bedFeature: [
      {
        id: 1,
        name: "General",
        availableBeds: [
          {
            id: 1,
            name: "GEN:01",
          },
          {
            id: 2,
            name: "GEN:02",
          },
          {
            id: 3,
            name: "GEN:03",
          },
          {
            id: 4,
            name: "GEN:04",
          },
          {
            id: 5,
            name: "GEN:05",
          },
        ],
      },
      {
        id: 2,
        name: "Pediataric",
        availableBeds: [],
      },
    ],
  },
  {
    id: 2,
    wardName: "ICU",
    bedFeature: [
      {
        id: 1,
        name: "Cabin",
        availableBeds: [],
      },
      {
        id: 2,
        name: "ICU",
        availableBeds: [
          {
            id: 1,
            name: "ICU:01",
          },
          {
            id: 2,
            name: "ICU:02",
          },
          {
            id: 3,
            name: "ICU:03",
          },
          {
            id: 4,
            name: "ICU:04",
          },
          {
            id: 5,
            name: "ICU:05",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    wardName: "Pediataric",
    bedFeature: [
      {
        id: 1,
        name: "Pediataric",
        availableBeds: [
          {
            id: 1,
            name: "PED:01",
          },
          {
            id: 2,
            name: "PED:02",
          },
          {
            id: 3,
            name: "PED:03",
          },
          {
            id: 4,
            name: "PED:04",
          },
          {
            id: 5,
            name: "PED:05",
          },
        ],
      },
    ],
  },
];
export const departmentName = [
  "Account",
  "Billing",
  "Clinical",
  "CT/MRI",
  "Cath Lab",
];
export const caste = [
  "Dalit",
  "Mushlim",
  "Madhesi",
  "Brahmin/Chhetri",
  "Other",
];
export const diagnosisData = [
  { label: "Fever", value: "Fever" },
  { label: "Suger", value: "Suger" },
];
export const itemCategory = [
  "SURGICAL",
  "COPD",
  "GI",
  "ANTIALLERGIC",
  "NSAIDS",
  "ANTIULCER",
];
export const itemsCategory = [
  {
    label: "Capital Goods",
    value: "Capital Goods",
  },
  {
    label: "Consumables",
    value: "Consumables",
  },
];
export const requiredBefore = [
  {
    label: "1 Month",
    value: "1 Month",
  },
  {
    label: "2 Month",
    value: "2 Month",
  },
  {
    label: "3 Month",
    value: "3 Month",
  },
  {
    label: "4 Month",
    value: "4 Month",
  },
  {
    label: "5 Month",
    value: "5 Month",
  },
  {
    label: "6 Month",
    value: "6 Month",
  },
  {
    label: "7 Month",
    value: "7 Month",
  },
  {
    label: "8 Month",
    value: "8 Month",
  },
  {
    label: "9 Month",
    value: "9 Month",
  },
  {
    label: "10 Month",
    value: "10 Month",
  },
  {
    label: "11 Month",
    value: "11 Month",
  },
  {
    label: "12 Month",
    value: "12 Month",
  },
];
export const priceCategory = [
  {
    label: "Normal",
    value: "Normal",
  },
  {
    label: "EHC (PayClinic)",
    value: "EHC (PayClinic)",
  },
];
export const itemSubCategory = [
  {
    label: "Mediacal Suplies",
    value: "Mediacal Suplies",
  },
  {
    label: "Admin",
    value: "Admin",
  },
  {
    label: "Printing And Press",
    value: "Printing And Press",
  },
  {
    label: "Cleaning And Sanitary",
    value: "Cleaning And Sanitary",
  },
  {
    label: "General Supplies",
    value: "General Supplies",
  },
  {
    label: "Electrical Itmes",
    value: "Electrical Itmes",
  },
];
export const unitOfMeasurement = [
  {
    label: "Pc",
    value: "Pc",
  },
  {
    label: "Set",
    value: "Set",
  },
  {
    label: "Pcs",
    value: "Pcs",
  },
  {
    label: "Roll",
    value: "Roll",
  },
  {
    label: "Pad",
    value: "Pad",
  },
  {
    label: "Pkt",
    value: "Pkt",
  },
  {
    label: "Ream",
    value: "Ream",
  },
];
export const communityName = [
  "Card Only",
  "Gariam Bikash Bank",
  "Gift Voacher",
  "Hospital",
  "Sanchaya Kosh",
];
export const itemName = [
  "Arthscopy-Menisectomy NGN. 0",
  "XYZ-Menisectomy NGN. 0",
  "SS-Meniscal Repair NGN. 0",
];
export const subDivision = [
  "India",
  "U.S",
  "Australia",
  "Algeria",
  "Bangladesh",
];
export const birthCountry = [
  "India",
  "Australia",
  "Brazil",
  "Bangladesh",
  "U.S",
];
export const reportingItems = [
  {
    id: 1,
    reportName: "Free Service to Impoverished Citizen",
    reportCode: "RPT_FreeServiceToImpoverishedCitizen",
    reportDescription:
      "Report of radiology and lab diagnostic services provided by hospitals",
  },
  {
    id: 2,
    reportName: "Diagnostic & Other Services",
    reportCode: "RPT_DiagnosticAndOtherServices",
    reportDescription:
      "Report of 100% free services to poor/ultra poor patients",
  },
];
export const state = [
  "Madhya Pradesh",
  "Maharastra",
  "Uttar Pradesh",
  "Andhra Pradesh",
  "Haryana",
];
export const status = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];
export const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
];
export const number = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen ",
];
export const table = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
export const department = [
  "Admin",
  "Pathology",
  "Radiology",
  "Clinical",
  "Insurance",
  "Photo",
  "General",
  "Police Case",
  "OCMC",
  "Safe Mother Program",
  "Safe Children Program",
];
export const groupName = [
  "Bill Receipt",
  "Lab Sticker",
  "Registration Sticker",
];
export const genericCategory = [
  "SURGICAL",
  "COPD",
  "GI",
  "DIABETIES",
  "NSAIDS",
  "DIURETICS",
];
export const billList = [
  {
    listText: "Paid Amount",
    listAmt: "NGN. 5075",
  },
  {
    listText: "Unpaid",
    listAmt: "NGN. 0",
  },
  {
    listText: "Provisional Amount",
    listAmt: "NGN. 0",
  },
  {
    listText: "Deposit Balance",
    listAmt: "NGN. 10000",
  },
  {
    listText: "Balance Amount",
    listAmt: "NGN. 10000",
  },
  {
    listText: "Total Due",
    listAmt: "NGN. 0",
  },
  {
    listText: "Returned Amount",
    listAmt: "NGN. 0",
  },
  {
    listText: "Cancelled Amount",
    listAmt: "NGN. 0",
  },
];
export const paidBills = [
  {
    id: 1,
    date: "2020-09-08 06:00 PM",
    invoiceNo: "2077/2078-BL7435",
    department: "Hematology",
    item: "CBC(HB,PCV,RBC,WBC,TC,DC,PLT,MCV)",
    quantity: "1",
    subTotal: "500",
    discount: "0",
    tex: "0",
    totalAmount: "500",
  },
  {
    id: 2,
    date: "2020-09-08 06:00 PM",
    invoiceNo: "2077/2078-BL7435",
    department: "Hematology",
    item: "CBC(HB,PCV,RBC,WBC,TC,DC,PLT,MCV)",
    quantity: "1",
    subTotal: "500",
    discount: "0",
    tex: "0",
    totalAmount: "500",
  },
  {
    id: 3,
    date: "2020-09-08 06:00 PM",
    invoiceNo: "2077/2078-BL7435",
    department: "Hematology",
    item: "CBC(HB,PCV,RBC,WBC,TC,DC,PLT,MCV)",
    quantity: "1",
    subTotal: "500",
    discount: "0",
    tex: "0",
    totalAmount: "500",
  },
  {
    id: 4,
    date: "2020-09-08 06:00 PM",
    invoiceNo: "2077/2078-BL7435",
    department: "Hematology",
    item: "CBC(HB,PCV,RBC,WBC,TC,DC,PLT,MCV)",
    quantity: "1",
    subTotal: "500",
    discount: "0",
    tex: "0",
    totalAmount: "500",
  },
  {
    id: 5,
    date: "2020-09-08 06:00 PM",
    invoiceNo: "2077/2078-BL7435",
    department: "Hematology",
    item: "CBC(HB,PCV,RBC,WBC,TC,DC,PLT,MCV)",
    quantity: "1",
    subTotal: "500",
    discount: "0",
    tex: "0",
    totalAmount: "500",
  },
  {
    id: 6,
    date: "2020-09-08 06:00 PM",
    invoiceNo: "2077/2078-BL7435",
    department: "Hematology",
    item: "CBC(HB,PCV,RBC,WBC,TC,DC,PLT,MCV)",
    quantity: "1",
    subTotal: "500",
    discount: "0",
    tex: "0",
    totalAmount: "500",
  },
];
export const paidBillsItems = [
  {
    id: 1,
    date: "2020-09-08 06:00 PM",
    invoiceNo: "2077/2078-BL7435",
    department: "Hematology",
    item: "CBC(HB,PCV,RBC,WBC,TC,DC,PLT,MCV)",
    quantity: "1",
    subTotal: "500",
    discount: "0",
    tex: "0",
    totalAmount: "500",
  },
  {
    id: 2,
    date: "2020-09-08 06:00 PM",
    invoiceNo: "2077/2078-BL7435",
    department: "Hematology",
    item: "CBC(HB,PCV,RBC,WBC,TC,DC,PLT,MCV)",
    quantity: "1",
    subTotal: "500",
    discount: "0",
    tex: "0",
    totalAmount: "500",
  },
];
export const cancelledBillsItems = [
  {
    id: 1,
    date: "2020-09-08 06:00 PM",
    invoiceNo: "2077/2078-BL7435",
    department: "Hematology",
    item: "CBC(HB,PCV,RBC,WBC,TC,DC,PLT,MCV)",
    quantity: "1",
    subTotal: "500",
    discount: "0",
    tex: "0",
    totalAmount: "500",
  },
];
export const depositBillItems = [
  {
    id: 1,
    date: "2020-09-08 06:04 PM",
    receiptNo: "DR706",
    credit: "1000",
    debit: "",
    balance: "1000",
    referenceInvoice: "",
  },
];
export const personRelation = [
  "Grandfather",
  "Grandmother",
  "Father",
  "Father-in-law",
  "Mother",
  "Mother-in-law",
  "Husband",
  "Wife",
  "Son",
  "Son-in-law",
  "Grandson",
  "Daughter-in-law",
];
export const wardHistory = [
  {
    id: 1,
    startedOn: "2020-09-09 12:35 PM",
    endedOn: "Till now",
    wardName: "	Male Ward",
  },
  {
    id: 2,
    startedOn: "2020-09-08 06:07 PM",
    endedOn: "2020-09-09 12:35 PM",
    wardName: "	Male Ward",
  },
  {
    id: 1,
    startedOn: "2020-09-08 06:02 PM",
    endedOn: "2020-09-08 06:07 PM",
    wardName: "	Male Ward",
  },
];
export const diagnosis = [
  "Cholera due to Vibrio cholerae 01, biovar cholerae",
  "Cholera",
  "Astrovirus enteritis",
  "Astrovirus enteritis",
  "Kyasanur Forest disease",
  "Acute amebic dysentery",
  "Amebiasis",
  "Amebiasis, unspecified",
  "A00 Cholera",
  "fever A",
  "fever B",
  "A01 Cholera, Umspecified",
];
export const vendorDetail = [
  {
    id: 1,
    vendorName: "Inventory-Vendor - 1",
    contactNo: "1234567890",
    address: "Pokhara",
  },
  {
    id: 2,
    vendorName: "Inventory-Vendor - 2",
    contactNo: "21554445",
    address: "Ind",
  },
  {
    id: 3,
    vendorName: "Inventory-Vendor - 3",
    contactNo: "454444234",
    address: "Vst",
  },
  {
    id: 4,
    vendorName: "Inventory-Vendor - 4",
    contactNo: "84542121",
    address: "Asd",
  },
  {
    id: 5,
    vendorName: "Inventory-Vendor - 5",
    contactNo: "12452845",
    address: "Abc",
  },
  {
    id: 6,
    vendorName: "Inventory-Vendor - 6",
    contactNo: "214245521",
    address: "xyz",
  },
  {
    id: 7,
    vendorName: "Inventory-Vendor - 7",
    contactNo: "575455665",
    address: "Mp",
  },
  {
    id: 8,
    vendorName: "Inventory-Vendor - 8",
    contactNo: "4479435445",
    address: "Cn",
  },
  {
    id: 9,
    vendorName: "Inventory-Vendor - 9",
    contactNo: "456746543",
    address: "Ahm",
  },
  {
    id: 10,
    vendorName: "Inventory-Vendor - 10",
    contactNo: "4434647645",
    address: "Trky",
  },
  {
    id: 11,
    vendorName: "Inventory-Vendor - 11",
    contactNo: "4344643545",
    address: "Bmty",
  },
];
export const currencyCode = [
  {
    value: "NPR",
    label: "NPR",
  },
  {
    value: "INR",
    label: "INR",
  },
  {
    value: "PKR",
    label: "PKR",
  },
];
export const inventoryType = [
  {
    value: "Common",
    label: "Common",
  },
  {
    value: "Medical Inventory",
    label: "Medical Inventory",
  },
];
export const itemCompany = [
  {
    value: "Charak Hospital",
    label: "Charak Hospital",
  },
  {
    value: "AGFA FILM ",
    label: "AGFA FILM ",
  },
  {
    value: "COVIDENT ",
    label: "COVIDENT ",
  },
  {
    value: "ROMSON ",
    label: "ROMSON ",
  },
];
export const packagingType = [
  {
    value: "Roll",
    label: "Roll",
  },
  {
    value: "Box ",
    label: "Box ",
  },
  {
    value: "Ream",
    label: "Ream",
  },
  {
    value: "Bottle",
    label: "Bottle",
  },
  {
    value: "Pc",
    label: "Pc",
  },
  {
    value: "Ltr",
    label: "Ltr",
  },
  {
    value: "Kg",
    label: "Kg",
  },
  {
    value: "Pair",
    label: "Pair",
  },
  {
    value: "Jar",
    label: "Jar",
  },
  {
    value: "Pkt",
    label: "Pkt",
  },
  {
    value: "Than",
    label: "Than",
  },
];
export const labType = [
  {
    id: 1,
    value: "OP-LAB",
    label: "OP-LAB",
  },
  {
    id: 2,
    value: "ER-LAB",
    label: "ER-LAB",
  },
];
export const itemsData = [
  {
    id: 1,
    date: "2022-07-02 01:13 PM",
    assignedToDr: "Dr. Dristi",
    itemName: "XYZ-Menisectomy NGN. 0",
    quantity: "2",
    price: "1000",
    subTotal: "1000",
    discount: "0",
    totalAmount: "1000",
  },
  {
    id: 2,
    date: "2020-09-08 08:36 PM",
    assignedToDr: "Dr.Mukesh",
    itemName: "XYZ-Menisectomy NGN. 0",
    quantity: "1",
    price: "1050",
    subTotal: "1050",
    discount: "0",
    totalAmount: "1050",
  },
];
export const BankName = [
  {
    value: "ABSA (ABSA)",
    label: "ABSA (ABSA)",
  },
  {
    value: "Kenya Commercial Bank",
    label: "Kenya Commercial Bank",
  },
  {
    value: "NIC Bank (NIC)",
    label: "NIC Bank (NIC)",
  },
  {
    value: "ICICI Bank (ICICI)",
    label: "ICICI Bank (ICICI)",
  },
];
export const componentName = [
  "Blood Glucose",
  "pH/pH",
  "specimen",
  "acid fast chill",
];
export const medicines = [
  "Medicine 1",
  "Medicine 2",
  "Medicine 3",
  "Medicine 4",
  "Medicine 5",
  "Medicine 6",
  "Medicine 7",
  "Medicine 8",
];
export const supplierName = [
  "Supplier 1",
  "Supplier 2",
  "Supplier 3",
  "Supplier 4",
  "Supplier 5",
  "Supplier 6",
  "Supplier 7",
  "Supplier 8",
];

export const companyName = [
  "AAROGYA BHAWAN WORKS",
  "AFFY PARENTERALS",
  "ABBOTT",
  "AFFY PARENTERALS",
  "ALLERGAN",
  "AMANTA HEALTH CARE",
  "ARISTO",
  "AQUA VALLY SPRING",
];
export const itemType = [
  "ABDOMINAL",
  "ETOFYLLINE AND THEOPHYLLINE",
  "ALBENDAZOLE",
  "ACARBOSE ",
  "ACECLOFENAC",
  "FEXOFENADINE",
  "LEVOCARNITINE",
  "SPIRONOLACTONE",
];
export const itemUnits = [
  "ABDOMINAL",
  "ETOFYLLINE AND THEOPHYLLINE",
  "ALBENDAZOLE",
  "ACARBOSE ",
  "ACECLOFENAC",
  "FEXOFENADINE",
  "LEVOCARNITINE",
  "SPIRONOLACTONE",
];
export const ccCharge = ["0", "5.5", "6.5", "7.5", "8.5", "9.5"];
