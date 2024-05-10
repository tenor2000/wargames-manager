import { useAppContext } from './Context.jsx';
import { MenuBar } from './BasicComponents.jsx';
import { HomePage } from './HomePage.jsx';
import { ItemRef, SoldierRef } from './References.jsx';
import { ListView } from './ListView.jsx';
import { CreateNewWizard } from './CreateNewWizard.jsx';
import './ContentArea.css';


export function ContentArea() {
    
    const { currentPage, setCurrentPage } = useAppContext();
    return (
        <div className='main-container'>
            <MenuBar>
                {currentPage === 'home' && <HomePage />}
                {currentPage === 'items' && <ItemRef />}
                {currentPage === 'soldiers' && <SoldierRef />}
                {currentPage === 'listview' && <ListView />}
                {currentPage === 'create' && <CreateNewWizard />}
            </MenuBar>
        </div>
    );
}