import React, { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';

import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Button, SwipeableDrawer } from '@mui/material';
import { useAppContext } from './AppContext.jsx';
import { HomePage, HomeSideDrawer } from './HomePage.jsx';
import { ReferenceView, ReferenceSideDrawer } from './References.jsx';
import { SpellView, SpellSideDrawer } from './Spells.jsx';
import { WarbandView, WarbandSideDrawer } from './Warbands.jsx';
import { CampaignView, CampaignSideDrawer } from './Campaigns.jsx';
import { BattleView } from './BattleView.jsx';
import { CreateNewWizard, NewWizardSideDrawer } from './CreateNewWizard.jsx';
import { getSchoolFromId } from './HelperFunctions.js';
import { Login, LoginSideDrawer } from './Login.jsx';
import { BottomNavigation, BottomNavigationAction, Drawer, useMediaQuery, Paper } from '@mui/material';
import { useTheme, makeStyles } from '@mui/material/styles';
import { ref, set } from 'firebase/database';
import { useThemeContext } from './ThemeContext.jsx';

export function MenuBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { currentWizard, schoolFilterId, refData, isSidebarVisible, setIsSidebarVisible } = useAppContext();
  const {themeMode, toggleThemeMode} = useThemeContext();
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleSideBar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  }

  const handleNavClick = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  const MobileNavHeading = () => {
    return (
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Routes>
            <Route path="/" element='Home' />
            <Route path="/reference" element='Reference' />
            <Route path="/spells" element={<MobileNavHelper page = 'spells'/>} />
            <Route path="/warbands" element={<MobileNavHelper page = 'warbands'/>} />
            <Route path="/campaigns" element='Campaigns' />
            <Route path="/new-wizard" element='Create New Wizard' />
            <Route path="/battleview" element='Campaigns' />
            <Route path="/login" element='Log In' />
            {/* Add routes for other sidedrawer items */}
        </Routes>
      </Typography>
      )
  }

  const MobileNavHelper = ({page}) => {
    if (!isPortrait) return null;

    if (page === 'warbands') {
      return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {currentWizard && isPortrait ? currentWizard.name : 'Warband Manager'}
        </Typography>
      )
    } else if (page === 'spells') {
      const schoolname = getSchoolFromId(schoolFilterId, refData).name;
      return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {isPortrait && <h4>{schoolname} Spells</h4>}
        </Typography>
      )
    }
    return null;
  }

  const MenuNavItems = () => {
    if (isPortrait) return null;
      
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={() => handleNavClick('/')}>Home</Button>
          <Button onClick={() => handleNavClick('/reference')}>Reference</Button>
          <Button onClick={() => handleNavClick('/spells')}>Spells</Button>
          <Button onClick={() => handleNavClick('/warbands')}>Warbands</Button>
          <Button onClick={() => handleNavClick('/campaigns')}>Campaigns</Button>
      </Box>
      )
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="menu-bar">
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={isPortrait ? toggleDrawer(true) : toggleSideBar}  // Open the drawer on click
          >
            <MenuIcon />
          </IconButton>
          {isPortrait ? <MobileNavHeading /> : null}
          {!isPortrait && <MenuNavItems />}
          <Box sx={{ flexGrow: 1 }} />
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem>
                  L/D Mode:
                  <Switch
                    checked={themeMode === 'dark'}
                    onChange={toggleThemeMode}
                    aria-label="theme switch"
                  />
                  
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {isPortrait && 
        <Drawer
          anchor="left"
          variant="persistent"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <IconButton onClick={toggleDrawer(false)} aria-label="back">
              <ArrowBackIcon />
            </IconButton>
            <Divider />
            <SideDrawer />
          </Box>
        </Drawer>
      }
    </Box>
  );
}

