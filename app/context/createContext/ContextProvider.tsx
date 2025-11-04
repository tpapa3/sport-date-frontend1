import React,{ ReactNode } from 'react';
import { ContextActions, ContextType } from './InterfaceContext';

type ContextProviderProps<T, A> = {
  contextType: React.Context<ContextType<T> | null>;
  contextActions: React.Context<ContextActions<A> | null>;
  state: T;
  actions: A;
  children: ReactNode;
};

export function GenericContextProvider<T, A>({
  contextType:StateContext,
  contextActions:ActionContext,
  state,
  actions,
  children,
}: ContextProviderProps<T, A>):JSX.Element {
   
  return (
    <StateContext.Provider value={{ state }}>
      <ActionContext.Provider value={{ actions }}>
        {children}
      </ActionContext.Provider>
    </StateContext.Provider>
 );
}