import { getBaseFromId } from "../helperFuncs/HelperFunctions";
import { useAppContext } from "../contexts/AppContext";
import { Button } from "@mui/material";


export function BaseView({handleButton}) {
    const { currentWizard, refData } = useAppContext();
    const baseObj = getBaseFromId(currentWizard.base, refData);

    return (
        <div>
            <p>Base of Operations: {baseObj.name}</p>
            <p>Effect: {baseObj.effects}</p>
            <Button onClick={() => handleButton('edit', 'base')}>Edit Base</Button>
        </div>
    );
}