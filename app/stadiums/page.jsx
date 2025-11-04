'use client';
import React,{useState,useEffect}  from 'react';
import BodyLayout from '../components/bodyLayout';
import Link from 'next/link'
import { addData } from '../idb/Storage'; 
import Footer from '../components/footer';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { CgProfile } from 'react-icons/cg';
 
const Stadiums  = () =>{
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedTown, setSelectedTown] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const data = [
        { id: 0, name: 'Kleanthis Vikelidis', town: 'Athens', sport: 'football',hours:'3:00-5:00', coaches:['Josh Davis,Makis Davis'] },
        { id: 1, name: 'Toumpa', town: 'Thessaloniki', sport: 'football', hours:'3:00-5:00',coaches:['John Baris,Davis Baris'] },
        { id: 2, name: 'karaiskaki', town: 'Athens', sport: 'basketball',hours:'3:00-5:00',coaches:['Mattias Almedia,Medilibar'] },
        { id: 3, name: 'Agia Sofia', town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['John John,Tom Tom'] },
        { id: 4, name: 'Palataki', town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
        { id: 5, name: 'Pale', town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
        { id: 6, name: 'OAKA', town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
        { id: 7, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
        { id: 8, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
        { id: 9, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk']},
        { id: 10, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
        { id: 11, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
        { id: 12, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
        { id: 13, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
        { id: 14, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk']},
        { id: 15, name: 'Camp Nou',town: 'Thessaloniki', sport: 'basketball',hours:'3:00-5:00',coaches:['Steve Jobs,Elon Musk'] },
    ];
    
   
    useEffect(() => {
        const setDataToDB = async () => {
         
          if (localStorage.getItem('successDBS')!='true') {
            
            const success = await addData('stadiums', data);
    
            if (success) {
              localStorage.setItem('successDBS', 'true');   
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

    const stadiums = data
        .filter(item => item.sport === selectedSport && item.town === selectedTown)
        .map(item => ({ id: item.id, name: item.name}));

    const handleSportChange = (event) => {
        setSelectedSport(event.target.value);
        setSelectedTown('');     
    };

    const handleTownChange = (event) => {
        setSelectedTown(event.target.value);  
    };
    
    const itemsPerPage = 12;
    const totalPages = Math.ceil(stadiums.length / itemsPerPage);

    const currentStadiums = stadiums.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                      src='/images/stadiumsPage.jpg'
                      alt='stadium' 
                      className="w-full h-screen object-cover" >
              </img> 
           <div className="absolute inset-0 grid grid-rows-2">
             <div className='grid grid-cols-2 content-center z-10'>
                     <div></div> 
                     <div className="grid justify-items-center bg-slate-700 shadow rounded h-[150px] mx-32">
                     
                       <h2 className="text-xl text-white font-bold mb-4 text-center">Choose Stadiums</h2> 
                       <div>
                        <label className='text-white'>
                            Sport:
                            <select value={selectedSport} onChange={handleSportChange} className='text-black'>
                                <option value="" className='text-black'>Select a sport</option>
                                {sports.map((sport) => (
                                    <option key={sport} value={sport} className='text-black'>
                                        {sport.charAt(0).toUpperCase() + sport.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </label>
                        </div>
                        <div className='pt-2 '>
                            <label className='text-white'>
                                Town:
                                <select value={selectedTown} onChange={handleTownChange} disabled={!selectedSport} className='text-black'>
                                    <option value="" className='text-black'>Select a town</option>
                                    {towns.map((town) => (
                                        <option key={town} value={town} className='text-black'>
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
                {currentStadiums.map((stadium) => (
                        <div key={stadium.id} className="text-white">
                          <div className='grid grid-cols-2 pb-2'>
                            <div className='grid justify-items-end'><CgProfile size={30} /></div>
                            <div className='grid justify-items-start content-center pl-2'>
                              <Link key={stadium.id}
                                href={{
                                    pathname: '/stadiums/stadium',
                                    query: { id:stadium.id },
                                }} className='cursor pointer'>
                                
                                <span>{stadium.name}</span>
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
 )
}
export default Stadiums;