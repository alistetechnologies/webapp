import React, { useEffect, useState } from 'react';

export default function Commands({ analysisData }) {
  const [smartCommands, setSmartCommands] = useState(0);
  const [switchCommands, setSwitchCommands] = useState(0);

  function calculateCommands() {
    let smartCommands = 0;
    let switchCommands = 0;

    for (const device of analysisData) {
      for (const s of device) {
        switchCommands += s?.toggles?.switch;
        smartCommands += s?.toggles?.aliste;
      }
    }

    setSmartCommands(smartCommands);
    setSwitchCommands(switchCommands);
  }

  useEffect(() => {
    if (analysisData?.length === 0) return;
    calculateCommands();
  }, [analysisData]);
  return (
    <>
      <div className='col-span-2 p-4 flex items-center justify-center'>
        <span className='text-xl font-bold'>{smartCommands}/</span>
        <span className='text-sm'>{smartCommands + switchCommands}</span>
      </div>

      <div className='col-span-2 p-4 flex items-center justify-center'>
        <span className='text-xl font-bold'>{switchCommands}/</span>
        <span className='text-sm'>{smartCommands + switchCommands}</span>
      </div>
    </>
  );
}
