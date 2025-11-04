import {TimeInput} from "@nextui-org/react";
import {Control, Controller, FieldErrors} from "react-hook-form";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { TimeValue } from "@react-types/datepicker";
import HelpIcon from "./helpIcon";
import {FormValue} from '../upload-stadium/page'



interface ScheduleProgram { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control:Control<FormValue, any>
    handleChange:(value: TimeValue | null, day: string, key: "startTime"| "endTime", index: number) => void
    handleClickIcon:(event: React.MouseEvent<SVGElement>, note: string, position?: number) => void
    validateTime:(value: TimeValue | null, index: number) => true | "Time is required" | "End time must be later than start time" | "End time should not be 12 midnight,because it is next day";
    field:string;
    indexIcon:number;
    errors:FieldErrors<FormValue>

}

const Schedule: React.FC<ScheduleProgram> =({control,handleChange,handleClickIcon,validateTime,field,indexIcon,errors})=>{
  const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  return (
    <>
    {daysOfWeek.map((day,index) => (
        <div key = {index} className='text-md z-50'>
          <div className='grid grid-cols-[180px_180px] mb-5'> 
            <div className='flex justify-start items-center'>
             <label  className='text-white'>{day}:</label>
            </div>
           <div> 
          
            <div className='flex'> 
              <div className='bg-white mb-2 w-full min-w-full'>
                <Controller name={`startTime ${index}` as `startTime ${number}`} control={control} render={({field}) =>( <TimeInput {...field}  label='Start Time' labelPlacement="outside"  onChange={(value) => {field.onChange(value) 
                  handleChange(value,day,'startTime',index)}}/>)}/>
              </div> 
              <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event)=>handleClickIcon(event,'startTime',index)}/></span>
              {field == 'startTime' && indexIcon == index ?
              (<HelpIcon>Use arrow to change the time or type with keyboard</HelpIcon>)
              :null }
            </div>
           
            <div className='flex'>
            <div className='bg-white w-full min-w-full'>
              <Controller name={`endTime ${index}` as `endTime ${number}`} rules = {{ validate : (value) => validateTime(value,index) }}control={control} render={({field})=>(<TimeInput {...field} label='End Time' labelPlacement="outside" onChange={(value)=> {field.onChange(value)
                handleChange(value,day,'endTime',index)}}/>)}/> 
            </div> 
              <span className='flex items-center text-white'><HiOutlineQuestionMarkCircle className='cursor-pointer' onClick={(event)=>handleClickIcon(event,'endTime',index)} /></span>
              {field == 'endTime' && indexIcon == index ?
              (<HelpIcon>Use arrow to change the time or type with keyboard</HelpIcon>)
              :null }
            </div>
            
              {errors[`endTime ${index}` as `endTime ${number}`] && <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors[`endTime ${index}` as `endTime ${number}`]?.message}</p>}
          </div>
         </div>
        </div> 
         ))}
     </>    
  )
}

export default Schedule