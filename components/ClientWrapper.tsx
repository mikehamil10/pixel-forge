'use client';

import { Toaster } from 'react-hot-toast';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="bottom-center" />

      {children}
    </>
  );
}
