import { createContext } from "react";
import {ContextType} from '../createContext/InterfaceContext'
import {ContextActions} from '../createContext/InterfaceContext'

export function createTypedContext<T>() {
  return createContext<ContextType<T> | null>(null);
}

export function createActionContext<A>(){
  return createContext<ContextActions<A> | null>(null);
}

