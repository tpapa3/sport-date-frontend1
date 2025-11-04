import React from 'react';
import {Modal, ModalContent, ModalBody, ModalFooter,Button} from "@nextui-org/react";
import ModalHeaderCustom from './modalHeader';

interface PopUpProps {
    title: string;
    content?: string;
    isOpen:boolean;
    isClose: () => void;
    children?:React.ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({title,content,isOpen,isClose,children}) => {

   return(
   <> 
    <Modal isOpen={isOpen} onClose={isClose}
    size='xs'
    className='bg-slate-950 text-white text-lg mx-auto my-auto w-96 shadow rounded'
    classNames={{ header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton:"top-3 right-2"}}
    >
        <ModalContent >
            {() => (
                <>
                    <ModalHeaderCustom  className="py-4 px-4 border-b-[1px] border-[#292f46] font-medium">{title}</ModalHeaderCustom>
                    <ModalBody >
                        <div>{content == undefined ? children : content}</div>
                    </ModalBody>
                    <ModalFooter className="pb-2">
                        <Button color="danger" variant="light" onPress={()=>
                            isClose() 
                        }>
                        Close
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
   </>
   )
} 

export default PopUp;