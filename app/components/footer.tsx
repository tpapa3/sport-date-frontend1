import React from 'react';
import Image from 'next/image';
import { MdOutlineMailOutline } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

// interface FooterProps {
//     stadium?:null;
//     open?:number;
//     isLoading?:boolean;
// }

const Footer : React.FC = ()=>{
  return(
    <div className='grid justify-items-center content-center grid-cols-3 gap-4  bg-black '>
        <div>
        <Image
            src="/images/academy.jpg" 
            height={145} 
            width={140}
            alt="academy"
        />
        <h1 className='text-lg text-white'>Training Academy</h1>
        </div>
        <div className='text-white'>
            <h1 className='text-2xl text-center'>Contact</h1>
            <div className='grid grid-rows-2 justify-items-center'>
                <div>
                   <div className='flex'>
                        <span className='pt-1.5 pr-1.5'><MdOutlineMailOutline /></span>
                        <span><a href='mailto:itspersonalgym@gmail.com'>trainingacademy@gmail.com</a></span>
                    </div> 
                    <div className='flex'>
                        <span className='pt-1 pr-1.5'><GiRotaryPhone /></span>
                        <span>2310 444-555</span>
                    </div>
                </div>
                <div className='text-wrap'><p className='text-lg text-center'> We are open 24/7 every day and we are here to answer any question</p></div>
            </div>    
        </div>
        <div className='text-white'>
            <h1 className='text-2xl'>Follow</h1>
            <div className='flex pt-2 space-x-4'>
                <FaFacebook size={30} />
                <RiInstagramFill size={35}/>
            </div>
        </div>
    </div>
  )
}

export default Footer;