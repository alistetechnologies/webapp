import { Bell, ChevronDown, MessageSquareMore } from 'lucide-react';
import { MobileSidebar } from '../sidebar/mobile-sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar/avatar';
import { useUser } from '@/features/auth/api/userStore';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = useUser.getState().user;

  const navigate = useNavigate();

  return (
    <div className='flex items-center p-6 py-4'>
      <MobileSidebar />
      <div className='flex w-full items-center justify-end md:justify-between'>
        <p className='text-lg md:text-2xl font-bold hidden md:flex'>
          Hello, {user.first_name}
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
            <MessageSquareMore className='size-6' />
            <p>|</p>
            <Bell className='size-6' />
          </div>
          <div className='flex items-center gap-x-4'>
            <Popover>
              <PopoverTrigger>
                <ChevronDown className='h-5 w-5' />
              </PopoverTrigger>
              <PopoverContent className='p-0 w-[200px]'>
                <div className='flex flex-col'>
            
                  <div
                    className='p-4 hover:bg-neutral-200 border border-b-1 cursor-pointer font-semibold'
                    onClick={() => navigate('/')}
                  >
                    Logout
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Avatar>
              <AvatarImage src='' />
              <AvatarFallback>{user?.first_name[0]}</AvatarFallback>
            </Avatar>
            <p className='text-xl font-medium '>{user.first_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
