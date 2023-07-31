const Headers = ["", "03/09/2022, 11:37:39", "04/09/2022, 11:37:39"];

const Categories = [
  {
    category_name: "Vitals",
    data: [
      { header: "Pulse" },
      { header: "Blood Pressure" },
      { header: "Respiratory Rate" },
      { header: "Oxygen Saturation SPO2" },
      { header: "Temperature" },
    ],
  },
  {
    category_name: "General Examination",
    data: [
      { header: "Height" },
      { header: "Weight" },
      { header: "Skin" },
      { header: "Nails" },
      { header: "Pallor" },
      { header: "Jaundice" },
      { header: "Cyanosis" },
      { header: "Pedal Edema" },
      { header: "Edema" },
      { header: "Lumps / Lymph nodes" },
      { header: "Facial appearance" },
      { header: "Gait" },
    ],
  },
];

const CatData = {
  Pulse: [
    {
      reading_date: "03/09/2022, 11:37:39",
      value: 72,
      detail: [
        {
          name: "Measurement",
          description: "Site of measurement",
          value: "Right Radial Artery",
        },
        {
          name: "Character",
          description: "An impression of the pulse waveform or shape",
          value: "Normal",
        },
        {
          name: "Volume",
          description: "The perceived degree of pulsation",
          value: "Increased",
        },
        {
          name: "Rhythm",
          description: "The pattern or regularity of pulses",
          value: "Sinus Arrhythmia",
        },
        {
          name: "Tension",
          description: "It corresponds to diastolic blood pressure",
          value: "Increased",
        },
      ],
    },
    {
      reading_date: "04/09/2022, 11:37:39",
      value: 70,
      detail: [
        {
          name: "Measurement",
          description: "Site of measurement",
          value: "Right Radial Artery",
        },
        {
          name: "Character",
          description: "An impression of the pulse waveform or shape",
          value: "Normal",
        },
        {
          name: "Volume",
          description: "The perceived degree of pulsation",
          value: "Increased",
        },
        {
          name: "Rhythm",
          description: "The pattern or regularity of pulses",
          value: "Sinus Arrhythmia",
        },
        {
          name: "Tension",
          description: "It corresponds to diastolic blood pressure",
          value: "Increased",
        },
      ],
    },
  ],
  "Blood Pressure": [
    {
      reading_date: "03/09/2022, 11:37:39",
      value: "70/120",
      detail: [
        {
          name: "Measurement",
          description: "Site of measurement",
          value: "Right Arm",
        },
        {
          name: "Position",
          description: "Position while measurement",
          value: "Sitting",
        },
        {
          name: "Medications",
          description: "Active medications",
          value: "Dolo - 650",
        },
      ],
    },
    {
      reading_date: "04/09/2022, 11:37:39",
      value: "70/120",
      detail: [
        {
          name: "Measurement",
          description: "Site of measurement",
          value: "Right Arm",
        },
        {
          name: "Position",
          description: "Position while measurement",
          value: "Sitting",
        },
        {
          name: "Medications",
          description: "Active medications",
          value: "Dolo - 650",
        },
      ],
    },
  ],
  "Respiratory Rate": [
    {
      reading_date: "03/09/2022, 11:37:39",
      value: "70/120",
      detail: [
        {
          name: "Position",
          description: "Position while measurement",
          value: "Sitting",
        },
        {
          name: "Pattern",
          description: "Breathing pattern",
          value: "Abdomino Thoracic",
        },
      ],
    },
    {
      reading_date: "04/09/2022, 11:37:39",
      value: "70/120",
      detail: [
        {
          name: "Position",
          description: "Position while measurement",
          value: "Propt up",
        },
        {
          name: "Pattern",
          description: "Breathing pattern",
          value: "Thoraco Abdominal",
        },
      ],
    },
  ],
  "Oxygen Saturation SPO2": [
    {
      reading_date: "03/09/2022, 11:37:39",
      value: "70/120",
      detail: [
        {
          name: "Position",
          description: "Position while measurement",
          value: "Supine",
        },
        {
          name: "Delivery",
          description: "Oxygen delivery",
          value: "Oxygen Support",
        },
      ],
    },
    {
      reading_date: "04/09/2022, 11:37:39",
      value: "70/120",
      detail: [
        {
          name: "Position",
          description: "Position while measurement",
          value: "Standing",
        },
        { name: "Delivery", description: "Oxygen delivery", value: "Room Air" },
      ],
    },
  ],
  Temperature: [
    {
      reading_date: "03/09/2022, 11:37:39",
      value: "70/120",
      detail: [
        {
          name: "Measurement",
          description: "Site of measurement",
          value: "Forehead skin",
        },
        {
          name: "Pattern",
          description: "Oxygen delivery",
          value: "Intermittent",
        },
      ],
    },
    {
      reading_date: "04/09/2022, 11:37:39",
      value: "70/120",
      detail: [
        {
          name: "Measurement",
          description: "Site of measurement",
          value: "Axillary",
        },
        {
          name: "Pattern",
          description: "Temperature Pattern",
          value: "Continuous",
        },
      ],
    },
  ],
};

const Assets = {
  Pulse: {
    Measurement: [
      "Right Radial Artery",
      "Left Radial Artery",
      "Brachial A",
      "Carotid A",
      "Femoral A",
      "Dorsalis Pedis A",
      "Popliteal A",
      "",
    ],
    Character: [
      "Normal",
      "Collapsing",
      "Slow rising",
      "Pulsus Bisferens",
      "Pulsus parvus et tardus",
      "Pulsus alternans",
      "Pulsus bigeminus",
      "Anacrotic",
      "Diacrotic",
      "Pulsus paradoxus",
    ],
    Volume: ["Normal", "Increased", "Low", ""],
    Rhythm: [
      "Regular",
      "Sinus Arhythmia",
      "Regularly Irregular",
      "Irregularly Irregular",
    ],
    Tension: ["Normal", "Increased", "Low"],
  },
  BP: {
    Measurement: [
      "Right Arm",
      "Left Arm",
      "Right Leg",
      "Left Leg",
      "Invasive Arterial",
    ],
    Position: ["Sitting", "Supine", "Propt up", "Standing"],
  },

  RRate: {
    Position: ["Sitting", "Supine", "Propt up", "Standing"],
    Pattern: [
      "Normal",
      "Abdomino Thoracic",
      "Thoraco Abdominal",
      "Cheyne Stroke's",
      "Boit's",
      "Kussmaul's",
      "Apneustic",
      "Hyperpnoea",
    ],
  },

  SPO2: {
    Position: ["Sitting", "Supine", "Propt up", "Standing"],
    Delivery: [
      "Room Air",
      "Oxygen Support",
      "Non Invasive mech.ventilation",
      "Invasive T piece Ventilation",
      "Invasive mech.ventilation",
    ],
  },

  Temperature: {
    Measurement: ["Axillary", "Oral", "Forhead skin", "Anal"],
    Pattern: ["Continuous", "Remittent", "Intermittent", "Relapsing"],
  },
};

export { Headers, Categories, CatData, Assets };
