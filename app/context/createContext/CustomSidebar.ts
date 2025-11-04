import { useState } from 'react' 

export function useCustomSidebar(){
const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleSidebar = (state?:boolean) => {
    setIsOpenSidebar((prev) => (state !== undefined ? state:!prev));
  };

  return{
    isOpenSidebar,
    handleSidebar
  }
}