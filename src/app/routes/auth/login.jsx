import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/features/auth/component/login-form';
import { OtpInput } from '@/features/auth/component/otp-input';
import { useAuth } from '@/features/auth/api/authStore';

export function LoginRoute() {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // 🚀 On mount, if user already logged in → go to /app
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/app', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className='flex flex-col md:flex-row h-full'>
      {/* Left side */}
      <div className='w-full p-5 flex flex-col bg-sky-800/20 flex-1 items-center justify-center'>
        <div className='w-36 mb-14 self-start'>
          <img src='/aliste-logo.png' alt='Aliste Logo' style={{ height: 'auto', width: '100%' }} />
        </div>

        <div className='flex flex-col flex-1 justify-center items-center'>
          <div className='h-auto max-w-[500px]'>
            <img
              src='/login-screen.png'
              alt='Welcome to Aliste Technologies'
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <p className='text-md md:text-lg lg:text-xl text-muted-foreground text-center mt-4'>
            Saving <span className='font-bold'>energy</span> and <b>increasing life</b> of your appliances and machines.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className='flex flex-col items-center justify-center space-y-6 text-center p-5 h-full flex-1'>
        <div className='mb-6'>
          <h2 className='text-2xl md:text-3xl font-medium'>Welcome to Aliste Technologies</h2>
          <p className='text-muted-foreground text-md'>To get started, please enter your mobile number</p>
        </div>

        {otpSent ? <OtpInput /> : <LoginForm setOtpSent={setOtpSent} />}
      </div>
    </div>
  );
}
