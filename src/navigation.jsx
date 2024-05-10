import React, { useState } from "react";
import { useAppContext } from "./Context";

export function NavigationSideBar() {
  const { currentPage, setCurrentPage } = useAppContext();

  const handleClick = (page) => {
    setCurrentPage(page);
  }

  return (
    <nav>
      <ul>
        <li onClick={() => handleClick('home')}>Home</li>
        <li onClick={() => handleClick('items')}>Items</li>
        <li onClick={() => handleClick('soldiers')}>Soldiers</li>
        <li onClick={() => handleClick('listview')}>List View</li>
        <li onClick={() => handleClick('create')}>Create New Wizard</li>
      </ul>
    </nav>
  )
}

