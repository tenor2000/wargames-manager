import React, { useState } from "react";
import { useAppContext } from "./Context";

export function MenuBar() {
  const { currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn } = useAppContext();

  const handleClick = (page) => {
    setCurrentPage(page);
  }

  return (
    <nav>
      <ul>
        <li onClick={() => handleClick('home')}>Home</li>
        <li onClick={() => handleClick('reference')}>Reference</li>
        <li onClick={() => handleClick('spells')}>Spells</li>
        <li onClick={() => handleClick('warbands')}>Warbands</li>
        <li onClick={() => handleClick('campaigns')}>Campaigns</li>
        {isLoggedIn ? <li onClick={() => setIsLoggedIn(false)}>Log Out</li> : null}
        {!isLoggedIn ? <li onClick={() => setIsLoggedIn(true)}>Log In</li> : null}
      </ul>
    </nav>
  )
}

export function SideBar({children}) {
  const { currentPage, setCurrentPage } = useAppContext();
  return (
      <>
          <div className="menu-bar">
              {currentPage === 'new-wizard' && <MenuWizard />}
          </div>
          {children}
      </>
  );
}