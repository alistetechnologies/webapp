import { DashboardLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

export default function AppRoot() {
  const location = useLocation();

  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className='flex size-full items-center justify-center'>
            <Spinner size='xl' />
          </div>
        }
      >
        {/* <ErrorBoundary
          key={location.key}
          fallback={<div>Something went wrong!!</div>}
        > */}
        <Outlet />
        {/* </ErrorBoundary> */}
      </Suspense>
    </DashboardLayout>
  );
}
