'use client'
import React, { useState,useEffect } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { CgProfile } from 'react-icons/cg';
import BodyLayout from '../components/bodyLayout';
import Link from 'next/link'
import { addData } from '../idb/Storage';

const Coach  = () => {
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedTown, setSelectedTown] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const data = [
        { id: 0, name: 'John', surname: 'Doe', town: 'Athens', sport: 'football', stadiums:['stadium 1,stadium 2'] },
        { id: 1, name: 'Jane', surname: 'Smith', town: 'Thessaloniki', sport: 'football', stadiums:['stadium 1,stadium 2'] },
        { id: 2, name: 'Alex', surname: 'Johnson', town: 'Athens', sport: 'basketball',stadiums:['stadium 1,stadium 2'] },
        { id: 3, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 3,stadium 4'] },
        { id: 4, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 5,stadium 6'] },
        { id: 5, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 3,stadium 2'] },
        { id: 6, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 4,stadium 7'] },
        { id: 7, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 3,stadium 5'] },
        { id: 8, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 4,stadium 5'] },
        { id: 9, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 3,stadium 4'] },
        { id: 10, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 2,stadium 1'] },
        { id: 11, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 5,stadium 7'] },
        { id: 12, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 9,stadium 10'] },
        { id: 13, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 3,stadium 4'] },
        { id: 14, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 5,stadium 7'] },
        { id: 15, name: 'Josh', surname: 'Davis', town: 'Thessaloniki', sport: 'basketball',stadiums:['stadium 8,stadium 9'] },
    ];
    
   
    useEffect(() => {
        const setDataToDB = async () => {
          
          if (localStorage.getItem('successDB')!='true') {
            
            const success = await addData('coaches', data);
    
            if (success) {
              localStorage.setItem('successDB', 'true');   
            } else {
              console.log('Failed to add data to IndexedDB');
            }
          }
        };
    
        setDataToDB();
      }, []); 
   
    const sports = Array.from(new Set(data.map(item => item.sport)));

    const towns = Array.from(
        new Set(data.filter(item => item.sport === selectedSport).map(item => item.town))
    );

    const coaches = data
        .filter(item => item.sport === selectedSport && item.town === selectedTown)
        .map(item => ({ id: item.id, name: `${item.name} ${item.surname}`, town:selectedTown, sport:selectedSport, stadiums:item.stadiums}));

    const handleSportChange = (event) => {
        setSelectedSport(event.target.value);
        setSelectedTown('');     
    };

    const handleTownChange = (event) => {
        setSelectedTown(event.target.value);  
    };
    
    const itemsPerPage = 12;
    const totalPages = Math.ceil(coaches.length / itemsPerPage);

    const currentCoaches = coaches.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
 
    return(
        <BodyLayout overflow='auto'> 
         <Header />
         <Sidebar />
         <div className='relative z-0'>
              <img
                      src='/images/coachesPage.jpg'
                      alt='coaches' 
                      className="w-full h-screen object-cover" >
              </img> 
           <div className="absolute inset-0 grid grid-rows-2">
             <div className='grid grid-cols-2 content-center z-10'>
                     <div></div> 
                     <div className="grid justify-items-center bg-slate-50 shadow rounded h-[150px] mx-32">
                     
                       <h2 className="text-xl text-black font-bold mb-4 text-center">Choose Coach Profile</h2> 
                       <div>
                        <label >
                            Sport:
                            <select value={selectedSport} onChange={handleSportChange}>
                                <option value="">Select a sport</option>
                                {sports.map((sport) => (
                                    <option key={sport} value={sport}>
                                        {sport.charAt(0).toUpperCase() + sport.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </label>
                        </div>
                        <div className='pt-2'>
                            <label>
                                Town:
                                <select value={selectedTown} onChange={handleTownChange} disabled={!selectedSport}>
                                    <option value="">Select a town</option>
                                    {towns.map((town) => (
                                        <option key={town} value={town}>
                                            {town}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                       <div className='pt-2'></div>
                     </div>             
             </div> 
             <div className ='grid grid-cols-3 content-center'>
                {currentCoaches.map((coach) => (
                        <div key={coach.id} className="text-white">
                          <div className='grid grid-cols-2 pb-2'>
                            <div className='grid justify-items-end'><CgProfile size={30} /></div>
                            <div className='grid justify-items-start content-center pl-2'>
                              <Link key={coach.id}
                                href={{
                                    pathname: '/coaches/coach',
                                    query: { id:coach.id },
                                }} className='cursor pointer'>
                                
                                <span>{coach.name}</span>
                              </Link> 
                             </div>
                            </div>
                        </div>
                    ))}
             </div>
                {(selectedSport && selectedTown) && (<div className=" absolute flex justify-center w-full space-x-4 bottom-8">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-black rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 text-black rounded disabled:opacity-50"
                    >
                        Next
                    </button>
               </div>
                )}
            </div>  
         </div>       
         <Footer />
          
          </BodyLayout>   
      );    
}

export default Coach;