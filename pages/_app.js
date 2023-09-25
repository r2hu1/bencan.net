import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import 'tippy.js/dist/tippy.css';
import Head from 'next/head';
import { useThemeStore } from '@/stores';
import { useEffect } from 'react';
import { useCookie } from 'react-use';
import { MdDarkMode } from 'react-icons/md';
import { BiSolidSun } from 'react-icons/bi';
import '@/styles/prism.css';
import '@/styles/prism-vsc-dark-plus.css';

export default function App({ Component, pageProps }) {

  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
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
      <NextNProgress color={theme === 'dark' ? '#4f4f4f' : '#ededed'} height={3} />
      <div className='min-w-[320px] bg-light-primary dark:bg-dark-primary text-light-primaryText dark:text-dark-primaryText min-h-[100dvh]'>
        <Component {...pageProps} />
      </div>

      <div className='z-10 absolute top-0 left-0 w-full h-full flex justify-end items-end p-8 pointer-events-none'>
        <div className='bg-light-tertiary dark:bg-dark-tertiary w-8 h-8 rounded-full hover:opacity-60 pointer-events-auto cursor-pointer fixed text-light-primaryText dark:text-dark-primaryText flex items-center justify-center' onClick={() => toggleTheme()}>
          {theme === 'dark' ? (
            <BiSolidSun />
          ) : (
            <MdDarkMode />
          )}
        </div>
      </div>
    </>
  );
};