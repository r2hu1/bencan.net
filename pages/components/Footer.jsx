import Seperator from './Seperator';
import social from '@/data/social.json';
import { LuArrowUpRight, LuGithub } from 'react-icons/lu';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <Seperator />
      <div className="flex flex-col mx-6">
        <h1 className='text-lg'>
          Contact
        </h1>

        <div className='flex flex-wrap w-full gap-2 mt-2 text-sm text-light-tertiaryText dark:text-dark-tertiaryText'>
          {social.map(item => (
            <Link className='flex min-w-[200px] items-center justify-center flex-1 w-full px-4 py-2 border-2 cursor-pointer gap-x-1 text-light-primaryText dark:text-dark-primaryText rounded-xl gap-y-2 bg-light-secondary dark:bg-dark-secondary border-light-tertiary dark:border-dark-tertiary hover:dark:bg-dark-tertiary hover:bg-light-tertiary' href={item.url} target='_blank'>
              {item.name}
              <LuArrowUpRight />
            </Link>
          ))}

          <Link className='flex items-center justify-center flex-1 w-full px-4 py-2 border-2 cursor-pointer gap-x-1 text-light-primaryText dark:text-dark-primaryText rounded-xl gap-y-2 bg-light-secondary dark:bg-dark-secondary border-light-tertiary dark:border-dark-tertiary hover:dark:bg-dark-tertiary hover:bg-light-tertiary' href='https://github.com/chimpdev/bencan.net'>
            Source Code
            <LuGithub />
          </Link>
        </div>
      </div>
    </>
  );
};