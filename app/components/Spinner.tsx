import {PacmanLoader} from 'react-spinners';

const Spinner : React.FC = () =>{
   
   return (
     <div className='flex justify-center items-center h-screen w-full'>
       <PacmanLoader/>
     </div>
   )
}

export default Spinner;