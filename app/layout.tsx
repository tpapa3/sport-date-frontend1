import './styles/globals.css';
import { SidebarProvider } from './context/SidebarContext'
import { Suspense } from 'react';
import Spinner from '../app/components/Spinner';
import QueryProvider from "./reactQuery/queryProvider"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


//import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import store,{ persistor } from './redux/store';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        {/* <Provider store={store}> 
       <PersistGate loading='null' persistor={persistor}> */}
        <QueryProvider>
          <SidebarProvider>
            <Suspense fallback={<Spinner />}>
              {children}
            </Suspense>
          </SidebarProvider>
          <ReactQueryDevtools initialIsOpen={true}/>
        </QueryProvider>
        {/* </PersistGate>
        </Provider> */}
      </body>
    </html>
  );
}
