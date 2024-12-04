import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getBrowserDetails, getDeviceIdentifier } from '@/utils/browser';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../api/authStore';
import { createAccessToken, loginUserWithPasswordApi } from '../api/otp';
import { fetchUser } from '../api/users';
import { useUser } from '../api/userStore';
import { useNavigate } from 'react-router-dom';

export function LoginWithPassword({ setPasswordLogin }) {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    if (number.length !== 10) {
      toast.error('Invalid Number!!');
      return;
    }

    // setLoading(true);

    const uniqueId = getDeviceIdentifier();
    const { userAgent } = getBrowserDetails();

    useAuth.getState().addNumber(number);

    if (loading) toast.error('Please wait!!');

    console.log('Reached to request');
    const response = await loginUserWithPasswordApi({
      phoneNumber: number,
      password,
      device: {
        uniqueId,
        userAgent,
      },
      callingCode: '+91',
      countryCode: 'IN',
    });
    console.log('[response]', response);
    if (!response.success) {
      toast.error(response?.message || 'Failed to send OTP!!');
      setError(response?.message);
      setLoading(false);
      return;
    }

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

      setLoading(false);
    }
    setLoading(false);
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

      <input
        className='p-2 border w-full rounded-lg'
        type='password'
        value={password}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
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
      <Button className='w-full' type='submit' disabled={loading}>
        {loading ? <Spinner /> : 'Login'}
      </Button>
    </form>
  );
}
