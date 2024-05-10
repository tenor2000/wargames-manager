import { useAppContext } from './Context.jsx';
import { HomePage } from './HomePage.jsx';
import { ReferenceView } from './References.jsx';
import { SpellView } from './Spells.jsx';
import { WarbandView } from './Warbands.jsx';
import { CampaignView } from './Campaigns.jsx';
import { CreateNewWizard } from './CreateNewWizard.jsx';
import './styles/ContentArea.css';


export function ContentArea() {
    
    const { currentPage, setCurrentPage } = useAppContext();
    return (
        <div className='content-container'>
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'reference' && <ReferenceView />}
            {currentPage === 'spells' && <SpellView />}
            {currentPage === 'warbands' && <WarbandView />}
            {currentPage === 'campaigns' && <CampaignView />}
            {currentPage === 'new-wizard' && <CreateNewWizard />}
            {currentPage === 'warband-view' && <WarbandSideBar />}

        </div>
    );
}