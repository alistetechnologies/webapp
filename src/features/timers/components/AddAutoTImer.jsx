import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeviceTypeMap } from '@/constants/config';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import Select from 'react-select';

export function AddAutoTImer({ houseData }) {
  const [appliancesData, setAppliancesData] = useState([]);

  useEffect(() => {
    console.log('here');
    const applianceData = () => {
      const appliances = [];

      if (!houseData?.rooms) return;

      for (const room of houseData?.rooms) {
        for (let d of room.devices) {
          for (let s of d.switches) {
            if (s.deviceType !== DeviceTypeMap.NA) {
              appliances.push({
                value: {
                  deviceId: d.deviceId,
                  switchId: s.switchId,
                },
                label: `${s.switchName} - ${room.roomName}`,
              });
            }
          }
        }
        console.log('[Appliance Data] ', appliances);
      }

      setAppliancesData(appliances);
    };
    applianceData();
  }, [houseData]);
  return (
    <Dialog>
      <DialogTrigger>
        <Button className='mb-4'>
          <Plus />
          Add Auto Timers
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Auto Timers</DialogTitle>
          <DialogDescription>
            Set up your energy savings system by fixing the frequency of
            regulating your appliances operation. For example, you can set your
            AC to turn off for 5 minutes every 30 minutes during the night :
            Thereby reducing your power consumption by 17%
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <h4 className='text-lg font-bold'>Run Time</h4>
          <Tabs defaultValue='Always'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='Always'>Always</TabsTrigger>
              <TabsTrigger value='Particular'>Particular Time</TabsTrigger>
            </TabsList>
            <TabsContent value='Always'>
              <div className='flex justify-between mt-4'>
                <div className='flex flex-col gap-4'>
                  <p>Start Time</p>
                  <Input type='time' />
                </div>

                <div className='flex flex-col gap-4'>
                  <p>Stop Time</p>
                  <Input type='time' />
                </div>
              </div>
              <div className='flex justify-between mt-4'>
                <div className='flex flex-col gap-4'>
                  <p>On Time</p>
                </div>

                <div className='flex flex-col gap-4'>
                  <p>Off Time</p>
                  <Input type='time' />
                </div>
              </div>
            </TabsContent>

            <TabsContent value='Particular' className='space-y-4'>
              <div className='flex justify-between mt-4'>
                <div className='flex flex-col gap-4'>
                  <p>Start Time</p>
                  <Input type='time' />
                </div>

                <div className='flex flex-col gap-4'>
                  <p>Stop Time</p>
                  <Input type='time' />
                </div>
              </div>
              <p className='text-sm text-muted-foreground'>
                The energy savings system will run only for the selected window
                of time.
              </p>

              <div className='flex justify-between mt-4'>
                <div className='flex flex-col gap-4'>
                  <p>On Time</p>
                  <Input type='time' />
                </div>

                <div className='flex flex-col gap-4'>
                  <p>Off Time</p>
                  <Input type='time' />
                </div>
              </div>

              <p className='text-sm text-muted-foreground'>
                The AC will be turned off for the selected frequency in every
                selected interval.
              </p>

              <Select
                options={appliancesData}
                isMulti={true}
                placeholder='Select Appliances'
              />

              <Button className='w-full'>Create</Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
