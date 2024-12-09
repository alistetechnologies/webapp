import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react';
import { DurationInput } from './DurationInput';
import { Spinner } from '@/components/ui/spinner';
import { convertTimeStringTo12Hour } from '@/utils/format';
import { ChevronRight } from 'lucide-react';
import useHouseStore from '@/features/dashboard/houseStore';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DeviceTypeMap } from '@/constants/config';

export function UpdateAutoTimer({ data, deviceId }) {
  const houseData = useHouseStore((state) => state.house);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [stopTime, setStopTime] = useState('');
  const [onTime, setOnTime] = useState(0);
  const [offTime, setOffTime] = useState(0);

  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [active, setActive] = useState('Always');

  const [appliancesData, setAppliancesData] = useState([]);

  console.log('[data in Update]', data);
  // console.log('[Data]', );
  // console.log(
  //   'startTime || stopTime',
  //   startTime,
  //   stopTime,
  //   active,
  //   onTime,
  //   offTime,
  //   data.autoTimers.turnOffAfter,
  //   data.autoTimers.turnOnAfter
  // );

  useEffect(() => {
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
      }

      setAppliancesData(appliances);
    };
    applianceData();
  }, [houseData]);

  useEffect(() => {
    if (!open) return;

    setActive(data.autoTimers.mode);

    // set On Time & Off Time
    setOnTime(data.autoTimers.turnOffAfter);
    setOffTime(data.autoTimers.turnOnAfter);

    // Set startTime & stopTime
    if (data.autoTimers.mode === 'Particular') {
      const startTimeDate = new Date(data.autoTimers.startTime);
      const stopTimeDate = new Date(data.autoTimers.stopTime);

      setStartTime(
        `${String(startTimeDate.getHours()).padStart(2, '0')}:${String(
          startTimeDate.getMinutes()
        ).padStart(2, '0')}`
      );

      setStopTime(
        `${String(stopTimeDate.getHours()).padStart(2, '0')}:${String(
          stopTimeDate.getMinutes()
        ).padStart(2, '0')}`
      );
    }

    // setSelected appliances
    let selected;
    for (const appliance of appliancesData) {
      if (
        appliance.value.switchId === data.switchId &&
        appliance.value.deviceId === deviceId
      ) {
        selected = appliance;
        break;
      }
    }

    setSelectedAppliances(selected);
  }, [data, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          className='flex justify-between text-sm text-blue-700 font-semibold cursor-pointer hover:underline'
          onClick={() => setOpen(true)}
        >
          <p className='text-sm text-blue-700 font-semibold'>
            Run Time:{' '}
            {data?.autoTimers?.mode === 'Always'
              ? 'Always'
              : `${convertTimeStringTo12Hour(
                  data?.autoTimers?.startTime
                )} to ${convertTimeStringTo12Hour(data?.autoTimers?.stopTime)}`}
          </p>
          <ChevronRight />
        </div>
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
          <Tabs
            defaultValue={active}
            onValueChange={(value) => {
              setActive(value);
              setStartTime('');
              setStopTime('');
            }}
          >
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='Always'>Always</TabsTrigger>
              <TabsTrigger value='Particular'>Particular Time</TabsTrigger>
            </TabsList>
            <TabsContent value='Always' className='space-y-4'>
              <DurationInput
                on={onTime}
                setOn={setOnTime}
                setOff={setOffTime}
                off={offTime}
              />
              <p className='text-sm text-muted-foreground'>
                The Ac will be turned off for the selected frequency in every
                selected interval
              </p>

              <Select
                options={appliancesData}
                isMulti={true}
                placeholder='Select Appliances'
                closeMenuOnSelect={false}
                value={selectedAppliances}
                onChange={(selected) => setSelectedAppliances(selected)}
              />

              <Button
                className='w-full'
                onClick={() => createAutoTimers()}
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Create'}
              </Button>
            </TabsContent>

            <TabsContent value='Particular' className='space-y-4'>
              <div className='flex justify-between mt-4'>
                <div className='flex flex-col gap-4'>
                  <p>Start Time</p>
                  <Input
                    type='time'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>

                <div className='flex flex-col gap-4'>
                  <p>Stop Time</p>
                  <Input
                    type='time'
                    value={stopTime}
                    onChange={(e) => setStopTime(e.target.value)}
                  />
                </div>
              </div>
              <p className='text-sm text-muted-foreground'>
                The energy savings system will run only for the selected window
                of time.
              </p>

              <DurationInput setOn={setOnTime} setOff={setOffTime} />

              <p className='text-sm text-muted-foreground'>
                The AC will be turned off for the selected frequency in every
                selected interval.
              </p>

              <Select
                options={appliancesData}
                isMulti={true}
                placeholder='Select Appliances'
                closeMenuOnSelect={false}
                value={selectedAppliances}
                onChange={(selected) => setSelectedAppliances(selected)}
              />

              <Button
                className='w-full'
                onClick={() => createAutoTimers()}
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Create'}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
