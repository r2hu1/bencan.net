'use client';

import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ReactLenis } from '@studio-freight/react-lenis';
import '@/styles/tailwind.css';
import '@/styles/main.css';

const inter = Inter({ subsets: ['latin'] });
  
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactLenis root options={{
        syncTouch: true
      }}>
        <body className={inter.className}>
          <div className='flex justify-center w-full h-full relative z-[1]'>
            <main className='max-w-[1200px] w-full h-[100dvh] px-8 sm:px-20 xl:px-0'>
              {children}
            </main>
            <Toaster />
          </div>
        </body>
      </ReactLenis>
    </html>
  );
}
