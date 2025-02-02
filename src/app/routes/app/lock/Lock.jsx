import { Spinner } from '@/components/ui/spinner'
import Filter from '@/features/dashboard/filter'
import React from 'react'

function Lock() {
    const [selectedHouse, setSelectedHouse] = useState({
        value: user?.selectedHouse || '',
      });
  return (
    <div className='w-full h-full bg-[#EAEBF0] p-8 overflow-y-scroll'>
    <Filter

      house={selectedHouse}
      setSelectedHouse={setSelectedHouse}
      date={date}
      setDate={setDate}
    />

    {loading && (
      <div className='flex justify-center items-center h-full w-full bg-[#EAEBF0]'>
        <Spinner size='lg' />
      </div>)
}
      </div>
    )}


export default Lock