'use client'
import React, { useState, useEffect, useRef} from 'react';
import { CgProfile } from 'react-icons/cg';
import { TbBaselineDensityMedium } from "react-icons/tb";
import { useSidebarContext} from '../context/SidebarContext';
import Link from 'next/link'
// import { Session } from 'next-auth';
// import { signOut } from 'next-auth/react';

// type HeaderProps={
//     session?:Session | null
// }

const Header:React.FC = () =>{
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { state:{isOpenSidebar},actions:{handleSidebar} } = useSidebarContext();
    
    
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLDivElement | null>(null);
   
    // if(session!=null && session!=undefined){console.log(session.user)}
     
    const handleDropdownToggle = () => {

        setIsDropdownOpen((prev) => {
            const newState = !prev;
            return newState;
        });
      };
    
    useEffect(() => {
      
        const handleClickOutside = (event:MouseEvent) => {
        
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="grid grid-cols-2 w-full sm:h-16 md:h-20 lg:h-28 text-white bg-transparent fixed top-0 z-20">  
         <div className={`${isOpenSidebar ? "invisible":"flex space-x-4 items-center justify-start"} `} > 
                    <TbBaselineDensityMedium size={30}/>
                    <h1 className='text-lg' onMouseEnter={()=>handleSidebar(true)} onMouseLeave={()=>handleSidebar(false)}>Training Academy</h1>               
         </div>   
         <div className='flex items-center justify-end cursor-pointer text-white relative' onClick={handleDropdownToggle} ref={toggleRef}>
                <span className='p-2'>
                 <CgProfile size={30}/>
                </span>
                <span>
                  Login
                </span>
         </div>   
            {isDropdownOpen && (
                <div className="absolute top-20 w-40 right-1 bg-white border border-gray-200 rounded-md shadow-lg" ref={dropdownRef}>
                    <div className="py-2">
                      
                        <div className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                           <Link href='/login'>Login</Link>
                        </div>
                        <div className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                           <Link href='/register'>Register</Link>
                        </div> 
                      
                    </div>
                </div>
            )}
         </div>  
    );
}

export default Header;