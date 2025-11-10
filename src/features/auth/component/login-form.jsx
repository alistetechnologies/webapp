import { Button } from '@/components/ui/button/button';
import LoadingButton from '@/components/ui/common/LoadingButton';
import { useState } from 'react';
import { createOtp } from '../api/otp';
import { useAuth } from '../api/authStore';
import toast from 'react-hot-toast';
import { getBrowserDetails, getDeviceIdentifier, isOctiot } from '@/utils/browser';
import { Spinner } from '@/components/ui/spinner';
import { LoginWithPassword } from './login-with-password';

export default function LoginForm({ setOtpSent }) {
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordLogin, setPasswordLogin] = useState(isOctiot ? true : false);

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

    if (!response.success) {
      toast.error(response?.message || 'Failed to send OTP!!');
      setError(response?.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setOtpSent(true);
  }

  function onSubmit(e) {
    e.preventDefault();
  }
console.log(passwordLogin)
  if (passwordLogin) {
    return (
      <div className="w-[20rem] space-y-4">
        <LoginWithPassword setPasswordLogin={setPasswordLogin} />
        {
          !isOctiot && <p
          className="text-sm hover:underline mt-0 cursor-pointer"
          onClick={() => setPasswordLogin(false)}
        >
          Use OTP
        </p>
        }
       
      </div>
    );
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

      <p
        className='text-sm hover:underline mt-0 cursor-pointer'
        onClick={() => setPasswordLogin(true)}
      >
        Use Password
      </p>
    </form>
  );
}
