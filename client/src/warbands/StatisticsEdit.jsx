import { useAppContext } from '../contexts/AppContext';
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { getItemFromId } from '../helperFuncs/helperFunctions';

function StatisticsEdit({editedWizard, setEditedWizard, character='wizard'}) {
    const { refData } = useAppContext();

    const handleStatsChange = (e, index) => {
        //WIP
        switch (character) {
            case 'apprentice':
                character = editedWizard.apprentice;
                break;
            case 'captain':
                // character = editedWizard.captain;
                break;
            default:  
                character = editedWizard;
                break
        }

        //
        const updateEquip = [...editedWizard.itemSlots];
        updateEquip[index] = e.target.value;
        setEditedWizard({ ...editedWizard, itemSlots: updateEquip });
    };

    function DisplayItemSlot({statModsObj, index}) {
        return (
            <FormControl sx={{ m: 1, minWidth: 120 }} key={index}>
                <InputLabel id={`Item ${index + 1}`} >
                    Slot #{index + 1}
                </InputLabel>
                <Select
                    labelId={`Item ${index + 1}`}
                    value={item.id}
                    label={`Item ${index + 1}`}
                    onChange={(e) => handleEquipmentChange(e, index)}
                    size="small"
                    sx={{ padding: 0 }}
                    fullWidth
                >
                    <MenuItem value={0}>--</MenuItem>
                    {
                        equipList.map((itemObj, index) => {
                            if (itemObj.id === 107) { // 107 is the id for the "unarmed" item
                                return null
                            }
                            return (
                                <MenuItem 
                                    key={itemObj.id} 
                                    value={itemObj.id}
                                    disabled={editedWizard.itemSlots.includes(itemObj.id)}
                                >
                                    {getItemFromId(itemObj.id, refData).name}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        )
    }

    return (
        <Card sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                width: 250,
                height: 350
            }}
            variant="outlined"
        >
            <Typography variant='h6'>Edit Equipment</Typography>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {editedWizard.itemSlots.map((itemSlotId, index) => 
                    {
                        const item = getItemFromId(itemSlotId, refData);
                        return (
                            <DisplayItemSlot key={index} item={item} index={index}/>
                        )
                    }
                )}
            </CardContent>
        </Card>
    )
}

export default ItemSelectionSlots