import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import 'tippy.js/dist/tippy.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{`bencan.net: Anasayfa`}</title>
        <meta name="description" content="Benim kişisel web sitem." />
        <meta name="keywords" content="bencan, bencan.net, bencan.net, bencan.net, bencan.net" />
        <meta name="author" content="Discord @ben.can" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="bencan.net" />
        <meta property="og:description" content="Benim kişisel web sitem." />
        <meta property="og:image" content="https://bencan.net/images/og-image.png" />
        <meta property="og:url" content="https://bencan.net" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />

        <meta name="twitter:title" content="bencan.net" />
        <meta name="twitter:description" content="Benim kişisel web sitem." />
        <meta name="twitter:image" content="https://bencan.net/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="canonical" href="https://bencan.net" />
      </Head>

      <NextNProgress color='#4f4f4f' height={3} />
      <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className='min-w-[320px] bg-primaryBackgroundColor text-primaryTextColor min-h-[100dvh]'>
        <Component {...pageProps} />
      </div>
    </>
  );
};