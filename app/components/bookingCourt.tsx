import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaMinus } from "react-icons/fa";
import  VivaPayments  from '../payments/VivaPayments'
import { CourtDataType } from "../book/page";



interface BookingCourtProps{
    bookCourt:CourtDataType[]
    deleteCourt:(index: number) => void
    price:number;
}
interface FormValue{
    name:string;
    surname:string;
    telephone:string;
    email:string;
}

const BookingCourt:React.FC<BookingCourtProps> = ({bookCourt,deleteCourt,price}) =>{

 const{register,handleSubmit,reset,formState:{errors}} = useForm<FormValue>()
 const onSubmit:SubmitHandler<FormValue> = async (data) => {
    
    const payment = await VivaPayments(data,price);
    if(payment?.redirectUrl){
      const url = payment.redirectUrl;
      window.location.href=url
      reset()
     
    }
    
}
  return(
    <div className='grid grid-cols-1 mt-6 mx-2 bg-slate-800 mb-6'>
               <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='border-2 border-slate-950 mx-2 my-2'>
                        <div className='bg-slate-950 h-12 flex items-center justify-center'>
                            <p className='text-white text-lg'>Booking Details</p>
                        </div>
                        <div className='grid grid-cols-2 mt-4 '>
                            <div className='flex flex-col w-3/4 m-auto'>
                                <p className='text-white font-semibold'>Name:</p>
                                <input {...register("name",{required:{value:true,message:'The name is required'}, 
                                pattern:{value:/^[Α-Ωα-ωA-Za-z]+$/, message:'Allowed only characters'}})} className='rounded h-6' placeholder='Name'/>
                                <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap mt-2'>{errors.name && errors.name.message}</p>
                            </div>
                           
                            <div className='flex flex-col w-3/4 m-auto'>
                                <p className='text-white font-semibold'>Surname:</p>
                                <input {...register("surname",{required:{value:true,message:'The surname is required'}, 
                                pattern:{value:/^[Α-Ωα-ωA-Za-z]+$/, message:'Allowed only characters'}})} className='rounded h-6' placeholder='Surname'/>
                                <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap mt-2'>{errors.surname && errors.surname.message}</p>
                            </div>
                            
                            <div className='flex flex-col w-3/4 m-auto'>
                                <p className='text-white font-semibold'>Telephone:</p>
                                <input {...register("telephone",{required:{value:true,message:'The telephone is required'}, 
                                pattern:{value:/^[0-9]+$/, message:'Allowed only number'}, validate:(event)=>event.length == 10 ? true : 'Allowed 10 digits' })} 
                                className='rounded h-6' placeholder='Telephone'/>
                                <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap mt-2'>{errors.telephone && errors.telephone.message}</p>
                            </div>
                            
                            
                            <div className='flex flex-col w-3/4 m-auto'>
                                <p className='text-white font-semibold'>Email:</p>
                                <input {...register("email",{required:{value:true,message:'The email is required'}, 
                                pattern:{value:/^[a-zA-Z0-9]([a-zA-Z0-9]|(\.[a-zA-Z0-9])){4,28}[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, message:'this is not a correct form of email'}})} className='rounded h-6' placeholder='Email'/>
                                <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap mt-2'>{errors.email && errors.email.message}</p>
                            </div>
                           
                        </div>
                        <div className='mt-2 mb-2'>
                          <div className={`${bookCourt.length > 0 && 'border-2 border-white w-7/8 m-auto'}`}>
                            { bookCourt.map( (court,index)  => (
                              <Fragment key={index} > 
                               <div className='bg-gray-900 rounded my-6 mx-6'>
                                    <div className='float-right px-4 py-4 flex items-center hover:cursor-pointer' onClick={()=>deleteCourt(index)}><FaMinus className='text-white mr-2'/><span className='text-white'>Delete</span></div> 
                                    <div className='grid grid-cols-2 w-1/2 py-4'> 

                                        <div  className='text-white italic flex justify-center border-b-2 border-white'><div className='bg-blue-500 rounded w-24'><span className='flex justify-center'>Sport:</span></div></div>
                                        <div  className='text-white flex justify-center border-b-2 border-white'><div className='bg-blue-500 rounded w-24'><span className='flex justify-center'>{court.sport}</span></div></div>
                                         
                                        <div  className='text-white italic flex justify-center border-b-2 border-white'><div className='rounded w-24'><span className='flex justify-center'>Town:</span></div></div>
                                        <div  className='text-white flex justify-center border-b-2 border-white'><div className='rounded w-24'><span className='flex justify-center'>{court.town}</span></div></div>
                                         
                                        <div  className='text-white italic flex justify-center border-b-2 border-white'><div className='bg-blue-500 rounded w-24'><span className='flex justify-center'>Stadium:</span></div></div>
                                        <div  className='text-white flex justify-center border-b-2 border-white'><div className='bg-blue-500 rounded w-24'><span className='flex justify-center'>{court.stadium.name}</span></div></div>

                                        <div  className='text-white italic flex justify-center border-b-2 border-white'><div className='w-24'><span className='flex justify-center'>Name:</span></div></div>
                                        <div  className='text-white flex justify-center border-b-2 border-white'><div className='w-24'><span className='flex justify-center'>{court.court.name}</span></div></div>

                                        <div  className='text-white italic flex justify-center border-b-2 border-white'><div className='bg-blue-500 rounded w-24'><span className='flex justify-center'>Category:</span></div></div>
                                        <div  className="text-white flex justify-center border-b-2 border-white "><div className='bg-blue-500 rounded w-24'><span className='flex justify-center'>{court.category}</span></div></div>

                                        <div  className='text-white italic flex justify-center border-b-2 border-white '><div className='w-24'><span className='flex justify-center'>Date:</span></div></div>
                                        <div  className='text-white flex justify-center border-b-2 border-white'><div className='w-24'><span className='flex justify-center'>{court.courtDate?.day}/{court.courtDate?.month}/{court.courtDate?.year}</span></div></div>

                                        <div  className='text-white italic flex justify-center'><div className='bg-blue-500 rounded w-24'><span className='flex justify-center'>Hour:</span></div></div>
                                        <div  className='text-white flex justify-center'><div className='bg-blue-500 rounded w-24'><span className='flex justify-center'>{court.courtHour}</span></div></div>
                                               
                                    </div>
                                    
                               </div> 
                               <div  className=' border-4 border-gray-950  mx-6' ></div>
                               </Fragment> 
                           ))}
                           {price > 0 && 
                           <>
                                <div className='bg-gray-900 rounded my-6 mx-6'>
                                        <div className='px-8 py-6 '>
                                            <div className='text-white italic text-lg'>Total Price</div>
                                                <div className='bg-gray-700 rounded-full flex items-center justify-center mt-2 w-32 h-32 '>
                                                    <span className='text-white text-xl'>  
                                                        {price} $
                                                    </span>      
                                                </div>
                                        </div>    
                                </div>
                                <div className='bg-gray-900 rounded my-6 mx-6'>
                                    <div className='flex items-center justify-center py-4'>
                                        <input type='submit' value='Reserve' className='text-white bg-gray-700 rounded p-4 hover:cursor-pointer'/>
                                    </div>
                                </div>  
                                
                           </>
                           }
                          
                          </div>
                        </div>
                    
                    </div>
               </form>    
    </div>       
  )
}

export default BookingCourt;