import { Inter } from 'next/font/google';
import '@/styles/tailwind.css';
import '@/styles/main.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'bencan.net',
  description: 'My personal website.',
  keywords: [
    'bencan',
    'bencan.net'
  ],
  authors: [
    { name: 'Discord @ben.can' }
  ],
  creator: 'Discord @ben.can',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex justify-center w-full h-full relative z-[1]'>
          <main className='max-w-[1200px] w-full h-[100dvh] px-16 sm:px-20 xl:px-0'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
