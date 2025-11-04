import { ReactNode } from "react";

interface HelpIconProps {
    children: ReactNode; 
  }

const HelpIcon:React.FC<HelpIconProps> = ({children}) =>{
   return (
    <div className='flex items-center justify-center bg-white min-w-[180px] rounded-xl shadow-xl'>
        <span className='text-black text-xs'>{children}</span>
    </div>
   )
}

export default HelpIcon;