import React from 'react'
import HealthRecordsLinking from './HealthRecordsLinking'
import HealthRecordsLinking2 from './HealthRecordsLinking2'
import HealthRecordsLinking3 from './HealtRecordsLinking3'
import HealthRecordsSharing from './HealthRecordsSharing'
// import ConsentPin from './ConsentPin'





const index = () => {

  return (
    <div>
      {/* <ConsentPin /> */}
        <HealthRecordsLinking />
        <HealthRecordsLinking2 />
        <HealthRecordsLinking3 />
        <HealthRecordsSharing />  
    </div>
  )
}

export default index