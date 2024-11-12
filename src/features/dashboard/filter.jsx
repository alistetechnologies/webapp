import Select from 'react-select';
import { fetchUserHouses } from './api/house';
import { useUser } from '../auth/api/userStore';
import { useEffect, useState } from 'react';

let rerender = 0;

export default function Filter({ house, setSelectedHouse, date, setDate }) {
  const [options, setOptions] = useState([]);

  const user = useUser.getState().user;

  useEffect(() => {
    const getUserHouses = async () => {
      const response = await fetchUserHouses(user?.email);

      const options = response?.masterOf?.map((h) => ({
        label: h?.houseName,
        value: h?.houseAccessCode,
      }));
      setOptions(options);
    };
    getUserHouses();
  }, [user]);

  rerender += 1;

  const houseName = options.find((h) => {
    return h?.value === house?.value;
  });

  return (
    <div className='w-full bg-white p-4 mb-6 rounded-md'>
      <div className='space-y-4 flex gap-4 items-center'>
        <h2 className='font-semibold text-2xl hover:underline'>House:</h2>

        <Select
          options={options}
          placeholder='Select a house'
          value={houseName}
          onChange={(value) => setSelectedHouse(value)}
          className='flex-1'
        />

        <input
          type='date'
          className='border p-2 rounded-md border-[rgb(204,204,204)] hover:border-slate-600 w-52'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    </div>
  );
}
