import { useState } from 'react';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button/button';

import LoadingButton from '@/components/ui/common/LoadingButton';
import { createAccessToken, createOtp, verifyOtp } from '../api/otp';
import { useAuth } from '../api/authStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../api/users';
import { useUser } from '../api/userStore';
import { Spinner } from '@/components/ui/spinner';
import CountdownTimer from '@/components/ui/common/CountdownTimer';
import { getBrowserDetails, getDeviceIdentifier } from '@/utils/browser';

export function OtpInput() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [optLoading, setOtpLoading] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  const userNumber = useAuth.getState().auth?.number;

  const navigate = useNavigate();

  async function requestOtp() {
    // if (number.length !== 10) {
    //   toast.error('Number should be of 10 characters');
    //   return;
    // }
    setOtpLoading(true);
    const uniqueId = getDeviceIdentifier();
    const { userAgent } = getBrowserDetails();

    // useAuth.getState().addNumber(number);

    if (loading) toast.error('Please wait!!');

    const response = await createOtp({
      phoneNumber: userNumber,
      deviceIdentifier: {
        uniqueId,
        userAgent,
      },
      callingCode: '+91',
      countryCode: 'IN',
    });

    if (!response.success) {
      toast.error(response?.message || 'Failed to send OTP!!');
      setOtpLoading(false);
      return;
    }
    setOtpLoading(false);
    // setOtpSent(true);
  }

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
      {/* {loading ? (
        <LoadingButton />
      ) : (
        <Button className='w-full' onClick={verifyOtpRequest}>
          Verify Otp
        </Button>
      )} */}

      <Button className='w-full' onClick={verifyOtpRequest} disabled={loading}>
        {loading ? <Spinner /> : 'Verify'}
      </Button>

      <p className='text-lg font-medium hover:underline flex justify-center items-center gap-2'>
        Didn't receive yet?
        {timerFinished ? (
          <span
            className='text-red-500 font-semibold hover:underline cursor-pointer'
            onClick={requestOtp}
          >
            {optLoading ? <Spinner className='text-red-500' /> : 'Resend OTP'}
          </span>
        ) : (
          <CountdownTimer setFinished={setTimerFinished} />
        )}
      </p>
    </form>
  );
}
