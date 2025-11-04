'use client'
import React,{ useRef,useEffect,useState } from 'react';
import Content from './content';
import Footer from './footer';
import '../styles/body.css';


const Body  = () =>{
   
    const sectionRefs = {
        Intro: useRef(null),
        Coaches:useRef(null),
        Stadiums: useRef(null),
        Booking: useRef(null),
        Footer:useRef(null)
      };
    
      const sections = [
        { title: 'Intro', content:'This is some content inside the intro section',image:'intro'},
        { title: 'Coaches', content: 'This is some content inside the coach section.',image:'coach' },
        { title: 'Stadiums', content: 'This is some content inside the stadium section.',image:'stadium' },
        { title: 'Booking', content: 'This is some content inside the booking section.',image:'booking' },
        { title: 'Footer', content:'',image:''}
      ];
      const [currentSection, setCurrentSection] = useState(0);
      const isProcessing = useRef(false);
      const inactivityTimer = useRef(null);

      const scrollToSection = (sectionIndex) => {
        const section = sections[sectionIndex];
        sectionRefs[section.title].current?.scrollIntoView({ behavior: 'smooth' });
        setCurrentSection(sectionIndex);
      };
    
      
      const handleWheel = (event) => {
        
        if (isProcessing.current) return;
    
       
        isProcessing.current = true;
    
       
        requestAnimationFrame(() => {
          if (event.deltaY > 0 && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1); 
          } else if (event.deltaY < 0 && currentSection > 0) {
            scrollToSection(currentSection - 1); 
          }
    
          
          setTimeout(() => {
            isProcessing.current = false; 
          }, 1000); 
        });
      };

      const resetInactivityTimer = () => {
        if (inactivityTimer.current) {
          clearTimeout(inactivityTimer.current);
        }
        inactivityTimer.current = setTimeout(() => {
          if (currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
          } else {
            scrollToSection(0);
          }
        }, 10000); 
      };

      useEffect(() => {
        window.addEventListener('wheel', handleWheel);
        const handleUserActivity = () => {
          resetInactivityTimer();
        };
    
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('click', handleUserActivity);
    
        resetInactivityTimer(); 
        return () =>{
           window.removeEventListener('wheel', handleWheel);
           window.removeEventListener('mousemove', handleUserActivity);
           window.removeEventListener('click', handleUserActivity);

          if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
          }
        }
      }, [currentSection]);
    
   return(
   
    <div className="home-page">
    
    {sections.map((section, index) => (
        <div key={index} ref={sectionRefs[section.title]} className={`section ${section.title == 'Footer'? `${section.title} grid`: `${section.title}`} `}>
             {section.title === 'Footer' ? (
              <Footer />
              ) : (
                <>
                <img
                  src={`/images/${section.image}.jpg`} 
                  alt={section.title} 
                  className="background-image" >
                  </img>
                <Content title={section.title} content={section.content} /> 
                </>   
          )}
         </div>
      ))}

    <div className="navbar">
      <span onClick={() => scrollToSection(0)}>Intro</span>
      <span onClick={() => scrollToSection(1)}>Coaches</span>
      <span onClick={() => scrollToSection(2)}>Stadiums</span>
      <span onClick={() => scrollToSection(3)}>Booking</span>
      <span onClick={() => scrollToSection(4)} className='hidden'>Footer</span>
    </div>

  </div>

   )
}

export default Body;