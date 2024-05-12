import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useAppContext } from './AppContext.jsx';
import { HomePage, HomeSideBar } from './HomePage.jsx';
import { DashboardView, DashboardSideBar } from './Dashboard.jsx';
import { ReferenceView, ReferenceSideBar } from './References.jsx';
import { SpellView, SpellSideBar } from './Spells.jsx';
import { WarbandView, WarbandSideBar } from './Warbands.jsx';
import { CampaignView, CampaignSideBar } from './Campaigns.jsx';
import { CreateNewWizard } from './CreateNewWizard.jsx';
import './styles/ContentArea.css';


export function MenuBar() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
        <li onClick={() => navigate('/reference')}>Reference</li>
        <li onClick={() => navigate('/spells')}>Spells</li>
        <li onClick={() => navigate('/warbands')}>Warbands</li>
        <li onClick={() => navigate('/campaigns')}>Campaigns</li>
        {isLoggedIn ? <li onClick={() => setIsLoggedIn(false)}>Log Out</li> : null}
        {!isLoggedIn ? <li onClick={() => setIsLoggedIn(true)}>Log In</li> : null}
      </ul>
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
        <Route path="/new-wizard" element={<CreateNewWizard />} />
        <Route path="/warband-view" element={<WarbandSideBar />} />
        {/* Add routes for other pages */}
      </Routes>
    </div>
  );
}