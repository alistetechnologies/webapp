import { Bell, ChevronDown, MessageSquareMore } from 'lucide-react';
import { MobileSidebar } from '../sidebar/mobile-sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar/avatar';
import { useUser } from '@/features/auth/api/userStore';

export default function Navbar() {
  const user = useUser.getState().user;
  return (
    <div className='flex items-center p-6 py-8'>
      <MobileSidebar />
      <div className='flex w-full items-center justify-end md:justify-between'>
        <p className='text-lg md:text-2xl font-bold hidden md:flex'>
          Welcome Back, {user.first_name} 👏
        </p>
        {/* <div className="h-8 w-8 bg-slate-700 rounded-full flex justify-center items-center">
          A
        </div> */}

        <div className='flex items-center gap-x-16'>
          <div className='hidden lg:flex'>
            <input
              placeholder='Search anything...'
              className='border p-2 rounded-lg'
            />
          </div>
          <div className='flex items-center gap-x-4'>
            <MessageSquareMore className='h-8 w-8' />
            <p>|</p>
            <Bell className='h-8 w-8' />
          </div>
          <div className='flex items-center gap-x-4'>
            <ChevronDown className='h-5 w-5' />
            <Avatar>
              <AvatarImage src='' />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
            <p className='text-xl font-medium '>{user.first_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
