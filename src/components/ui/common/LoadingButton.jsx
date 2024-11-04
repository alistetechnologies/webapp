import { Button } from '@/components/ui/button/button';
import { Spinner } from '@/components/ui/spinner';

export default function LoadingButton() {
  return (
    <Button className='w-full'>
      <Spinner />
    </Button>
  );
}
