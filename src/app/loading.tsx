import React from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

function Loader() {
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-br from-pink-50 to-blue-50'>
      <div className='relative'>
        {/* Outer spinning border with pink gradient */}
        <div className='animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-pink-500 border-opacity-70'></div>
        
        {/* Middle spinning border with green gradient */}
        <div className='absolute top-0 left-0 h-32 w-32 rounded-full border-t-4 border-b-4 border-green-500 border-opacity-50 animate-spin-slow'></div>
        
        {/* Inner spinning border with blue gradient */}
        <div className='absolute top-0 left-0 h-32 w-32 rounded-full border-t-4 border-b-4 border-blue-500 border-opacity-30 animate-spin-slower'></div>
        
        {/* Center icon with pulse animation */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <LoaderIcon size={48} className="text-pink-600 opacity-90 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default Loader;