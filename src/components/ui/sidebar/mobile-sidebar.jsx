import { Button } from '../button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../sheet/sheet';
import Sidebar from './sidebar';

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='p-0'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
