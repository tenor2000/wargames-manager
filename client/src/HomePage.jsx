import React, { useState } from 'react';
import { Box } from '@mui/material';


export function HomePage() {
    return (
        <Box className="campaigns-container" sx={{width: '100%', textAlign: 'center' }}>
            <h2>Welcome to the Warband Manager</h2>
            <p>Currently in Development</p>
            <p>Frostgrave 2nd Edition</p>
        </Box>
    );
};

export function HomeSideDrawer() {
    return (
        <div>
            <h1>Home SideBar</h1>
        </div>
    );
}