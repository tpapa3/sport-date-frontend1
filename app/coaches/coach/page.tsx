'use client'

import React,{useEffect,useState} from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import BodyLayout from '../../components/bodyLayout';
import Footer from '../../components/footer';
import { CgProfile } from 'react-icons/cg';
import Loading from '../../components/loading';
import {getData} from '../../idb/Storage';
import PopUp from '../../components/popup';

const CoachProfile: React.FC = () => {
  const [coach,setCoach] = useState({sport:'',name:'',surname:'',stadiums:''});
  const [isLoading,setLoading] = useState(true);
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [isOpen,setOpen] = useState(true);
  const searchParams = useSearchParams();

  useEffect(()=>{
  const findCoach = async() =>{  
    const id = searchParams.get('id');
    const coachProfile = await getData('coaches',id)

    if(coachProfile!=null){
      setCoach(coachProfile)
      setLoading(false);
    }else{
      setLoading(false);
      setTitle('Error Message')
      setContent('There is no such coach with id '+id)
    } 
  } 
  findCoach()
  },[])

  const capitalizeFirstLetter = (sport:string):string => {
    if(sport!=null){
      return sport.charAt(0).toUpperCase() + sport.slice(1)
    } 
    return '';
  }
 
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <BodyLayout overflow='auto'>
     <div className='h-screen w-full grid grid-rows-2 profilePage'>
      <Header/>
      <Sidebar />
      <div className='relative z-0'>
        
        <img src='/images/coachPage.jpg' alt='coachProfile' className='w-full h-full object-cover'></img>
      </div>

      {isLoading && <Loading />}
        {(!isLoading && coach ) ? (
         <div className='grid content-center'>
            <div className='grid grid-cols-3 content-center gap-x-4 mx-8'>
              <div className='bg-slate-800 rounded w-full'>
                <div className='text-center text-white p-6'>
                  <CgProfile size={50}  className="mx-auto" />
                  <p className='text-lg pt-2'>Coach</p>
                  <p className='text-lg pt-2'>{capitalizeFirstLetter(coach?.sport)}</p>
                </div>
              </div>
              <div className='grid justify-items-center bg-slate-800 col-span-2 rounded  w-full'>
                <div className='grid grid-rows-3'>
                  <div className="grid grid-cols-2 content-center text-white gap-x-2">
                    <p className='text-lg'>Name:</p>
                    <p className='text-lg'>{coach?.name}</p>
                  </div> 
                <div className="grid grid-cols-2 content-center text-white gap-x-2">
                    <p className='text-lg'>Surname:</p>
                    <p className='text-lg'>{coach?.surname}</p>
                </div>
                <div className="grid grid-cols-2 content-center text-white gap-x-2">
                    <p className='text-lg'>Stadiums:</p>
                    <p className='text-lg'>{coach?.stadiums}</p>
                </div> 
                </div>
              </div>  
            </div>
            <div className='grid grid-cols-1 content-center mx-8 pt-2'>
              <div className='bg-slate-800'>
                <div className='grid grid-cols-2 space-x-2 text-white justify-items-center'>
                  <p className='text-lg flex items-center'>Title:</p>
                  <p className='text-sm'>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. 
                            Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. 
                            Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                </div>
              </div>
            </div>
        </div>):
        (<PopUp title={title} content={content} isOpen={isOpen} isClose={handleClose}/>)}

    </div>
    <Footer/>
   
    </BodyLayout>
   )
};

export default CoachProfile;