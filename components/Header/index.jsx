'use client';

import Image from 'next/image';
import favicon from '@/app/favicon.ico';
import Link from 'next/link';
import { Button } from '../ui/button';
import { FaGithub } from 'react-icons/fa';

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
        <Link href='https://github.com/chimpdev/bencan.net'>
          <Button variant='ghost' className='w-max'>
            <FaGithub className='inline-block mr-2' size={20} />
            Source Code
          </Button>
        </Link>
      </div>
    </nav>
  );
}