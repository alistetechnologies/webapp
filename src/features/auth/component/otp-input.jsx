import { useState } from 'react';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button/button';

import LoadingButton from '@/components/ui/common/LoadingButton';
import { createAccessToken, verifyOtp } from '../api/otp';
import { useAuth } from '../api/authStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../api/users';
import { useUser } from '../api/userStore';

export function OtpInput() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const userNumber = useAuth.getState().auth?.number;

  const navigate = useNavigate();

  console.log('USER Number - ', userNumber);
  const verifyOtpRequest = async () => {
    if (value.length !== 6) {
      toast.error('Otp must be of 6 characters.');
      return;
    }
    setLoading(true);
    const response = await verifyOtp({
      username: userNumber,
      password: value,
      client: 'automation',
      type: 'otp',
      device: {},
    });

    console.log('VerifyOtp - ', response);
    if (response.success) {
      const token = await createAccessToken({
        token: response.data?.token,
      });

      // Create Access Token failed
      if (!token.success) {
        toast.error('Failed to generate Token!!');
        return;
      }

      if (token.success) {
        useAuth.getState().addTokens({
          refreshToken: token.data?.refreshToken,
          accessToken: token.data?.accessToken,
        });

        const user = await fetchUser();
        console.log('[user] ', user);
        if (Object.keys(user).length > 0) {
          useUser.getState().updateUser(user);

          toast.success('Successfully logged In');
          navigate('/app');
        }
      }
    }

    setLoading(false);
  };

  function onSubmit() {
    e.preventDefault();
  }
  console.log(value);
  return (
    <form className='space-y-4' onSubmit={onSubmit}>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
        autoFocus
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {loading ? (
        <LoadingButton />
      ) : (
        <Button className='w-full' onClick={verifyOtpRequest}>
          Verify Otp
        </Button>
      )}
    </form>
  );
}
