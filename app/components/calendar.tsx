import React,{useEffect,useRef} from 'react'
import {HashLoader} from 'react-spinners';
import { today, getLocalTimeZone, isWeekend,  DateValue} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
// import { useTranslation } from "react-i18next";
import { Calendar } from '@nextui-org/react';
import '../../i18n';

type CalendarProps = {
    isSetupComplete: boolean;
    selectedStadium:string              
    onSetComplete: React.Dispatch<React.SetStateAction<boolean>>; 
    handleDate: React.Dispatch<React.SetStateAction<DateValue>>;
    date: DateValue;
    open:number
  };

const CalendarCom:React.FC<CalendarProps> =  ({isSetupComplete,selectedStadium,onSetComplete,handleDate,date}) =>{
    
    // const {t,i18n}= useTranslation();
    const monthMap = new Map([
        ['Ιανουάριος',1],
        ['Φεβρουάριος', 2],
        ['Μάρτιος', 3],
        ['Απρίλιος', 4],
        ['Μάιος',5],
        ['Ιούνιος',6],
        ['Ιούλιος',7],
        ['Αύγουστος',8],
        ['Σεπτέμβριος',9],
        ['Οκτώβριος',10],
        ['Νοέμβριος',11],
        ['Δεκέμβριος',12]
      ]);
      
    const calendarRef = useRef<HTMLDivElement>(null);
    const { locale } = useLocale();

    // const getDayName = (date: DateValue) => {
    //     // Convert to JavaScript Date (needs a time zone, e.g., UTC)
    //     const jsDate = getDayOfWeek(date, locale);
        
    //   }
  
    useEffect(() => {
       
        const prevSelected = document.querySelector('[class*="bg-blue-500"][class*="rounded"]');

        if (prevSelected) {
            prevSelected.classList.remove('bg-blue-500', 'rounded-full','outline-0');
        }
            const dateSelected = document.querySelector('[data-selected]');
            dateSelected?.classList.add('bg-blue-500', 'rounded-full','outline-0')
        
        }, [date])    

    useEffect(()=>{
       
        const inAppropriateDays =  () => {
            
            const daysOutsideMonth = document.querySelectorAll('[data-outside-month="true"]');
            daysOutsideMonth.forEach(day => {
                if (day.hasAttribute('data-outside-month')) {
                    day.classList.add('hidden');
                  }
            });
        
            const unavailableDays = document.querySelectorAll('[data-unavailable="true"]');
            unavailableDays.forEach(day => {
                if (day.hasAttribute('data-unavailable')) {
                    day.classList.add('line-through', 'opacity-20');
                  }
            })
            const buttons = document.querySelectorAll('button')
            buttons.forEach((button)=>{
                if(button.hasAttribute('data-disabled'))
                button.classList.add('opacity-25');
            })

            const header = document.querySelector('header');
            const child = header?.firstElementChild;
            const indexEmpty = child?.innerHTML.indexOf(' ');
            const month = child?.innerHTML.slice(0,indexEmpty);
            
            let monthNum : number | undefined  = 0;
            
            if(month!=undefined) {monthNum=monthMap.get(month)}
            
            const dateSelected = document.querySelector('[data-selected]');
            const day = dateSelected?.firstElementChild?.innerHTML;
        
            const todayDate = document.querySelector('[data-today="true"]');

            if(day != undefined && date.day == parseInt(day) && date.month == monthNum){
                dateSelected?.classList.add('bg-blue-500', 'rounded-full','outline-0') 
            }else if(date.day!= today(getLocalTimeZone()).day || date.month != today(getLocalTimeZone()).month){
                todayDate?.classList.remove('bg-blue-500', 'rounded-full','outline-0')
            }else{
                if(selectedStadium!=''){
                 todayDate?.classList.add('bg-blue-500', 'rounded-full','outline-0')
                } 
            }
            
           
         };
       
        const observerCallback = () => { 
           inAppropriateDays();
        };  
       
         const observerCalendar = new MutationObserver(observerCallback);
        
         const calendar = calendarRef.current
         let calendarInApprId = 0;
         if (calendar) {     
               if(!isSetupComplete){
                 onSetComplete(true); 
                calendarInApprId =  requestAnimationFrame(() => {
                    inAppropriateDays();
                  });   
               }else{
                inAppropriateDays();
               }
               observerCalendar.observe(calendar,{childList: true, subtree: true})   
        }
        
        return () => {observerCalendar.disconnect() ; cancelAnimationFrame(calendarInApprId)}
    },[date,selectedStadium])

    useEffect(()=>{
        
            if(!selectedStadium){
                const daysDisabled = document.querySelectorAll('[data-disabled="true"]');
                if(daysDisabled){
                    daysDisabled.forEach(day => {
                    if (!day.classList.contains('opacity-20') && !day.hasAttribute('data-outside-month')) {
                        day.classList.add('opacity-25');
                    }
                    if(day.classList.contains('bg-blue-500'))
                        day.classList.remove('bg-blue-500', 'rounded-full','outline-0');
                    });
                }
            }else{  
                const disableToEnable = document.querySelectorAll('[class*="opacity-25"]');
                if(disableToEnable){
                    disableToEnable.forEach(day => {
                        if(!day.hasAttribute('data-disabled'))
                        day.classList.remove('opacity-25');
                    })
                }    
                const today = document.querySelector('[data-today="true"]');
                today?.classList.add('bg-blue-500', 'rounded-full','outline-0')
            }
    },[selectedStadium])

    const getLastDayforTwoNextMonth = () =>{
        const todayDate = today(getLocalTimeZone())
        const firstDate = todayDate.subtract({days:todayDate.day}).add({days:1})
        const firstDayOfThirdMonth = firstDate.add({ months: 3 });

        const lastDayOfSecondMonth = firstDayOfThirdMonth.subtract({ days: 1 });
        return lastDayOfSecondMonth
    }

    const changeDate = (value:DateValue) => {
      
         if(!isWeekend(value, locale)){
           handleDate(value)
        //    getDayName(value)
         }
    }

    const isUnavailable = (dateDeleted:DateValue) => {
         return isWeekend(dateDeleted, locale) || 
         ((dateDeleted.day < today(getLocalTimeZone()).day)  &&
         (dateDeleted.month === today(getLocalTimeZone()).month))
    }

   return (
    <div className='bg-slate-800 grid content-center relative'>
       
                        {!isSetupComplete && 
                        <div className="absolute inset-0 flex items-center justify-center">
                            <HashLoader 
                            color="#f5eceb"
                            loading
                            speedMultiplier={1}
                            />
                        </div>}
                        <Calendar
                            ref={calendarRef as React.RefObject<HTMLDivElement>}
                            disableAnimation
                            className={!isSetupComplete ?'opacity-0 calendar' : 'text-white w-1/2 bg-slate-700 rounded m-auto calendar my-4'}
                            classNames={{
                                headerWrapper: `bg-black rounded ${!isSetupComplete ? 'opacity-0':'opacity-100'}`,
                                gridHeaderRow: `bg-black grid grid-cols-7 ${!isSetupComplete ? 'opacity-0':'opacity-100'}`,
                                gridBodyRow: 'grid grid-cols-7 px-4'
                            }}
                            onChange={changeDate}
                            minValue={today(getLocalTimeZone()).subtract({days:0})}
                            maxValue={getLastDayforTwoNextMonth()}
                            isDateUnavailable={isUnavailable}
                            isDisabled={!selectedStadium}
                        />
                    </div>
   )
}

export default CalendarCom;