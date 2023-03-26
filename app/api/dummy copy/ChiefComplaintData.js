export const ChiefComplaintData = [
  {
    id: 1,
    name: "Breathlessness",
    desc: "Breathlessness (or dyspnoea) denotes the feeling of an ‘uncomfortable need to breathe’",
    item: [
      { name: "Having sudden shortness of breath  ___hours" },
      {
        name: "Having shortness of breath of short duration ___ Days",
        suggestion: [{ name: "Pulmonary edema , large PE" }],
      },
      { name: "Having shortness of breath of long duration ___ months" },
      {
        name: "Oxygen Saturation SPO2Pleuritic chest pain present",
        item: [
          {
            name: "Hemoptysis , and swollen legs : Present",
            suggestion: [{ name: "Pulmonary embolus /" }, { name: "infarct" }],
          },
        ],
      },
      { name: "Crushing central pain present" },
      {
        name: "Associated with Fever,Cough, Sputum",
        item: [
          {
            name: "Wheezing :  Present",
            suggestion: [{ name: "Asthma / COPD" }],
          },
        ],
      },
      {
        name: "Tightness feeling present",
        suggestion: [{ name: "new onset asthma" }],
      },
      { name: "H/o Atopy present", suggestion: [{ name: "Asthma / COPD" }] },
      { name: "contact with pets +", suggestion: [{ name: "Asthma / COPD" }] },
      {
        name: "H/o weight loss present",
        suggestion: [{ name: "Malignacy / TB" }],
      },
      { name: "h/o  cough present" },
      {
        name: "h/o dry cough +",
        suggestion: [{ name: "? Interstitial lung disease" }],
      },
      {
        name: "Occurs during rest / lying down / night time",
        item: [
          {
            name: "Chestpain and frothy sputum : Present",
            suggestion: [{ name: "CCF , Pulmonary edema" }],
          },
          {
            name: "Cant get enough air feeling / with spasms",
            suggestion: [{ name: "Hyperventilation" }],
          },
        ],
      },
      { name: "Smoker since ", suggestion: [{ name: "COPD / Cancer" }] },
    ],
  },
  {
    id: 2,
    name: "Hemoptysis",
    desc: "Haemoptysis means coughing up blood from the respiratory tract.",
    item: [
      {
        name: "blood definitely coughed up from the chest?",
        suggestion: [{ name: "Definite  hemoptysis" }],
      },
      {
        name: "A short history of streaks of blood with purulent sputum",
        suggestion: [{ name: "acute bronchitis" }],
      },
      {
        name: "A sudden episode of a small volume of blood with pleuritic pain and breathlessness",
        suggestion: [{ name: "pulmonary embolism" }],
      },
      {
        name: "Recurrent streaks of blood in clear sputum",
        suggestion: [{ name: "Lung cancer" }],
      },
      {
        name: "Recurrent blood streaks in purulent sputum over weeks",
        suggestion: [
          {
            name: "possible tuberculosis or cancer with infection; over years, they suggest bronchiectasis",
          },
        ],
      },
      {
        name: "Larger volumes of haemoptysis (>20 mL)",
        suggestion: [
          {
            name: "lung cancer eroding a pulmonary vessel • bronchiectasis (such as in cystic fibrosis) • cavitatory disease (such as bleeding into an aspergilloma) • pulmonary vasculitis • pulmonary arteriovenous malformation",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Cough",
    desc: "The cough reflex has evolved to dislodge foreign material and secretions from the central airways, and may be triggered by pathology at any level of the bronchial tree.",
    item: [
      { name: "Duration is of ___ days" },
      { name: "Duration is of ___ months", suggestion: [{ name: "Chronic" }] },
      {
        name: "it is intrusive/irresistible or whether the patient coughs deliberately to clear a perceived obstruction (throat clearing).",
      },
      {
        name: "it produces sputum.",
        item: [
          {
            name: "how much and what colour?",
            suggestion: [{ name: "suggests bronchial infection" }],
          },
          {
            name: "green or yellow sputum",
            suggestion: [{ name: "suggests bronchial infection" }],
          },
          {
            name: "Large volumes of sputum over long periods",
            suggestion: [{ name: "suggest bronchiectasis." }],
          },
        ],
      },
      {
        name: "Any triggers (such as during swallowing, in cold air, during exercise).",
      },
      {
        name: "H/o Smoking present",
        suggestion: [{ name: "chronic bronchitis or lung cancer" }],
      },
      {
        name: "associated with wheeze",
        suggestion: [{ name: "may signal cough-variant asthma." }],
      },
      {
        name: "Heartburn or reflux present",
        suggestion: [
          { name: "gastro-oesophageal reflux commonly triggers cough." },
        ],
      },
      {
        name: "Altered voice or swallowing",
        suggestion: [
          { name: " consider laryngeal causes" },
          { name: "hilar malignancy" },
        ],
      },
      {
        name: "‘bovine cough’ : hoarse forced expiration without the initial explosive glottal opening",
      },
      {
        name: "Duration is of ___ months",
        item: [
          {
            name: "Affects children and some adults Often present at night Associated wheeze, atopy",
            suggestion: [{ name: "Asthma – ‘cough-variant asthma’" }],
          },
          {
            name: " History of smoking and intermittent sputum",
            suggestion: [{ name: "Chronic obstructive pulmonary disease" }],
          },
          {
            name: "Recent acute-onset cough and sputum",
            suggestion: [
              {
                name: "Persisting airway reactivity following acute bronchitis",
              },
            ],
          },
        ],
      },
    ],
  },
];
