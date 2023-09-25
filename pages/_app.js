import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import { useThemeStore } from '@/stores';
import { useEffect } from 'react';
import { useCookie } from 'react-use';
import { MdDarkMode } from 'react-icons/md';
import { BiSolidSun } from 'react-icons/bi';
import { CgDarkMode } from 'react-icons/cg';
import '@/styles/prism.css';
import '@/styles/prism-vsc-dark-plus.css';
import { twMerge } from 'tailwind-merge';
import 'react-medium-image-zoom/dist/styles.css'

export default function App({ Component, pageProps }) {

  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);
  const [storedTheme, setThemeCookie] = useCookie('theme');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setThemeCookie('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setThemeCookie('light');
    };
  }, [theme]);

  useEffect(() => {
    if (storedTheme === 'dark') setTheme('dark');
    else setTheme('light');
  }, []);

  return (
    <>
      <NextNProgress color={theme === 'dark' ? '#4f4f4f' : '#d9d9d9'} height={6} />
      <div className='min-w-[320px] bg-light-primary dark:bg-dark-primary text-light-primaryText dark:text-dark-primaryText min-h-[100dvh]'>
        <Component {...pageProps} />
      </div>

      <div className='z-10 absolute top-0 left-0 w-full h-full flex justify-end items-end p-8 pointer-events-none'>
        <Tippy inertia={true} interactive={true} content={<div className='-mx-2 -my-0.5 flex flex-row gap-y-1 items-center justify-center pointer-events-auto text-light-primaryText dark:text-dark-primaryText'>
          <div className={twMerge(
            'w-max px-1.5 py-1 bg-[#e7e7e7] hover:bg-[#e2e2e2] dark:bg-[#181818] hover:dark:bg-[#202020] rounded-l cursor-pointer',
            theme === 'dark' && 'pointer-evets-none opacity-60 cursor-default hover:bg-[#e7e7e7] dark:hover:bg-[#181818]'
          )} onClick={() => setTheme('dark')}>
            <MdDarkMode size={18} />
          </div>

          <div className={twMerge(
            'w-max px-1.5 py-1 bg-[#e7e7e7] hover:bg-[#e2e2e2] dark:bg-[#181818] hover:dark:bg-[#202020] rounded-r cursor-pointer',
            theme === 'light' && 'pointer-evets-none opacity-60 cursor-default hover:bg-[#e7e7e7] dark:hover:bg-[#181818]'
          )} onClick={() => setTheme('light')}>
            <BiSolidSun size={18} />
          </div>
        </div>}>
          <div className='bg-light-tertiary dark:bg-dark-tertiary w-8 h-8 rounded-full hover:opacity-60 pointer-events-auto cursor-pointer fixed text-light-primaryText dark:text-dark-primaryText flex items-center justify-center'>
            <CgDarkMode />
          </div>
        </Tippy>
      </div>
    </>
  );
};