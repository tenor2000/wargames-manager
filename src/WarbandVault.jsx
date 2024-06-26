import { useAppContext } from './AppContext.jsx';

export function VaultView() {
    const { currentWizard } = useAppContext();
    return (
        <div>
            <p>The Vault is where all treasure is stored</p>
            <p>Gold: {currentWizard.gold}</p>
            <p>XP: {currentWizard.xp}</p>
        </div>
    )
}