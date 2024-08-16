import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { getItemFromId } from '../helperFuncs/helperFunctions';

function ItemSelectionSlots({editedWizard, setEditedWizard, includeGeneral=false, includeVault=false, character='wizard'}) {
    const { refData } = useAppContext();
    let equipList = [];
    if (includeGeneral) {
        equipList = [...equipList, ...refData.arms, ...refData.armor];
    }
    if (includeVault) {
        equipList = [...equipList, ...editedWizard.vaultItems];
    }

    let currChar = null;

    switch (character) {
        case 'apprentice':
            currChar = editedWizard.apprentice;
            break;
        case 'captain':
            // currChar = editedWizard.captain;
            break;
        default:  
            currChar = editedWizard;
            break
    }

    console.log(currChar)

    const handleEquipmentChange = (e, index) => {
        let updateEquip = [...currChar.itemSlots];
        updateEquip[index] = e.target.value;

        let updatedWizard = { ...editedWizard };

        switch (character) {
            case 'apprentice':
                updatedWizard = {
                    ...editedWizard,
                    apprentice: { ...editedWizard.apprentice, itemSlots: updateEquip }
                };
                break;
            case 'captain':
                // Handle captain update if needed
                break;
            default:
                updatedWizard = { ...editedWizard, itemSlots: updateEquip };
                break;
        }

        setEditedWizard(updatedWizard);

        //
        
    };

    function DisplayItemSlot({item, index}) {
        return (
            <FormControl sx={{ m: 1, minWidth: 120 }} key={index}>
                <InputLabel id={`Item ${index + 1}`} >
                    Slot #{index + 1}
                </InputLabel>
                <Select
                    // className="TextField"
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
                                    disabled={currChar.itemSlots.includes(itemObj.id)}
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
                {currChar.itemSlots.map((itemSlotId, index) => 
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