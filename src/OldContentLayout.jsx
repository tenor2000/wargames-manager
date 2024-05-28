import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Button, Stack } from '@mui/material';
import { useAppContext } from './AppContext.jsx';
import { HomePage, HomeSideBar } from './HomePage.jsx';
import { DashboardView, DashboardSideBar } from './Dashboard.jsx';
import { ReferenceView, ReferenceSideBar } from './References.jsx';
import { SpellView, SpellSideBar } from './Spells.jsx';
import { WarbandView, WarbandSideBar } from './Warbands.jsx';
import { CampaignView, CampaignSideBar } from './Campaigns.jsx';
import { CreateNewWizard, NewWizardSideBar } from './CreateNewWizard.jsx';
import { Login, LoginSideBar } from './Login.jsx';
import { BottomNavigation } from '@mui/material';




export function MenuBar() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const navigate = useNavigate();

  return (
    <nav>
      <Stack direction="row" spacing={2}>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
        <Button onClick={() => navigate('/reference')}>Reference</Button>
        <Button onClick={() => navigate('/spells')}>Spells</Button>
        <Button onClick={() => navigate('/warbands')}>Warbands</Button>
        <Button onClick={() => navigate('/campaigns')}>Campaigns</Button>
        {/* <Button onClick={() => navigate('/login')} >Login</Button> */}
      </Stack>
        
    </nav>
  )
}

export function SideBar() {

  return (
    <div className="sidebar">
        <Routes>
            <Route path="/" element={<HomeSideBar />} />
            <Route path="/dashboard" element={<DashboardSideBar />} />
            <Route path="/reference" element={<ReferenceSideBar />} />
            <Route path="/spells" element={<SpellSideBar />} />
            <Route path="/warbands" element={<WarbandSideBar />} />
            <Route path="/campaigns" element={<CampaignSideBar />} />
            <Route path="/reference" element={<ReferenceSideBar />} />
            <Route path="/new-wizard" element={<NewWizardSideBar />} />
            <Route path="/login" element={<LoginSideBar />} />
            {/* Add routes for other sidebar items */}
        </Routes>
    </div>
  );
}

export function ContentArea() {

  return (
    <div className='content-container'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/reference" element={<ReferenceView />} />
        <Route path="/spells" element={<SpellView />} />
        <Route path="/warbands" element={<WarbandView />} />
        <Route path="/campaigns" element={<CampaignView />} />
        <Route path="/warband-view" element={<WarbandSideBar />} />
        <Route path="/new-wizard" element={<CreateNewWizard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* Add routes for other pages */}
      </Routes>
    </div>
  );
}

export function MobileBottomNav() {
  return (
    <BottomNavigation>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
        <Button onClick={() => navigate('/reference')}>Reference</Button>
        <Button onClick={() => navigate('/spells')}>Spells</Button>
        <Button onClick={() => navigate('/warbands')}>Warbands</Button>
        <Button onClick={() => navigate('/campaigns')}>Campaigns</Button>
        <Button onClick={() => navigate('/login')} >Login</Button>
    </BottomNavigation>
  )
}
