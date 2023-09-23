import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr">
      <Head />
      <body className='min-w-[320px] bg-primaryBackgroundColor text-primaryTextColor min-h-[100dvh]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};