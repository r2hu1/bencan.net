import Seperator from './Seperator';
import social from '@/data/social.json';
import { LuArrowUpRight } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <Seperator />
      <div className="mx-6 flex flex-col">
        <h1 className='text-lg'>
          Bana Ulaş
        </h1>

        <div className='flex flex-row text-sm text-light-tertiaryText dark:text-dark-tertiaryText mt-2'>
          {social.map((item, index) => (
            <Link className={twMerge(
              'w-full py-2 text-center hover:opacity-80 cursor-pointer font-semibold social-button',
              index === 0 ? 'rounded-lg rounded-r-none' : '',
              index === social.length - 1 ? 'rounded-xl rounded-l-none' : '',
            )} style={{ backgroundColor: item.color + '20', color: item.color, '--color': item.color + '50' }} key={index} href={item.url} target='_blank'>
              {item.name}
              <LuArrowUpRight className='inline-block ml-1' />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};