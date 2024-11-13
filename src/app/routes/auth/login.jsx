// import { useAuth } from '@/features/auth/api/auth-store';
// import { createOtp } from '@/features/auth/api/create-otp';
import LoginForm from '@/features/auth/component/login-form';
import { OtpInput } from '@/features/auth/component/otp-input';

import { useState } from 'react';

export function LoginRoute() {
  const [otpSent, setOtpSent] = useState(false);

  console.log('[otpSent]', otpSent);

  return (
    <div className='flex flex-col md:flex-row h-full'>
      <div className='w-full p-5 flex flex-col bg-sky-800/20 flex-1 items-center ustify-center'>
        {/* <div className=''> */}
        <div className='w-36 mb-14 self-start'>
          <img
            src='/aliste-logo.png'
            style={{ height: 'auto', width: '100%' }}
          />
        </div>
        <div className='h-auto max-w-[500px]'>
          <img
            src='/login-screen.png'
            alt='Welcome to Aliste Technologies'
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        {/* </div> */}
        <p className='text-md md:text-lg lg:text-xl text-muted-foreground text-center mt-4 align-bottom'>
          Saving <span className='font-bold'>energy</span> and{' '}
          <b>increasing life</b> of your appliances and machines.
        </p>
      </div>
      <div className='flex flex-col items-center justify-center space-y-6 text-center p-5 h-full flex-1'>
        <div className='mb-6'>
          <h2 className='text-2xl md:text-3xl font-medium'>
            Welcome to Aliste Technologies
          </h2>
          <p className='text-muted-foreground text-md'>
            To get started, please enter your mobile number
          </p>
        </div>

        {otpSent ? (
          <div>
            <OtpInput />
          </div>
        ) : (
          <LoginForm setOtpSent={setOtpSent} />
        )}
        {/* <div className="w-[20rem] space-y-4">
          <input
            className="p-2 border w-full rounded-lg"
            type="number"
            placeholder="Enter your Number..."
            onChange={(e) => setNumber(e.target.value)}
          />
          {error && <p className="text-red-400 transition">{error}</p>}
          <Button className="w-full" onClick={requestOtp}>
            Get OTP
          </Button>
        </div> */}
      </div>
    </div>
  );
}
