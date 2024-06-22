import React from 'react';
import './css/nav.css';
import { IoMdMenu,IoMdClose } from "react-icons/io";
import { NavLink } from 'react-router-dom'; 
import { AiOutlineHome } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";

import { useState } from 'react';

const Navbar = () => {
  const [ menuState, setMenuState ] = useState(true);
  const toggleMenu = (e) => {
    setMenuState(!menuState)
    const nav=e.currentTarget.parentElement.parentElement;
    const menuItems=nav.querySelector('.menu-items');

    if(!menuState){
      menuItems.classList.add('max-sm:hidden');
    }
    else{
      menuItems.classList.remove('max-sm:hidden');
    }
     
  };

  const HandleNavClick = (e) => {
    window.scrollTo(0, 0);
    toggleMenu(e);
    
   
  }
  const NavItems = [
    {
      path: "/",
      title: "Home",
      icon:<AiOutlineHome className="me-2"  />,
    },
    {
      path: "/categories",
      title: "Categories",
      icon:<TbCategory className="me-2" />,
    },
    {
      path: "/search",
      title: "Search",
      icon:<FiSearch className="me-2" />,
    },
   ];
   
  return (
    <nav className="navbar flex justify-between h-14 items-center sticky top-0 z-50 backdrop-filter backdrop-blur-lg px-5 ">
      <div className="logo ">
        {/* <img src={logoimg} alt="" className='border rounded-[50%] h-10 w-10 '/> */}
        <p className='text-2xl font-bold border-2 px-2'>News.</p>
      </div>
      
      <div className='flex text-xl font-bold max-sm:flex-col max-sm:absolute max-sm:right-0 max-sm:top-14 max-sm:gap-4 max-sm:bg-white/90 menu-items max-sm:hidden max-'>
      {
        NavItems.map((item, index) => {
          return (
              <NavLink key={index} to={item.path} className={({ isActive, isPending }) =>isPending ? "" : isActive ? "font-bold text-pallete-400 transition-all ease-in " : "text-pallete-200 transition-all ease-in "} onClick={HandleNavClick}>
               <div className="px-1 md:px-2 flex items-center" ><p className='flex items-center px-1 after:bg-pallete-400 after:rounded-md'>{item.icon}{item.title}</p></div>
              </NavLink>
          );
        })
      }
      </div>
      <div className='menu hidden max-sm:inline-block'>
        <button onClick={toggleMenu} className='text-3xl'>
          {menuState ? <IoMdMenu /> : <IoMdClose />}
        </button>

      </div>

    </nav>

  );
};

export default Navbar;
