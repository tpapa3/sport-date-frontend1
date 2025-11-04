import { Court,Stadium } from "../endpoint/getStadium";
import {CourtDataType} from '../book/page'

interface Booking {
  id:number;
  sport:string;
  town:string;
  stadium:Stadium;
  court:Court;
  category:string;
  date:string;
  hour:string;
}

interface CategoryProps{
  sport:string;
  bookedCourts: Booking[];
  courtsByStadium:Court[] | undefined;
  courtsPending:boolean
  handleCourt:(court:Court) => void;
  comingBookCourt:CourtDataType[]
}

const Category:React.FC<CategoryProps> = ({sport,bookedCourts,courtsByStadium,courtsPending,handleCourt,comingBookCourt}) =>{
    
    if(courtsPending) return <div className='w-full h-full'>Loading...</div>
    return(
    <>
      {sport == 'Football' ? 
      (<div className='grid grid-rows-4'>
       <div>
         <p className='text-white text-md font-sans italic'>5X5</p>
         <div className='grid grid-cols-3 gap-1'>
           {courtsByStadium?.filter( court => (court.category == '5x5'  )).map ( court =>
             <div key={court.id} className={`flex flex-col rounded bg-slate-800 text-center ${bookedCourts?.some(bookedCourt => bookedCourt.court.id == court.id) || comingBookCourt.some(comingCourt=>comingCourt.court.id == court.id)  ? 'text-gray-400 cursor-not-allowed ': 'text-white cursor-pointer hover:text-gray-200'}`} onClick={()=>{handleCourt(court) }}>
                <div className='text-sm underline'>{court.name}</div>
                <div className='text-sm'>{bookedCourts?.some(bookedCourt => bookedCourt.court.id == court.id) ? 'Not Available': 'Available'}</div>
             </div>   
           )}
         </div>
       </div>
       <div>
         <p className='text-white text-md font-sans italic'>7X7</p>
         <div className='grid grid-cols-3 gap-1'>
           {courtsByStadium?.filter( court => (court.category == '7x7'  )).map ( court =>
            <div key={court.id} className={`flex flex-col rounded bg-slate-800 text-center ${bookedCourts?.some(bookedCourt => bookedCourt.court.id == court.id) || comingBookCourt.some(comingCourt=>comingCourt.court.id == court.id) ? 'text-gray-400 cursor-not-allowed':'text-white cursor-pointer hover:text-gray-200'}`} onClick={()=>{handleCourt(court) }}>
              <div className='text-sm underline'>{court.name}</div>
              <div className='text-sm'>{bookedCourts?.some(bookedCourt => bookedCourt.court.id == court.id) ? 'Not Available':'Available'}</div>
              <div className='hidden'>7X7</div>
           </div>     
           )}
         </div>
       </div>
       <div>
         <p className='text-white text-md font-sans italic'>9X9</p>
         <div className='grid grid-cols-3 gap-1'>
           {courtsByStadium?.filter( court => (court.category == '9x9'  )).map ( court =>
            <div key={court.id} className={`flex flex-col rounded bg-slate-800 text-center ${bookedCourts?.some(bookedCourt => bookedCourt.court.id == court.id) || comingBookCourt.some(comingCourt=>comingCourt.court.id == court.id) ? 'text-gray-400 cursor-not-allowed':'text-white cursor-pointer hover:text-gray-200'}`} onClick={()=>{handleCourt(court) }}>
              <div className='text-sm underline'>{court.name}</div>
              <div className='text-sm'>{bookedCourts?.some(bookedCourt => bookedCourt.court.id == court.id)? 'Not Available':'Available'}</div>
              <div className='hidden'>9X9</div>
           </div>     
           )}
         </div>
       </div> 
       <div>
         <p className='text-white text-md font-sans italic'>11X11</p>
         <div className='grid grid-cols-3 gap-1'>
           {courtsByStadium?.filter( court => (court.category == '11x11'  )).map ( court =>
            <div key={court.id} className={`flex flex-col rounded bg-slate-800 text-center ${bookedCourts?.some(bookedCourt => bookedCourt.id == court.id) || comingBookCourt.some(comingCourt=>comingCourt.court.id == court.id) ? 'text-gray-400 cursor-not-allowed':'text-white cursor-pointer hover:text-gray-200'}`} onClick={()=>{handleCourt(court) }}>
              <div className='text-sm underline'>{court.name}</div>
              <div className='text-sm'>{bookedCourts?.some(bookedCourt => bookedCourt.court.id == court.id) ? 'Not Available':'Available'}</div>
              <div className='hidden'>11X11</div>
           </div>    
           )}
         </div>
        </div> 
      </div>)
      :(<div className='grid grid-rows-2'>
       <div>
         <p className='text-white text-md font-sans italic'>Half Court</p>
         <div className='grid grid-cols-3 gap-1'>
           {Array.from({length:5},(_,index)=>(
            <div key={index} className={`flex flex-col rounded bg-slate-800 text-center ${index % 2 == 0 ? 'text-white cursor-pointer hover:text-gray-200':'text-gray-400 cursor-not-allowed'}`} >
              <div className='text-sm underline'>Court {index+1}</div>
              <div className='text-sm'>{index % 2 == 0 ? 'Available':'Not Available'}</div>
              <div className='hidden'>Half Court</div>
           </div>    
           ))}
         </div>
       </div>
       <div>
         <p className='text-white text-md font-sans italic'>Entire Court</p>
         <div className='grid grid-cols-3 gap-1'>
           {Array.from({length:5},(_,index)=>(
            <div key={index} className={`flex flex-col rounded bg-slate-800 text-center ${index % 2 == 0 ? 'text-white cursor-pointer hover:text-gray-200':'text-gray-400 cursor-not-allowed'}`}>
              <div className='text-sm underline'>Court {index+1}</div>
              <div className='text-sm'>{index % 2 == 0 ? 'Available':'Not Available'}</div>
              <div className='hidden'>Entire Court</div>
           </div>      
           ))}
         </div>
       </div>
      </div>)
      }
      
    </>
   )
}

export default Category;