import React from 'react';
import Navbar from '../ui/navbar/navbar';
import Sidebar from '../ui/sidebar/sidebar';

export function DashboardLayout({ children }) {
  return (
    <div className='h-full relative'>
      <div className='hidden h-full md:flex md:w-52   md:flex-col md:inset-y-0 z-[80] md:fixed'>
        <Sidebar />
      </div>
      <main className='md:pl-52 h-full w-full bg-red-30'>
        <Navbar />
        {children}
      </main>
    </div>
  );
}
