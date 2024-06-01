import React from 'react'
import { ReactNode} from 'react';
import '../app/globals.css';

interface MainProps {
  children: ReactNode;
}


const Main = ({children}: MainProps) => {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-1/2 flex flex-col items-center">
          {children}
        </div>
      </main>
    );
  };
  
export default Main