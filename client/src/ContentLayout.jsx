import React, { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';

import { useNavigate, NavLink, useSearchParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Button, SwipeableDrawer, Link } from '@mui/material';
import { useAppContext } from './contexts/AppContext.jsx';
import { HomePage, HomeSideDrawer } from './HomePage.jsx';
import { ReferenceView, ReferenceSideDrawer } from './references/References.jsx';
import { SpellView, SpellSideDrawer } from './spells/Spells.jsx';
import { WarbandView, WarbandSideDrawer } from './warbands/Warbands.jsx';
import { CampaignView, CampaignSideDrawer } from './campaigns/Campaigns.jsx';
import { CreateNewWizard, NewWizardSideDrawer } from './warbands/CreateNewWizard.jsx';
import { getSchoolFromId } from './helperFuncs/HelperFunctions.js';
import { LoginForm, LoginSideDrawer } from './user/Login.jsx';
import RegistrationForm from './user/Registration.jsx';
import { BottomNavigation, BottomNavigationAction, Drawer, useMediaQuery, Paper } from '@mui/material';
import { useTheme, makeStyles } from '@mui/material/styles';
import { useThemeContext } from './contexts/ThemeContext.jsx';
import { CreateNewCampaign, NewCampaignSideDrawer } from './campaigns/CreateNewCampaign.jsx';
import { BattleView, BattleViewSideDrawer } from './campaigns/BattleView.jsx';


export function MenuBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { currentWizard, refData, isSidebarVisible, setIsSidebarVisible } = useAppContext();
  const { themeMode, toggleThemeMode } = useThemeContext();
  const [ searchParams, setSearchParams ] = useSearchParams();
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
      <Typography variant="h5" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element='Home' />
          <Route path="/reference" element='Reference' />
          <Route path="/spells" element={<MobileNavHelper page = 'spells'/>} />
          <Route path="/warbands/:wizardId?" element={<MobileNavHelper page = 'warbands'/>} />
          <Route path="/warbands/new-wizard" element='Create New Wizard' />
          <Route path="/campaigns" element='Campaigns' />
          <Route path="/campaigns/new-campaign" element='Create New Campaign' />
          <Route path="/campaigns/battleview/:battleId" element='Campaigns' />
          <Route path="/login" element='Log In' />
          {/* Add routes for other sidedrawer items */}
        </Routes>
      </Typography>
      )
  }

  const MobileNavHelper = ({page}) => {
    if (!isPortrait) return null;
    const schoolFilterId = searchParams.get('schoolFilterId') || '0';

    if (page === 'warbands') {
      return (
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {currentWizard && isPortrait ? currentWizard.name : 'Manager'}
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
        <Button component={NavLink} to='/' sx={{ mr: 2 }}>Home</Button>
        <Button component={NavLink} to='/reference' sx={{ mr: 2 }}>Reference</Button>
        <Button component={NavLink} to='/spells' sx={{ mr: 2 }}>Spells</Button>
        <Button component={NavLink} to='/warbands' sx={{ mr: 2 }}>Warbands</Button>
        <Button component={NavLink} to='/campaigns' sx={{ mr: 2 }}>Campaigns</Button>
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
            onClick={isPortrait ? toggleDrawer(true) : toggleSideBar}
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={toggleDrawer(false)} aria-label="back">
                <ArrowBackIcon />
              </IconButton>
            </Box>
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
    <Paper 
      elevation={1}
      className={'sidebar'}
      sx={{width: '100%', padding: '5px', height: '100%', overflow: 'auto'}}
    >
      <Routes>
          <Route path="/" element={<HomeSideDrawer />} />
          <Route path="/reference" element={<ReferenceSideDrawer />} />
          <Route path="/spells" element={<SpellSideDrawer />} />
          <Route path="/warbands" element={<WarbandSideDrawer />} />
          <Route path="/warbands/new-wizard" element={<NewWizardSideDrawer />} />
          <Route path="/campaigns" element={<CampaignSideDrawer />} />
          <Route path="/campaigns/battleview" element={<CampaignSideDrawer />} />
          <Route path="/login" element={<LoginSideDrawer />} />
          {/* Add routes for other sidebar items */}
      </Routes>
    </Paper>
  )
}

export function SideBar () {
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

  if (isPortrait) return null

  return (
    <Paper 
      elevation={1}
      className={'sidebar'}
    >
      <Routes>
        <Route path="/" element={<HomeSideDrawer />} />
        <Route path="/reference" element={<ReferenceSideDrawer />} />
        <Route path="/spells" element={<SpellSideDrawer />} />
        <Route path="/warbands" element={<WarbandSideDrawer />} />
        <Route path="/warbands/new-wizard" element={<NewWizardSideDrawer />} />
        <Route path="/campaigns" element={<CampaignSideDrawer />} />
        <Route path="/campaigns/battleview" element={<CampaignSideDrawer />} />
        <Route path="/login" element={<LoginSideDrawer />} />
        {/* Add routes for other sidebar items */}
      </Routes>
    </Paper>
  )
}

export function ContentArea() {
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
  const {isSidebarVisible} = useAppContext();

  return (
    <Box className='content-container' sx={{ display: 'flex', height: '100vh' }}>
      {!isPortrait && isSidebarVisible && <SideBar />}
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'auto', height: '100%' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reference" element={<ReferenceView />} />
            <Route path="/spells" element={<SpellView />} />
            <Route path="/warbands" element={<WarbandView />} />
            <Route path="/warbands/new-wizard" element={<CreateNewWizard />} />
            <Route path="/campaigns" element={<CampaignView />} />
            <Route path="/campaigns/:campaignId" element={<CampaignView />} />
            <Route path="/campaigns/new-campaign" element={<CreateNewCampaign />} />
            <Route path="/campaigns/battleview/:matchId" element={<BattleView />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            {/* Add routes for other pages */}
          </Routes>
        </Box>
      </Box>
    </Box>
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
        <BottomNavigationAction icon={<img style={{width: '30px', height: '30px', filter: theme.palette.mode === 'light' ? 'invert(100%)' : 'invert(0%)'}} src={('src/assets/Game-Icons-net/castle.svg')} alt="Home" />} />
        <BottomNavigationAction icon={<img style={{width: '30px', height: '30px', filter: theme.palette.mode === 'light' ? 'invert(100%)' : 'invert(0%)'}} src={('src/assets/Game-Icons-net/bookshelf.svg')} alt="Reference" />} />
        <BottomNavigationAction icon={<img style={{width: '30px', height: '30px', filter: theme.palette.mode === 'light' ? 'invert(100%)' : 'invert(0%)'}} src={('src/assets/Game-Icons-net/book-cover.svg')} alt="Spells" />} />
        <BottomNavigationAction icon={<img style={{width: '30px', height: '30px', filter: theme.palette.mode === 'light' ? 'invert(100%)' : 'invert(0%)'}} src={('src/assets/Game-Icons-net/axe-sword.svg')} alt="Warband" />} />
        <BottomNavigationAction icon={<img style={{width: '30px', height: '30px', filter: theme.palette.mode === 'light' ? 'invert(100%)' : 'invert(0%)'}} src={('src/assets/Game-Icons-net/rule-book.svg')} alt="Campaign" />} />
    </BottomNavigation>
  );
}