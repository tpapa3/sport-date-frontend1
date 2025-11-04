import React from 'react';


type availableHoursProps = {
   selectedStadium : string;
   setOpen:React.Dispatch<React.SetStateAction<number>>
   availableHours:string[]
   setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
   setHour:React.Dispatch<React.SetStateAction<string>>
}

const AvailableHours : React.FC<availableHoursProps> = ({selectedStadium,setOpen,availableHours,setOpenModal,setHour}) =>{


    return(
            <div className='bg-slate-800 grid content-center'>
             {selectedStadium ? (   
               <div className='grid grid-cols-3'>
                 {availableHours.map((hour,index)=>(
                    <div key={index} className="bg-white flex justify-center items-center my-2 mx-2 hover:cursor-pointer" onClick={()=>{setOpen(index); setOpenModal(true); setHour(hour); }}>
                    {hour}
                    </div>                             
                ))}
               </div>):(<div className ='text-center text-xl text-white'>You should select stadium</div>) }
             
          </div>
          
    )

}
export default AvailableHours;