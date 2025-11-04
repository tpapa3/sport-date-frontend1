import React, { forwardRef } from "react";

const ModalHeaderCustom = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    (props,ref) => {
        
        return <div ref={ref} {...props} ></div>;
    }
);
ModalHeaderCustom.displayName = "ModalHeaderCustom";  

export default ModalHeaderCustom;