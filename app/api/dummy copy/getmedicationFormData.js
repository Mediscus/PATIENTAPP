export const Form = [
  {
    label: "Tablet",
    value: "Tab",
  },
  {
    label: "Capsule",
    value: "Cap",
  },
  {
    label: "Syrup",
    value: "Syp",
  },
  {
    label: "Powder",
    value: "Pwdr",
  },
  {
    label: "Injection",
    value: "Inj",
  },
  {
    label: "Respule",
    value: "Resp",
  },
  {
    label: "Patch",
    value: "Patch",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export const Route = [
  {
    label: "Oral",
    value: "Oral",
  },
  {
    label: "Nasal",
    value: "Nasal",
  },
  {
    label: "Eyes Left",
    value: "Eyes Left",
  },
  {
    label: "Eyes Right",
    value: "Eyes Right",
  },
  {
    label: "Eyes Both",
    value: "Eyes Both",
  },
  {
    label: "Ears Left",
    value: "Ears Left",
  },
  {
    label: "Ears Right",
    value: "Ears Right",
  },
  {
    label: "Ears Both",
    value: "Ears Both",
  },
  {
    label: "Sublingual",
    value: "Sublingual",
  },
  {
    label: "Gargle",
    value: "Gargle",
  },
  {
    label: "IntraVenous",
    value: "IntraVenous",
  },
  {
    label: "Through RT",
    value: "Through RT",
  },
  {
    label: "Rectal",
    value: "Rectal",
  },
  {
    label: "Local apllicable",
    value: "Local apllicable",
  },
  {
    label: "IntraMuscular",
    value: "IntraMuscular",
  },
  {
    label: "SubCutaneous",
    value: "SubCutaneous",
  },
  {
    label: "Intra Dermal",
    value: "Intra Dermal",
  },
];

export const AfterPlan = [
  {
    label: "To be stopped",
    value: "To be stopped",
  },
  {
    label: "To be decided after",
    value: "To be decided after",
  },
  {
    label: "To be continue",
    value: "To be continue",
  },
  {
    label: "To be Tapperred",
    value: "Tapperred",
  },
  {
    label: "Custom",
    value: "Custom",
  },
];

export const Medicines = [
  {
    id: 1,
    Form: "Tab",
    Generic: [
      { name: "acetaminophen1", strength: "500" },
      { name: "acetaminophen2", strength: "1000" },
    ],
    BrandName: "Cronic",
    value: "Cronic",
    Route: "Oral",
    Administration: "New",
    Frequency: "",
    Duration: "",
    After: "",
    Link: "link here",
  },
  {
    id: 2,
    Form: "Tab",
    Generic: [{ name: "Paracetamol", strength: "650" }],
    BrandName: "Dolo",
    Route: "Ears Right",
    Administration: "New",
    Frequency: "",
    Duration: "5 Days",
    After: "To be decided after",
    Link: "link here",
  },
];

export const FrequencyMedicines = [
  {
    id: 1,
    Form: "Tab",
    BrandName: "Dolo",
    Strength: "650 mg",
    Dose: "1-0-1",
    Duration: "5 Days",
  },
  {
    id: 2,
    Form: "Cap",
    BrandName: "Cronic",
    Strength: "1000 mg",
    Dose: "1-1-1",
    Duration: "7 Days",
  },
];

export const TemplateMedicines = [
  {
    id: 1,
    Category: "Fever 18",
    Medicine: [
      {
        Form: "Tab",
        BrandName: "Dolo",
        Strength: "650 mg",
        Dose: "1-0-1",
        Duration: "5 Days",
      },
      {
        Form: "Cap",
        BrandName: "Dolo",
        Strength: "650 mg",
        Dose: "1-0-1",
        Duration: "5 Days",
      },
    ],
  },
  {
    id: 2,
    Category: "Fever 50",
    Medicine: [
      {
        Form: "Tab",
        BrandName: "Dolo",
        Strength: "650 mg",
        Dose: "1-0-1",
        Duration: "10 Days",
      },
      {
        Form: "Inj",
        BrandName: "Dolo",
        Strength: "650 mg",
        Dose: "1-0-1",
        Duration: "5 Days",
      },
      {
        Form: "Cap",
        BrandName: "Dolo",
        Strength: "650 mg",
        Dose: "1-0-1",
        Duration: "10 Days",
      },
    ],
  },
];
