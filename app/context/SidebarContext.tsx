'use client'
import { ReactNode, useContext } from 'react';
import {createActionContext, createTypedContext} from './createContext/GenericContext'
import { useCustomSidebar } from './createContext/CustomSidebar';
import {ContextActions, ContextType} from './createContext/InterfaceContext' 
import { GenericContextProvider } from './createContext/ContextProvider';
import React from 'react'

interface State{
    isOpenSidebar: boolean;
}

interface Actions{
    handleSidebar:(state?:boolean) => void
}

const SidebarContext = createTypedContext<State>();
const ActionsContext = createActionContext<Actions>();

interface SidebarProviderProps{
    children:ReactNode
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const {isOpenSidebar , handleSidebar} = useCustomSidebar()
    

  return (
    // <SidebarContext.Provider value={{state:{isOpenSidebar}}}>
    //   <ActionsContext.Provider value={{actions:{handleSidebar}}}>
    //     {children}
    //   </ActionsContext.Provider>
    // </SidebarContext.Provider>
    <GenericContextProvider
      contextType={SidebarContext}
      contextActions={ActionsContext}
      state={{ isOpenSidebar }}
      actions={{ handleSidebar }}
      // eslint-disable-next-line react/no-children-prop
      children={children}
    />
  );
};

 const useSidebar = () :  ContextType<State> => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
   return context;
};

 const useSidebarActions = () :  ContextActions<Actions> => {
  const context = useContext(ActionsContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
   return context;
};

export const useSidebarContext = () => {
  return {
    ...useSidebar(),
    ...useSidebarActions()
  };
};

