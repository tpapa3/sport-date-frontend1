'use client'
import Link from "next/link";
import BodyLayout from "../components/bodyLayout";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Image from "next/image"
import { SubmitHandler, useForm } from "react-hook-form";

interface RegisterForm{
    fullname:string;
    "Email address":string;
    password:string;
}

const Register : React.FC = () =>{
    const { register, handleSubmit,formState: { errors }} = useForm<RegisterForm>({
            defaultValues: {
            fullname:'',
            "Email address":'',
            password:''
            } 
        })
    const onSubmit: SubmitHandler<RegisterForm> = (data) => console.log(data)
  return(
     <BodyLayout overflow='hidden'>
        <Header />
        <Sidebar />
      <div className='flex items-center justify-center h-screen'>   
        <div className='grid grid-cols-2 w-1/2 bg-slate-800 rounded-lg'>  
            <div className='grid grid-rows-2 bg-slate-900 border-r-2 border-slate-900 rounded-lg'>
                    <div className='flex flex-col justify-center items-center'>
                        {["Enjoy","your","game"].map((word,index)=>(
                           <p key={index} className='uppercase text-white text-4xl'>{word}</p>
                        ))}    
                    </div> 
                    <div className='w-full relative'>
                        <Image
                            src="/images/register.jpg" 
                            fill={true}
                            quality={80}
                            alt="register"
                        />
                    </div>   
            </div> 
             <form onSubmit={handleSubmit(onSubmit)}>   
            <div className='grid grid-rows-[1fr_3fr_1fr]'>
                <div className='m-auto'>
                  <h1 className='text-white text-center text-lg '>Create an account</h1>
                </div>
                <div className='grid grid-rows-4'>
                    <div className='flex flex-col w-1/2 mx-auto'>
                        <label className='text-white'>Fullname</label>
                        <input {...register("fullname",{required:{value:true,message:'The name is required'}, 
                         pattern:{value:/^[Α-Ωα-ωA-Za-z]+$/, message:'Allowed only letters'}})} />
                     <p className='w-3/4 text-red-500 text-xs max-w-fit text-wrap'>{errors.fullname && errors.fullname.message}</p>
                    </div>
                    <div className='flex flex-col w-1/2 mx-auto'>
                        <label className='text-white'>Email address</label>
                        <input {...register('Email address',{required:{value:true, message:'the email is required'},
                        pattern:{value:/^[a-zA-Z0-9]([a-zA-Z0-9]|(\.[a-zA-Z0-9])){4,28}[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, message:'this is not a correct form of email'}})} 
                        className='rounded-md' placeholder='email'/>
                        <p className='text-red-500 text-xs max-w-fit text-wrap'>{errors['Email address'] && errors['Email address'].message}</p>
                    </div>
                    <div className='flex flex-col w-1/2 mx-auto'>
                        <label className='text-white'>Passsword</label>
                         <input {...register('password',{required:{value:true, message:'the password is required'},
                        pattern:{value:/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{8,}$/, message:'the password should contain at least 1 capital letter, 1 number and 1 special character'}})} 
                        className='rounded-md' placeholder='password'/>
                        <p className='text-red-500 text-xs max-w-fit text-wrap'>{errors.password && errors.password.message}</p>
                    </div>
                    <div className='w-1/2 m-auto mt-2 bg-slate-900 rounded-md text-center'>
                       <button className='text-white'>Register</button>
                    </div>
                </div>
                 <div className='m-auto'>
                      <p className='text-white'>Already have an account?<Link href='/login'><span className='hover:underline'>Log in</span></Link></p>
                  </div>
              
            </div>  
            
        </form>
        </div>
      </div>  
      
        
       
     </BodyLayout>
  )
}

export default Register;