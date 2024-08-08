import React from 'react';
import { getStatusFromId } from '../helperFuncs/HelperFunctions';

function DisplayStatus({ statsObj, refData }) {
  if (statsObj.status === 0) {
      return <b style={{color: 'red'}}>Dead</b>
  } else if (statsObj.status === 2) {
      return <b style={{color: 'gray'}}>Badly Injured</b>
  } else if (statsObj.status === 8) {
      return <b style={{color: 'green'}}>For Hire</b>
  } else if (statsObj.status === 7) {
      return <b style={{color: 'darkgreen'}}>Hired</b>
  } else {
      return <b style={{color: 'lightblue'}}>{getStatusFromId(statsObj.status, refData)}</b>
  }
}

export default DisplayStatus