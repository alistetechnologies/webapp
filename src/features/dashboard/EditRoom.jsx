import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { api } from '@/lib/apiClient';
import { serverUrl } from '@/constants/config';
import { Edit2 } from 'lucide-react';
import { fetchHouse } from './api/house';

const RoomDialog = ({ roomId, roomName, houseId }) => {
  const [open, setOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState(roomName);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await api.post(
        `${serverUrl.sub}/v3/room/updateRoomName`,
        {
          roomId,
          roomName: newRoomName,
        }
      );

      await fetchHouse(houseId);
      console.log('Room updated:', response.data);
      setOpen(false); // Close modal on success
    } catch (error) {
      console.error('Error updating room:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className='cursor-pointer'>
        <Edit2 />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Room Name</DialogTitle>
        </DialogHeader>
        <Input
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder='Enter new room name'
        />
        <Button onClick={handleSubmit} disabled={loading || !newRoomName}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDialog;
