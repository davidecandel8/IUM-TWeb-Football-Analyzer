import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react'
import LogoSite from "../../assets/images/logo-site.png"

const voices = ["players", "clubs", "competitions", "games", "chat"]

function HomeNavbar() {

  const history = useLocation();
  const [path, setPath] = useState(history.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log(history.pathname)
    setPath(history.pathname)
  }, [history]);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} classNames={{wrapper: "max-w-full bg-grey3 px-14"}}>
        <NavbarBrand>
            <Image src={LogoSite} alt='site logo' width={50}/>
            <Link className='text-2xl font-logo text-white ml-2' to='/'>Football Analyzer</Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          {
            voices.map((voice, index) => (
              <NavbarItem key={index}>
                {
                  (path === `/${voice}` || path.startsWith(`/${voice}/`) || (path.startsWith(`/gamesDetails`) && voice==='games')) ? (
                    <Link className=' text-myGreen font-small' to={`/${voice}`}>
                      {voice.charAt(0).toUpperCase() + voice.slice(1)}
                    </Link>
                  ) : (
                      <Link className=' text-white font-small' to={`/${voice}`}>
                      {voice.charAt(0).toUpperCase() + voice.slice(1)}</Link>
                    )
                }  
              </NavbarItem>))  
          }
        </NavbarContent>
        <NavbarMenu className=' bg-grey3 text-center'>
        {voices.map((voice, index) => (
          <NavbarMenuItem key={`${voice}-${index}`}>
            <Link className="text-white" to={`/${voice}`}size="lg">
              {voice.charAt(0).toUpperCase() + voice.slice(1)}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-myGreen" 
        />
    </Navbar>
  )
}

export default HomeNavbar
