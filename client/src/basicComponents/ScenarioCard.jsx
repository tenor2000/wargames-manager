import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import { Card, CardActions, CardHeader, CardContent, CardMedia } from '@mui/material';
import { getScenarioFromId } from '../helperFuncs/helperFunctions.js';
    
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
          </Box>
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
    <Card 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        width: '250px', 
        height : '350px', 
        textAlign: 'center', 
        border: '1px solid black',
        borderRadius: '20px',
        margin: '10px', 
      }}
    >
      
      <CardMedia
        component="img"
        height="175"
        image={scenarioInfoObj.imgUrl}
        alt="Scenario Image"
      />
      <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', textAlign: 'center', flex: 1}}>
        <Typography
          variant="h7"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '250px',
          }}
        >
            {scenarioInfoObj.name}
        </Typography>
        <Typography>
          Status: {showCompletionStatus(scenario)}
        </Typography>
      </CardContent>
      <CardActions >
        {showButtonChoices(scenario)}
      </CardActions>
    </Card>
  )
}

export default ScenarioCard