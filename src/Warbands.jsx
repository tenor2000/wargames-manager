import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext.jsx';
import './styles/Warbands.css';
import testData from './database.js';



export function WarbandView() {
    
    return (
        <div className="warband-view">
            <CreateWizard />
        </div>
    );
}

export function WarbandSideBar() {
    // const [userData, setUserData] = useAuthContext();
    const wizards = testData.myWizards.map(wizard => (
        <li key={wizard.id} onClick={() => handleWizardClick(wizard)}>{wizard.name}</li>
    ))
    function handleClick(text) {
        console.log('Click')
    }

    function handleWizardClick(wizard) {
        console.log(wizard)
    }

    return (
        <div className="sidebar-view">
            <h3>My Wizards</h3>
            <ul>
                {wizards}
                <li onClick={() => handleClick('new-wizard')}>+ New Wizard</li>
                
            </ul>
        </div>
    );
}


function CreateWizard() {
    return (
        <div>
            <h1>Create Wizard</h1>
        </div>
    );
}