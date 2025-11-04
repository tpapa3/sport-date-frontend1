'use client'

import React,{useEffect,useState} from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import BodyLayout from '../../components/bodyLayout';
import Footer from '../../components/footer';
import { CgProfile } from 'react-icons/cg';
import {HashLoader} from 'react-spinners';
import {getData} from '../../idb/Storage';
import PopUp from '../../components/popup';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../../components/Map'), { ssr: false });

const StadiumProfile = () => {
  const [stadium,setStadium] = useState(null);
  const [isLoading,setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [title,setTitle] = useState(null);
  const [content,setContent] = useState(null);
  const [isOpen,setOpen] = useState(true);

  useEffect(()=>{
    
  const findStadium = async() =>{ 
  //   const success = await updateData('stadiums', [
  //     { id: 0, name: 'Kleanthis Vikelidis', town: 'Athens', sport: 'football',hours:'3:00-5:00', coaches:['Josh Davis,Makis Davis'] },
  //     { id: 1, name: 'Toumpa', town: 'Thessaloniki', sport: 'football', hours:'3:00-5:00',coaches:['John Baris,Davis Baris'] },
  //     { id: 2, name: 'karaiskaki', town: 'Athens', sport: 'basketball',hours:'3:00-5:00',coaches:['Mattias Almedia,Medilibar'] },
  //     { id: 3, name: 'Agia Sofia', town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['John John,Tom Tom'] },
  //     { id: 4, name: 'Palataki', town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
  //     { id: 5, name: 'Pale', town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
  //     { id: 6, name: 'OAKA', town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
  //     { id: 7, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
  //     { id: 8, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
  //     { id: 9, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk']},
  //     { id: 10, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
  //     { id: 11, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
  //     { id: 12, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
  //     { id: 13, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
  //     { id: 14, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk']},
  //     { id: 15, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
  //   ]) 
  //   if(success){
      const id = searchParams.get('id');
      const stadiumDB = await getData('stadiums',id)
      if(stadiumDB!=null){
          setStadium(stadiumDB)
          setLoading(false)
      }else{
         setLoading(false);
         setTitle('Error Message')
         setContent('There is no such stadium with id '+id)
      }  
    // } 
  }
  findStadium()
  },[])

  const capitalizeFirstLetter = (sport) => {
    if(sport!=null){
      return sport.charAt(0).toUpperCase() + sport.slice(1)
    }  
  }
  const handleClose = () => {
    setOpen(false);
  }

   
  
  return (
    <BodyLayout overflow={`${stadium == null && isOpen && !isLoading? 'hidden':'auto'}`}>
     <div className={`h-screen w-full grid grid-rows-2 ${stadium == null && isOpen && !isLoading? 'blur-lg':null}`}>
      <Header/>
      <Sidebar />
      <div className='relative z-0'>
        
        <img src='/images/stadiumPage.jpg' alt='stadiumProfile' className='w-full h-full object-cover'></img>
      </div>

      {isLoading && (<div className = 'flex items-center justify-center'>
      <HashLoader 
        color="#f5eceb"
        loading
        speedMultiplier={1}
      /></div>)}
        {(!isLoading && stadium )?(
          <div className='grid content-center'>
            <div className='grid grid-cols-3 content-center gap-x-4 mx-8 pb-2'>
              <div className='bg-slate-800 rounded w-full'>
                <div className='text-center text-white p-6'>
                  <CgProfile size={50}  className="mx-auto" />
                  <p className='text-lg pt-2'>Stadium</p>
                  <p className='text-lg pt-2'>{capitalizeFirstLetter(stadium?.sport)}</p>
                </div>
              </div>
              <div className='grid justify-items-center bg-slate-800 col-span-2 rounded  w-full'>
                <div className='grid grid-rows-3'>
                  <div className="grid grid-cols-2 content-center text-white gap-x-2">
                    <p className='text-lg'>Name:</p>
                    <p className='text-lg'>{stadium?.name}</p>
                  </div> 
                <div className="grid grid-cols-2 content-center text-white gap-x-2">
                    <p className='text-lg'>Hours:</p>
                    <p className='text-lg'>{stadium?.hours}</p>
                </div>
                <div className="grid grid-cols-2 content-center text-white gap-x-2">
                    <p className='text-lg'>Coaches:</p>
                    <p className='text-lg'>{stadium?.coaches}</p>
                </div> 
                </div>
              </div>  
            </div>
            <div className='grid grid-cols-1 content-center mx-8 relative w-auto h-40'>
                 <Map stadium={stadium}/>
            </div>
        </div>):(
          
           <PopUp title={title} content={content} isOpen={isOpen} isClose={handleClose}/>
          
        )}
          {/* // <div className='grid content-center mx-8'>
          //  <div className='grid grid-cols-1 h-32 justify-items-center content-center bg-slate-800'>
          //    <div className='text-lg text-white'>There is no stadium with this specific code</div>
          //  </div>
          // </div> 
           */}
        

    </div>
    <Footer/>
   
    </BodyLayout>
   )
};

export default StadiumProfile;
