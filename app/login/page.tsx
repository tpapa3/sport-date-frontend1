'use client'
import BodyLayout from "../components/bodyLayout";
import Image from 'next/image';
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Link from "next/link";
import styles from "./styles.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import {  signIn} from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";


interface LoginForm {
 username:string;
 password:string;
}

const Login:React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit,formState: { errors }} = useForm<LoginForm>({
        defaultValues: {
        username:'',
        password:''
        } 
    })
    
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    
    const toastId = toast.loading('Loading toast');

    const response = await signIn("credentials",{username:data.username,password:data.password,redirect:false})
    
    if(response?.error) {
     
      toast.update(toastId, {
        render: response.error,
        type: "error",
        isLoading: false,
        autoClose: 3000,
     });
    }else{
       toast.update(toastId, {
        render: "Signed in!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
    });
     router.push(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}`)
    }
    
  }
  
 return(
    <BodyLayout overflow = 'hidden'>
        <Header />
        <Sidebar />
        <ToastContainer/>
        <div className='grid grid-cols-2 justify-items-center h-screen'>
            <div className='flex items-center'> 
                <Image
                    src="/images/academy.jpg" 
                    height={145} 
                    width={140}
                    alt="academy"
                />
                <h1 className='text-2xl text-white ml-4'>Training Academy</h1> 
                <div className='grid grid-rows-2 mx-4'>
                  <Image
                      src="/images/ball.jpg" 
                      height={145} 
                      width={140}
                      alt="ball"
                      className={styles.bounce}
                  />
                  <div className = 'w-full border-t-2 border-yellow-200'></div>
                </div>
            </div>
            
            <div className='rounded-md bg-slate-800 w-1/2 m-auto shadow-lg'>
              <form onSubmit={handleSubmit(onSubmit)} className='h-full'>
                <div className='grid grid-rows-[1fr_3fr_1fr] h-full'>
                  <div className='m-auto'>
                    <h1 className='text-xl text-white pt-2'>Login</h1>
                   
                  </div>    
                  <div className='grid grid-rows-3'>
                    <div className='flex flex-col mx-auto w-1/2 '>
                       <label className='text-white'>Email address</label>
                       <input {...register('username',{required:{value:true, message:'the email is required'},
                        pattern:{value:/^[a-zA-Z0-9]([a-zA-Z0-9]|(\.[a-zA-Z0-9])){4,28}[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, message:'this is not a correct form of email'}})} 
                        className='rounded-md' placeholder='email'type='text'/>
                        <p className='text-red-500 text-xs max-w-fit text-wrap'>{errors['username'] && errors['username'].message}</p>
                    </div>
                    <div className='flex flex-col w-1/2 mx-auto'>
                        <label className='text-white'>Password</label>
                        <input {...register('password',{required:{value:true, message:'the password is required'},
                        pattern:{value:/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{8,}$/, message:'the password should contain at least 1 capital letter, 1 number and 1 special character'}})} 
                        className='rounded-md' placeholder='password' type='password'/>
                        <p className='text-red-500 text-xs max-w-fit text-wrap'>{errors.password && errors.password.message}</p>
                    </div>
                    <div className='flex flex-col w-1/2 m-auto'>
                      <button className='text-white text-md bg-slate-900 rounded-md' aria-label='sign in'>Sign in</button>
                      <p className='p-1 text-white uppercase text-center'>-or-</p>
                      <button className='text-white text-md bg-slate-900 rounded-md ' aria-label='sign in with google'>Sign in Google</button>
                    </div>  
                  </div> 
                  <div className='m-auto'>
                      <p className='text-white'>Don&apos;t have an account?<Link href='/register'><span className='hover:underline'>Register</span></Link></p>
                  </div>
                 
                </div> 
              </form>    
            </div>
        </div>
    </BodyLayout>
 )
}
export default Login;