import React from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useMediaQuery } from '@mui/material';
import { BasicStatTableHeader, BasicStatTableRow } from '../basicComponents/BasicStatTable.jsx';
import BasicAccordian from '../basicComponents/BasicAccordian.jsx';
import BasicStatCard from '../basicComponents/BasicStatCard.jsx';

function SoldierReference({sourceFilter}) {
    const { refData } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    const standardSoldierList = refData.soldiers.filter(soldier => soldier.type==='Standard')
    const specialistSoldierList = refData.soldiers.filter(soldier => soldier.type==='Specialist')

    function RenderSoldierTable({soldierList}) {
        const filteredList = sourceFilter === 'All'
            ? soldierList
            : soldierList.filter(soldier => sourceFilter.split(',').includes(soldier.source))

        return (
            <BasicStatTableHeader
                showClass={true}
                showCosts={true}
                showItemSlots={true}
                showSource={true}
            >
                {filteredList.map(soldier => (
                    <BasicStatTableRow 
                        key={`soldier-${soldier.id}`} 
                        statsObj = {soldier} 
                    />
                ))}
            </BasicStatTableHeader>
        )
    }

    function RenderSoldierCards({soldierList}) {
        const filteredList = sourceFilter === 'All'
            ? soldierList
            : soldierList.filter(soldier => sourceFilter.split(',').includes(soldier.source))

        return filteredList.map(soldier => (
            <BasicStatCard 
                key={`soldier-${soldier.id}`} 
                statsObj = {soldier} 
                showCosts={true}
                showItemSlots={true}
            />
        ))
    }

    return (
        <>
        <BasicAccordian title={'Standard Soldiers'} >
            { !isPortrait && <RenderSoldierTable soldierList={standardSoldierList} /> }
            { isPortrait && <RenderSoldierCards soldierList={standardSoldierList} /> }
        </BasicAccordian>

        <BasicAccordian title={'Specialist Soldiers'} >
            { !isPortrait && <RenderSoldierTable soldierList={specialistSoldierList} /> }
            { isPortrait && <RenderSoldierCards soldierList={specialistSoldierList} /> }
        </BasicAccordian>
    </>
    );
}

export default SoldierReference