import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import { Card, CardActions, CardHeader, CardContent, CardMedia } from '@mui/material';
import { useAppContext } from '../contexts/AppContext.jsx';
import { getScenarioFromId } from '../helperFuncs/HelperFunctions.js';
import { useMediaQuery } from '@mui/material';
    
function ScenarioCard({scenario, handleView, refData}) {
  const scenarioInfoObj = getScenarioFromId(scenario.scenarioId, refData)

  const showCompletionStatus = (scenario) => {
    switch (scenario.completionStatus) {
      case ('complete'):
        return <b style={{color: 'green'}}>Complete</b>
      case ('in progress'):
        return <b style={{color: 'gray'}}>In Progress</b>
      case ('incomplete'):
        return <b style={{color: 'red'}}>Incomplete</b>
      default:
        return <b style={{color: 'darkred'}}>Unknown Error</b>
    }
  }

  const showButtonChoices = (scenario) => {
    switch (scenario.completionStatus) {
      case ('complete'):
        return (
          <Box sx={{width: '100%', textAlign: 'center' }}>
            <Button onClick={() => handleView('report')}>View Report</Button>
          </Box>
        )
      case ('in progress'):
        return (
          <Box sx={{width: '100%', textAlign: 'center' }}>
            <Button onClick={() => handleView(null)}>Delete</Button>
            <Button onClick={() => handleView('battle')}>Continue</Button>
          </ Box>
        )
      case ('incomplete'):
        return (
          <Box sx={{width: '100%', textAlign: 'center' }}>
            <Button onClick={() => handleView(null)}>Delete</Button>
            <Button onClick={() => handleView('battle')}>Start</Button>
          </Box>
        )
      default:
        return <b style={{color: 'darkred'}}>Unknown Error</b>
    }
  }
  return (
    <Card sx={{display: 'flex', flexDirection: 'column', width: '250px', height : '350px', textAlign: 'center', border: '2px solid black', margin: '10px', padding: '10px'}}>
      <CardHeader
        title={
          <Typography
            noWrap
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {scenarioInfoObj.name}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image=""
        alt="Scenario Image"
      />
      <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', textAlign: 'center', flex: 1}}>
        <Typography>
          Status: {showCompletionStatus(scenario)}
        </Typography>
        <Typography>
          Setup Requirements: {scenarioInfoObj.requirements}
        </Typography>
      </CardContent>
      <CardActions >
        {showButtonChoices(scenario)}
      </CardActions>
    </Card>
  )
}

export default ScenarioCard