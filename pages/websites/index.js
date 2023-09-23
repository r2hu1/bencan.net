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
        <span className='text-xs text-tertiaryTextColor'>{props.data.year}</span>
        <h2 className='text-sm sm:text-lg font-semibold truncate max-w-[100px] mobile:max-w-full'>{props.data.name}</h2>
        <p className='text-xs sm:text-base text-secondaryTextColor'>
          {props.data.description}
        </p>
        {props.data.link && (
          <InlineLink to={props.data.link} className='text-lg text-primaryTextColor'>
            Git
          </InlineLink>
        )}
      </div>

      {props.data.image && (
        <div className='bg-secondaryBackgroundColor rounded-2xl h-full min-h-[145px] max-w-[145px] w-full flex justify-center relative overflow-hidden ml-2'>
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
        <title>{`bencan.net: Yaptığım Websiteler`}</title>
        <meta name="description" content="Bazı teknolojileri kullanarak yaptığım websiteler." />
        <meta property="og:description" content="Bazı teknolojileri kullanarak yaptığım websiteler." />
        <meta property="og:url" content="https://bencan.net/websites" />
        <meta name="twitter:description" content="Bazı teknolojileri kullanarak yaptığım websiteler." />
      </Head>

      <div className="w-full h-full flex justify-center">
        <div className="w-full min-h-[100dvh] max-w-[700px] px-6 mb-12">
          <Header />
          <OpacityMotion>
            <div className="mx-6 mt-28 flex flex-col">
              <h1 className='text-lg flex items-center gap-x-1'>
                <LuPalmtree /> Yaptığım Websiteler
              </h1>

              <p className='text-secondaryTextColor text-sm mt-4'>
                Bazı teknolojileri kullanarak hem kendimi geliştirmek için hemde başkalarına yardımcı olmak için yaptığım websiteler.
              </p>

              <div className='my-8 flex flex-col gap-y-8'>
                {createdWebsites.slice(0, limit).map((website, index) => (
                  <WebsiteCard className='flex justify-between' key={index} data={website} />
                ))}
              </div>

              <button className={twMerge(
                'bg-secondaryBackgroundColor hover:bg-tertiaryBackgroundColor duration-300 ease-in-out transition-all text-sm text-primaryTextColor rounded w-full py-2 font-medium',
                limit >= createdWebsites.length ? 'opacity-0 translate-y-5 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
              )} onClick={() => {
                if (limit >= createdWebsites.length) return;
                setLimit(limit + 3);
              }}>
                Daha fazla yükle ({limit}/{createdWebsites.length})
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