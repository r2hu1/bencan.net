import Header from '@/pages/components/Header';
import { motion } from 'framer-motion';
import InlineLink from '@/pages/components/InlineLink';
import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Head from 'next/head';
import OpacityMotion from '@/pages/components/OpacityMotion';
import { LuPalmtree } from 'react-icons/lu';

export function WebsiteCard(props) {
  return (
    <motion.div className='flex justify-between w-full h-full' {...props}>
      <div className='flex flex-col max-w-[383px] gap-y-2 w-full'>
        <span className='text-xs text-light-tertiaryText dark:text-dark-tertiaryText'>{props.data.year}</span>
        <h2 className='text-sm sm:text-lg font-semibold truncate max-w-[100px] mobile:max-w-full'>{props.data.name}</h2>
        <p className='text-xs sm:text-base text-light-secondaryText dark:text-dark-secondaryText'>
          {props.data.description}
        </p>
        {props.data.link && (
          <InlineLink to={props.data.link} className='text-lg text-light-primaryText dark:text-dark-primaryText'>
            Git
          </InlineLink>
        )}
      </div>

      {props.data.image && (
        <div className='bg-light-secondary dark:bg-dark-secondary rounded-2xl h-full min-h-[145px] max-w-[145px] w-full flex justify-center relative overflow-hidden ml-2'>
          <Image src='/iPhoneMockup.png' width={100} height={145} alt='iPhone Mockup' className='mt-4 z-[1]' />
          <Image src={props.data.image} width={90} height={145} alt='Website Mockup' className='absolute top-6' />
        </div>
      )}
    </motion.div>
  );
};

export default function Websites({ createdWebsites }) {
  const [limit, setLimit] = useState(3);

  return (
    <>
      <Head>
        <title>{`bencan.net: Websites I Made`}</title>
        <meta name="description" content="Websites I made using some technologies." />
        <meta name="keywords" content="bencan, bencan.net, bencan.net, bencan.net, bencan.net" />
        <meta name="author" content="Discord @ben.can" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`bencan.net: Yaptığım Websiteler`} />
        <meta property="og:description" content="Websites I made using some technologies." />
        <meta property="og:image" content="https://bencan.net/images/og-image.png" />
        <meta property="og:url" content="https://bencan.net/websites" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />

        <meta name="twitter:title" content="bencan.net" />
        <meta name="twitter:description" content="Websites I made using some technologies." />
        <meta name="twitter:image" content="https://bencan.net/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="canonical" href="https://bencan.net/websites" />
      </Head>

      <div className="flex justify-center w-full h-full">
        <div className="w-full min-h-[100dvh] max-w-[700px] px-6 mb-12">
          <Header />
          <OpacityMotion>
            <div className="flex flex-col mx-6 mt-28">
              <h1 className='flex items-center text-lg gap-x-1'>
                <LuPalmtree /> Websites I Made
              </h1>

              <p className='mt-4 text-sm text-light-secondaryText dark:text-dark-secondaryText'>
                Websites I made using some technologies to improve myself and help others.
              </p>

              <div className='flex flex-col my-8 gap-y-8'>
                {createdWebsites.slice(0, limit).map((website, index) => (
                  <WebsiteCard className='flex justify-between' key={index} data={website} />
                ))}
              </div>

              <button className={twMerge(
                'text-sm flex items-center justify-center flex-1 w-full px-4 py-2 border-2 cursor-pointer gap-x-1 text-light-primaryText dark:text-dark-primaryText rounded-xl gap-y-2 bg-light-secondary dark:bg-dark-secondary border-light-tertiary dark:border-dark-tertiary hover:dark:bg-dark-tertiary hover:bg-light-tertiary',
                limit >= createdWebsites.length ? 'opacity-0 translate-y-5 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
              )} onClick={() => {
                if (limit >= createdWebsites.length) return;
                setLimit(limit + 3);
              }}>
                See More ({limit}/{createdWebsites.length})
              </button>
            </div>
          </OpacityMotion>
        </div>
      </div>
    </>
  );
};

export function getStaticProps() {
  const createdWebsites = require('@/data/createdWebsites.json');
  return {
    props: {
      createdWebsites
    },
    revalidate: 60 * 60 * 24
  };
};