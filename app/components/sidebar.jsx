'use client'
import React,{useState} from 'react';
import { useSidebarContext } from '../context/SidebarContext';
import { MdKeyboardArrowRight,MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from 'next/link'

const Sidebar = () => {
    const { state:{isOpenSidebar},actions:{handleSidebar} } = useSidebarContext();
    const [openSection, setOpenSection] = useState(null);
    const [openSubList, setOpenSubList] = useState({ coaches: null, stadiums: null });
    
    const sidebarItems = [
        {
          name: "Home",
          href: "/",
        //   icon: AiOutlineHome,
        },
        {
          name: "About",
          href: "/about",
        //   icon: BsPeople,
        },
        {
          name: "Coaches",
          href: "/coaches",
        //   icon: FiMail,
        },
        {
          name: "Stadiums",
          href: "/stadiums",
        //   icon: TiContacts,
        },
        {
          name:"Booking",
          href:"/book"
        },
        {
          name:"Upload Stadium",
          href:"/upload-stadium"
        }
      ];

      const toggleSection = (section) => {
        setOpenSection(prevSection => (prevSection === section ? null : section));
        setOpenSubList({ coaches: null, stadiums: null }); 
      };
    
      const toggleSubList = (section, list) => {
        setOpenSubList(prevSubList => ({
          ...prevSubList,
          [section]: prevSubList[section] === list ? null : list,
        }));
      };
    
    return(
      <>
         {isOpenSidebar &&(
            <aside id="logo-sidebar" 
            className="flex flex-col fixed top-0 left-0 z-[1100] w-72 h-full bg-white transition-all"  
            aria-label="Sidebar"
            onMouseEnter = {()=>handleSidebar(true)}
            onMouseLeave = {()=>handleSidebar(false)}>
                <div className="flex justify-start sm:h-16 md:h-20 lg:h-28 text-black">
                    <a href="https://flowbite.com/" className='flex items-center'>
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Training Academy</span>
                    </a>
                </div>
                <div className="flex-grow">
                  
                <ul className="pl-4">
                      {sidebarItems.map(({ name, href }) => {
                        return (
                          <li className="pb-4" key={name}>    
                          <div className="flex items-center">
                            <Link
                              className="hover:text-zinc-400"
                              href={href}
                            >
                              {/* <span className="sidebar__icon">
                                <Icon />
                              </span> */}
                              <span className="text-lg">{name}</span>
                            </Link>
                            {(name === 'Coaches' || name === 'Stadiums') && (
                              <div className='pt-0.5'>
                                {openSection === name ? (
                                  <MdOutlineKeyboardArrowDown onClick={() => toggleSection(name)} className="cursor-pointer" />
                                ) : (
                                  <MdKeyboardArrowRight onClick={() => toggleSection(name)} className="cursor-pointer" />
                                )}
                              </div>
                            )}
                          </div>
                          {name === 'Coaches' && openSection === 'Coaches' && (
                            <ul className="pl-6 pt-2 space-y-2">
                              <li>
                                <div className="flex items-center">
                                  <Link href="/coaches/football" className="hover:text-zinc-400 text-md">Football</Link>
                                  <div className='pl-2'>
                                    {openSubList.coaches === 'football' ? (
                                      <MdOutlineKeyboardArrowDown onClick={() => toggleSubList('coaches', 'football')} className="cursor-pointer" />
                                    ) : (
                                      <MdKeyboardArrowRight onClick={() => toggleSubList('coaches', 'football')} className="cursor-pointer" />
                                    )}
                                  </div>
                                </div>
                                {openSubList.coaches === 'football' && (
                                  <ul className="pl-6 pt-2 space-y-1">
                                    <li><Link href="/coaches/football/coach1" className="hover:text-zinc-400 text-sm">Coach 1</Link></li>
                                    <li><Link href="/coaches/football/coach2" className="hover:text-zinc-400 text-sm">Coach 2</Link></li>
                                  </ul>
                                )}
                              </li>
                              <li>
                                <div className="flex items-center">
                                  <Link href="/coaches/basketball" className="hover:text-zinc-400 text-md">Basketball</Link>
                                  <div className='pl-2'>
                                    {openSubList.coaches === 'basketball' ? (
                                      <MdOutlineKeyboardArrowDown onClick={() => toggleSubList('coaches', 'basketball')} className="cursor-pointer" />
                                    ) : (
                                      <MdKeyboardArrowRight onClick={() => toggleSubList('coaches', 'basketball')} className="cursor-pointer" />
                                    )}
                                  </div>
                                </div>
                                  {openSubList.coaches === 'basketball' && (
                                    <ul className="pl-6 pt-2 space-y-1">
                                      <li><Link href="/coaches/basketball/coach1" className="hover:text-zinc-400 text-sm">Coach 1</Link></li>
                                      <li><Link href="/coaches/basketball/coach2" className="hover:text-zinc-400 text-sm">Coach 2</Link></li>
                                    </ul>
                                  )}
                                </li>
                              </ul>
                            )}

                            {name === 'Stadiums' && openSection === 'Stadiums' && (
                              <ul className="pl-6 pt-2 space-y-2">
                                <li>
                                  <div className="flex items-center">
                                    <Link href="/stadiums/football" className="hover:text-zinc-400 text-md">Football</Link>
                                    <div className='pl-2'>
                                      {openSubList.stadiums === 'football' ? (
                                        <MdOutlineKeyboardArrowDown onClick={() => toggleSubList('stadiums', 'football')} className="cursor-pointer" />
                                      ) : (
                                        <MdKeyboardArrowRight onClick={() => toggleSubList('stadiums', 'football')} className="cursor-pointer" />
                                      )}
                                    </div>
                                  </div>
                                  {openSubList.stadiums === 'football' && (
                                    <ul className="pl-6 pt-2 space-y-1">
                                      <li><Link href="/stadiums/football/stadium1" className="hover:text-zinc-400 text-sm">Stadium 1</Link></li>
                                      <li><Link href="/stadiums/football/stadium2" className="hover:text-zinc-400 text-sm">Stadium 2</Link></li>
                                    </ul>
                                  )}
                                </li>
                                <li>
                                  <div className="flex items-center">
                                    <Link href="/stadiums/basketball" className="hover:text-zinc-400 text-md">Basketball</Link>
                                    <div className='pl-2'>
                                      {openSubList.stadiums === 'basketball' ? (
                                        <MdOutlineKeyboardArrowDown onClick={() => toggleSubList('stadiums', 'basketball')} className="cursor-pointer" />
                                      ) : (
                                        <MdKeyboardArrowRight onClick={() => toggleSubList('stadiums', 'basketball')} className="cursor-pointer" />
                                      )}
                                    </div>
                                  </div>
                                  {openSubList.stadiums === 'basketball' && (
                                    <ul className="pl-6 pt-2 space-y-1">
                                      <li><Link href="/stadiums/basketball/stadium1" className="hover:text-zinc-400 text-sm">Stadium 1</Link></li>
                                      <li><Link href="/stadiums/basketball/stadium2" className="hover:text-zinc-400 text-sm">Stadium 2</Link></li>
                                    </ul>
                                  )}
                                </li>
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
            </aside> 
         )}
       </>    
    )
} 

export default Sidebar;