import React, { createContext, ReactNode, useContext} from 'react';


interface DropdownContextProps{
    dropdown:string;
    handleDropdown :(e:React.MouseEvent,value:string)=>void;
}

const DropdownContext = createContext<DropdownContextProps|null>(null);


function useDropdown(): DropdownContextProps {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Toggle compound components must be rendered within the Toggle component');
  }
  return context;
}

type DropdownList = {
    className:string;
    children:ReactNode;
    dropdown:string;
    setDropdown:(value: string) => void;
 }

const Dropdown:React.FC<DropdownList>  & {
    Title: React.FC<DropdownTitle>;
    Select: React.FC<DropdownSelect>;
    Options: React.FC<DropdownOptions>} = ({className,children,dropdown,setDropdown}) =>{
    const handleDropdown = (e:React.MouseEvent, value:string) => {
      e.stopPropagation();
      setDropdown(value)
    }
    return (
        <DropdownContext.Provider value={{ dropdown, handleDropdown }}>
            <div className = {className}>{children}</div> 
        </DropdownContext.Provider>    
    )
}

type DropdownTitle = {
    title:string;
}

const Title:React.FC<DropdownTitle> = ({title})=>{
   return (
    <div className='text-white text-lg'>
        Choose {title}
    </div>
   )
}

type DropdownSelect = {
    value:string;
    field:string;
    disabled:boolean;
    children:ReactNode;
}

const Select : React.FC<DropdownSelect> =({value,field,disabled,children}) =>{
    const {handleDropdown} = useDropdown()
     return(
        <div aria-disabled={disabled}>
           <button onClick={(e)=>handleDropdown(e,value)} className={`w-32 rounded-md relative ${disabled ? 'bg-gray-500' : 'bg-white'}`} disabled={disabled}><span className='text-black'>{field != ''? field : `Select ${value}`}</span>   
            {children}
           </button>
        </div>
     )
}



type DropdownOptions = {
    value:string;
    array:{ name: string; id: number; }[] | undefined
    handleChangeDropdown : (event:React.MouseEvent<HTMLOptionElement> )=> void
}

const Options : React.FC<DropdownOptions> = ({value,array,handleChangeDropdown}) =>{
    const {dropdown,handleDropdown} = useDropdown() 

   return ( 
        
        <div className='bg-white absolute w-32 rounded border-2 border-gray-950 max-h-24 overflow-y-auto'>
        {dropdown == value ?
           array?.map((element) => (
        <option key={element.id} value={element.name} onClick={(e)=>{handleChangeDropdown(e); handleDropdown(e,' ')}}  className='text-black hover:text-gray-700'>
            {element.name}
        </option>))
          : 
          null}
        </div> 
   )
}


Dropdown.Title = Title;
Dropdown.Select = Select;
Dropdown.Options = Options;

export default Dropdown;