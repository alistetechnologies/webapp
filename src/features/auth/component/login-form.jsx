import { Button } from '@/components/ui/button/button';
import LoadingButton from '@/components/ui/common/LoadingButton';
import { useState } from 'react';
import { createOtp } from '../api/otp';
import { useAuth } from '../api/authStore';
import toast from 'react-hot-toast';
import { getBrowserDetails, getDeviceIdentifier } from '@/utils/browser';
import { Spinner } from '@/components/ui/spinner';

export default function LoginForm({ setOtpSent }) {
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function requestOtp() {
    if (number.length !== 10) {
      toast.error('Number should be of 10 characters');
      return;
    }
    setLoading(true);
    const uniqueId = getDeviceIdentifier();
    const { userAgent } = getBrowserDetails();

    useAuth.getState().addNumber(number);

    if (loading) toast.error('Please wait!!');

    const response = await createOtp({
      phoneNumber: number,
      deviceIdentifier: {
        uniqueId,
        userAgent,
      },
      callingCode: '+91',
      countryCode: 'IN',
    });

    console.log('Response - ', response);

    if (!response.success) {
      toast.error(response?.message || 'Failed to send OTP!!');
      setError(response?.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setOtpSent(true);
  }

  function onSubmit() {
    e.preventDefault();
  }

  return (
    <form className='w-[20rem] space-y-4' onSubmit={onSubmit}>
      <input
        className='p-2 border w-full rounded-lg'
        type='number'
        value={number}
        placeholder='Enter your Number...'
        onChange={(e) => setNumber(e.target.value)}
        step='0.01'
      />
      {error && <p className='text-red-400 transition'>{error}</p>}
      {/* {loading ? (
        <LoadingButton />
      ) : (
        <Button
          className='w-full'
          type='submit'
          onClick={requestOtp}
          disabled={loading}
        >
          Get OTP
        </Button>
      )} */}
      <Button
        className='w-full'
        type='submit'
        onClick={requestOtp}
        disabled={loading}
      >
        {loading ? <Spinner /> : 'Get OTP'}
      </Button>
    </form>
  );
}
