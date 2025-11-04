'use client'
import React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import BodyLayout from '../components/bodyLayout';


const About : React.FC = () => {
    return(
      <BodyLayout overflow='auto'> 
       <Header />
       <Sidebar />
       <div className='relative z-0'>
            <img
                    src='/images/about.jpg'
                    alt='about' 
                    className="w-full h-full object-cover" >
            </img>
           <div className = 'absolute inset-0 flex items-center justify-end z-10'>
                 <div className = 'bg-transparent w-1/2'>
                    <h1 className='text-center text-2xl font-black text-white'>About Us</h1>
                        <p className='pt-4 text-white'>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. 
                            Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. 
                            Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
                            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. 
                            Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
                        </p>
                </div>      
            </div>     
        </div>
         <Footer />
        
        </BodyLayout>   
    );    
}

export default About;
