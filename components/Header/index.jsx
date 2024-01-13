'use client';

import Image from 'next/image';
import favicon from '@/app/favicon.ico';
import Link from 'next/link';

export default function Header() {  
  return (
    <nav className='h-[100px] flex items-center justify-between max-w-[1200px] w-full'>
      <Link href='/'>
        <Image
          src={favicon}
          alt='Website logo'
          width={50}
          height={50}
        />
      </Link>

      <div className='flex text-sm gap-x-12'>
        <Link href='https://github.com/chimpdev/bencan.net' className='relative flex justify-center px-3 py-2 font-semibold rounded hover:bg-black hover:text-white'>
          Source Code
        </Link>
      </div>
    </nav>
  );
}