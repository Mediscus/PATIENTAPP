import imgApi from 'dan-api/images/photos';
import avatarApi from 'dan-api/images/avatars';
const timelineData = [
  {
    id: '1',
    date: 'September, 12 2018 10:20 AM',
    time: '08:01',
    icon: 'accessible',
    user: {
      id: '1',
      name: 'Mr Kishore Lal',
      avatar: avatarApi[9],
      type: 'Patient'
    },
    data:{
      diagnosis: ['Fever', 'Cold', 'Cough'],
      comment: 'I am suffering from fever since 2 weeks, some time fever goes high near 105 with cold, body pain. I am taking Dolo 650 mg since 2 days, but did not get relief yet. Please let me know what medicine should I take.',
      reports: [
        {
          id: 1,
          name: 'Blood Report',
          date: '12/12/2018 08:01:00',
          url: '#',
          type: 'pdf'
        },
        {
          id: 1,
          name: 'Blood Report',
          date: '12/12/2018 08:01:00',
          url: '#',
          type: 'img'
        },
      ],
    }
  },
  {
    id: '2',
    date: 'September, 13 2018',
    time: '08:01',
    icon: 'add_circle',
    user: {
      id: '1',
      name: 'Dr John Doe',
      avatar: avatarApi[6],
      type: 'Doctor'
    },
    data: {
      doc_diagnosis: [
        {id:12001, name: 'Diabetes Mellitus', start_date:'28/09/2022', year: '2022', status:'Chronic'},
        {id:12001, name: 'Postural Orthostatic Tachycardia Syndrome', start_date:'28/09/2022', year: '2022', status:'Chronic'},
        {id:12001, name: 'Familial Hypercholesterolemia (heterozygote)', start_date:'28/09/2022', year: '2022', status:'Chronic'},
        {id:12001, name: 'Cerebral Palsy', start_date:'28/09/2022', year: '2022', status:'Chronic'},
      ],
      
      chief_complaints: [
        {name:'Breathlessness', data: [
              {id:100111, name: 'Having sudden shortness of breath  ___hours'},
              {id:100112, name: 'Having shortness of breath of short duration ___ Days'},
              {id:100113, name: 'Having shortness of breath of long duration ___ months', data:['Hemoptysis , and swollen legs : Present', 'Hemoptysis , and swollen legs : Present']},
          ], 
        },
        /* {name:'Hemoptysis', data: [
              {id:1001111, name: 'blood definitely coughed up from the chest?'},
              {id:1001122, name: 'A short history of streaks of blood with purulent sputum'},
              {id:1001133, name: 'A sudden episode of a small volume of blood with pleuritic pain and breathlessness'},
          ], 
        },
        {name:'Cough', data: [
              {id:10011110, name: 'Duration is of ___ days'},
              {id:10011212, name: 'Duration is of ___ months'},
              {id:10011313, name: 'it produces sputum.', data:['how much and what colour?', 'green or yellow sputum', 'Large volumes of sputum over long periods']},
              {id:10011313, name: 'it is intrusive/irresistible or whether the patient coughs deliberately to clear a perceived obstruction (throat clearing).'},
          ], 
        }, */
      ],
      initial_assessment: [
        {category_name: 'Vitals', data: [{key:'Pulse', value:'72'}, {key:'Blood Pressure', value:'70/120'}, {key: 'Respiratory Rate', value:'70/120'}, {key:'Oxygen Saturation SPO2', value:'70:120'}, {key:'Temperature', value:'100'}]},
        {category_name: 'General Examination', data: [{key:'Pulse', value:'72'}, {key:'Blood Pressure', value:'70/120'}, {key: 'Respiratory Rate', value:'70/120'}, {key:'Oxygen Saturation SPO2', value:'70:120'}, {key:'Temperature', value:'100'}]},
      ],
      medications:[{id:10000, name: 'Tab  Dolo  650 mg  1-0-1  5 Days'}, {id:10002, name: 'Cap  Lanol  650 mg  1-0-1  5 Days'}, {id:10003, name: 'Tab  Acetaminophen  650 mg  1-0-1  5 Days'}, ],
      investigations:[{id: 1000, name: 'CBC Blood test auto 500mg'}, {id: 1002, name: 'CHEST X RAY'}, , {id: 1003, name: 'URINE R/M'}],
      advice_comment:[
        {name:'Diet', data:[]},
        {name:'Exercise', data:[]},
        {name:'Comment', data:[]},
      ],
      follow_up:{next_visit:'12/12/2022', regular_visit: 'In every 25 Days', message: 'This is a testing follow up message for patient.'},
      referral:{doctor_name: 'Dr Jay Prakash',  speciality: 'General Physician', comment: 'This is extra comment for doctor and patient.', priority:'Urgent'}, 
    }
  },
  {
    id: '2',
    date: 'September, 13 2018',
    time: '08:01',
    icon: 'add_circle',
    user: {
      id: '1',
      name: 'Dr Travis Doe',
      avatar: avatarApi[8],
      type: 'RMO'
    },
    data: {
      patient_admission: ['Admit patient under perticular specialist in the ward / icu after reseving bed'], 
      patient_discharge: ['Discharge patient as advised by consultant Doctor'], 
      doctors_notes: ['RMO Charting', 'Testing doctor notes'],
      patient_complaints: ['C/O Pain inn abdomen increased as compared to morning'],
      modify_treatment_chart:[
        {id:10000, name: 'Tab  Dolo  650 mg  1-0-1  5 Days'}, 
        {id:10002, name: 'Cap  Lanol  650 mg  1-0-1  5 Days'}, 
        {id:10003, name: 'Tab  Acetaminophen  650 mg  1-0-1  5 Days'}, 
      ],
      initial_assessment: [
        {category_name: 'Vitals', data: [{key:'Pulse', value:'72'}, {key:'Blood Pressure', value:'70/120'}, {key: 'Respiratory Rate', value:'70/120'}, {key:'Oxygen Saturation SPO2', value:'70:120'}, {key:'Temperature', value:'100'}]},
      ],
      request_investigations:['C/O Pain inn abdomen increased as compared to morning'],
      request_ward_shifting:['C/O Pain inn abdomen increased as compared to morning'],
      send_investigation:[{id: 1000, name: 'CBC Blood test auto 500mg'}, {id: 1002, name: 'CHEST X RAY'}, , {id: 1003, name: 'URINE R/M'}],
      follow_patient_diet:['Breakfast (8:00-8:30AM) 4 Idli + Sambar 1/2 cup/ 1 table spoon Green chutney/ Tomato Chutney', 'Mid-Meal (11:00-11:30AM) green gram sprouts 1 cup'],
      follow_patient_activity: ['Bowel motions and comment', 'Urinary frequency and quantity'],
      add_report_manually: [
        {
          id: 1,
          name: 'Blood Report',
          date: '12/12/2018 08:01:00',
          url: '#',
          type: 'pdf'
        },
        {
          id: 1,
          name: 'Blood Report',
          date: '12/12/2018 08:01:00',
          url: '#',
          type: 'img'
        },
      ],
      procedure_notes: ["This is testing note for Dr John Doe"],
      taking_consent: ["This is testing consent of the patient"],
    }
  },
  {
    id: '3',
    date: 'September, 13 2018',
    time: '08:01',
    icon: 'hot_tub',
    user: {
      id: '1',
      name: 'Nurse Algin Joe',
      avatar: avatarApi[5],
      type: 'Nurse'
    },
    data:{
      ward_shift: ['Shifted from ward 10 bed 21 to ICU 2 bed 10'],
      patient_complaints: ['C/O Pain inn abdomen increased as compared to morning'],
      follow_treatment_chart: ['Tab  Dolo  650 mg  1-0-1  5 Days', 'Cap  Lanol  650 mg  1-0-1  5 Days'],
      send_investigation: ['Blood sample send to pathology', 'The urine sample sent to pathology'],
      initial_assessment: [
        {category_name: 'General Examination', data: [{key:'Pulse', value:'72'}, {key:'Blood Pressure', value:'70/120'}, {key: 'Respiratory Rate', value:'70/120'}, {key:'Oxygen Saturation SPO2', value:'70:120'}, {key:'Temperature', value:'100'}]},
      ],
      follow_patient_diet:['Breakfast (8:00-8:30AM) 4 Idli + Sambar 1/2 cup/ 1 table spoon Green chutney/ Tomato Chutney', 'Mid-Meal (11:00-11:30AM) green gram sprouts 1 cup'],
      follow_patient_exercise: ['High-intensity interval training (HIIT)', 'Bicycle or elliptical machine', 'Walking. Walking is one of the easiest aerobic exercises to do, and you don\'t need any equipment — just your two feet.'],
      follow_patient_activity: ['Bowel motions and comment', 'Urinary frequency and quantity'],
      reports: [
        {
          id: 1,
          name: 'Blood Report',
          date: '12/12/2018 08:01:00',
          url: '#',
          type: 'pdf'
        },
        {
          id: 1,
          name: 'Blood Report',
          date: '12/12/2018 08:01:00',
          url: '#',
          type: 'img'
        },
      ],
      nursing_chart:['time wise nursing notes'],
      taking_consent:['Taking consent'],
    }
  },
  {
    id: '4',
    date: 'September, 13 2018',
    time: '08:01',
    icon: 'translate',
    user: {
      id: '1',
      name: 'Lab Laxmi Pathology',
      avatar: avatarApi[5],
      type: 'Lab'
    },
    data: {
      sample_request: ['The Laxmi pathology center has requested blood sample', 'The Laxmi pathology center has requested urine sample'],
      reports: [
        {
          id: 1,
          name: 'Blood Report',
          date: '12/12/2018 08:01:00',
          url: '#',
          type: 'pdf'
        },
        {
          id: 1,
          name: 'Blood Report',
          date: '12/12/2018 08:01:00',
          url: '#',
          type: 'img'
        },
      ],
    }
  },
  {
    id: '3',
    date: 'September, 13 2018',
    time: '08:01',
    icon: 'hot_tub',
    user: {
      id: '1',
      name: 'Nurse Algin Joe',
      avatar: avatarApi[5],
      type: 'Nurse'
    },
    data:{ 
      follow_patient_activity: ['Bowel motions and comment', 'Urinary frequency and quantity'],
    }
  },
  {
    id: '3',
    date: 'September, 13 2018',
    time: '08:01',
    icon: 'hot_tub',
    user: {
      id: '1',
      name: 'Nurse Algin Joe',
      avatar: avatarApi[5],
      type: 'Nurse'
    },
    data:{ 
      follow_patient_diet:['Breakfast (8:00-8:30AM) 4 Idli + Sambar 1/2 cup/ 1 table spoon Green chutney/ Tomato Chutney', 'Mid-Meal (11:00-11:30AM) green gram sprouts 1 cup'],
    }
  },
  {
    id: '3',
    date: 'September, 13 2018',
    time: '08:01',
    icon: 'hot_tub',
    user: {
      id: '1',
      name: 'Nurse Algin Joe',
      avatar: avatarApi[5],
      type: 'Nurse'
    },
    data:{follow_patient_exercise: ['High-intensity interval training (HIIT)', 'Bicycle or elliptical machine', 'Walking. Walking is one of the easiest aerobic exercises to do, and you don\'t need any equipment — just your two feet.']}
  },
];

export default timelineData;