export function SideDrawer () {
  return (
    <Paper className="generic-paper">
      <div className="side-drawer">
        <Routes>
            <Route path="/" element={<HomeSideDrawer />} />
            <Route path="/reference" element={<ReferenceSideDrawer />} />
            <Route path="/spells" element={<SpellSideDrawer />} />
            <Route path="/warbands" element={<WarbandSideDrawer />} />
            <Route path="/campaigns" element={<CampaignSideDrawer />} />
            <Route path="/reference" element={<ReferenceSideDrawer />} />
            <Route path="/new-wizard" element={<NewWizardSideDrawer />} />
            <Route path="/login" element={<LoginSideDrawer />} />
            <Route path="/battleview" element={<CampaignSideDrawer />} />
            {/* Add routes for other sidebar items */}
        </Routes>
        </div>
    </Paper>
  )
}

export function SideBar () {
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

  if (isPortrait) return null

  return (
    <div className={'sidebar ${isSidebarVisible ? "" : "hidden"}'}>
      <Routes>
          <Route path="/" element={<HomeSideDrawer />} />
          <Route path="/reference" element={<ReferenceSideDrawer />} />
          <Route path="/spells" element={<SpellSideDrawer />} />
          <Route path="/warbands" element={<WarbandSideDrawer />} />
          <Route path="/campaigns" element={<CampaignSideDrawer />} />
          <Route path="/reference" element={<ReferenceSideDrawer />} />
          <Route path="/new-wizard" element={<NewWizardSideDrawer />} />
          <Route path="/login" element={<LoginSideDrawer />} />
          {/* Add routes for other sidebar items */}
      </Routes>
    </div>
  )
}

export function ContentArea() {
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
  const {isSidebarVisible, setSidebarVisible} = useAppContext();
  const contentStyle = {
    marginBottom: isPortrait ? '15%' : '0',
  };

    return (
      <div className='content-container'>
        {!isPortrait && isSidebarVisible && <SideBar />}
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reference" element={<ReferenceView />} />
            <Route path="/spells" element={<SpellView />} />
            <Route path="/warbands" element={<WarbandView />} />
            <Route path="/campaigns" element={<CampaignView />} />
            <Route path="/new-wizard" element={<CreateNewWizard />} />
            <Route path="/login" element={<Login />} />
            {/* Add routes for other pages */}
          </Routes>
        </div>
      </div>
    );
} 

export function MobileBottomNav() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const navigate = useNavigate();
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

  if (!isPortrait) return null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/reference');
        break;
      case 2:
        navigate('/spells');
        break;
      case 3:
        navigate('/warbands');
        break;
      case 4:
        navigate('/campaigns');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      sx={{
        width: '100%',
        position: 'fixed',
        height: '7%',
        bottom: 0,
        left: 0,
        backgroundColor: theme.palette.mode === 'light' ? 'white' : 'black', // may need to change
        zIndex: 1000,
      }}
    >
        <BottomNavigationAction icon={<img style={{width: '30px', height: '30px', filter: theme.palette.mode === 'light' ? 'invert(100%)' : 'invert(0%)'}} src={('src/assets/Game-Icons-net/castle.svg')} alt="Spells" />} />
        <BottomNavigationAction icon={<img style={{width: '30px', height: '30px', filter: theme.palette.mode === 'light' ? 'invert(100%)' : 'invert(0%)'}} src={('src/assets/Game-Icons-net/bookshelf.svg')} alt="Spells" />} />
        <BottomNavigationAction icon={<img style={{width: '30px', height: '30px', filter: theme.palette.mode === 'light' ? 'invert(100%)' : 'invert(0%)'}} src={('src/assets/Game-Icons-net/book-cover.svg')} alt="Spells" />} />
        <BottomNavigationAction icon={<img style={{width: '30px', height: '30px', filter: theme.palette.mode === 'light' ? 'invert(100%)' : 'invert(0%)'}} src={('src/assets/Game-Icons-net/axe-sword.svg')} alt="Spells" />} />
        <BottomNavigationAction icon={<img style={{width: '30px', height: '30px', filter: theme.palette.mode === 'light' ? 'invert(100%)' : 'invert(0%)'}} src={('src/assets/Game-Icons-net/rule-book.svg')} alt="Spells" />} />
    </BottomNavigation>
  );
}