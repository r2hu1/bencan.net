import Header from '@/pages/components/Header';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import fs from 'fs';
import OpacityMotion from '@/pages/components/OpacityMotion';
import { LuBookMarked } from 'react-icons/lu';

export function ArticleCard(props) {
  return (
    <motion.div className='flex justify-between' {...props}>
      <Link className='relative flex flex-col w-full p-4 transition-all duration-100 ease-in-out cursor-pointer gap-y-2 bg-light-secondary dark:bg-dark-secondary hover:bg-light-tertiary dark:hover:bg-dark-tertiary rounded-2xl hover:scale-105' href={`/articles/${props.data.filename.replace('.md', '')}`}>
        <Image className='w-full h-[150px] absolute top-0 left-0 rounded-t-2xl object-cover' src={props.data.metadata.image} alt='Article Image' width={700} height={300} quality={100} />
        <span className='text-xs text-light-tertiaryText dark:text-dark-tertiaryText pt-[150px]'>{new Date(props.data.metadata.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <h2 className='text-lg font-semibold'>{props.data.metadata.title}</h2>
        <p className='text-base text-light-secondaryText dark:text-dark-secondaryText'>
          {props.data.metadata.description}
        </p>
      </Link>
    </motion.div>
  );
};

export default function Articles({ articles }) {
  const [limit, setLimit] = useState(3);

  return (
    <>
      <Head>
        <title>{`bencan.net: Makaleler`}</title>
        <meta name="description" content="Genel olarak yazılım ve teknoloji üzerine yazdığım makaleler." />
        <meta name="keywords" content="bencan, bencan.net, bencan.net, bencan.net, bencan.net" />
        <meta name="author" content="Discord @ben.can" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`bencan.net: Makaleler`} />
        <meta property="og:description" content="Genel olarak yazılım ve teknoloji üzerine yazdığım makaleler." />
        <meta property="og:image" content="https://bencan.net/images/og-image.png" />
        <meta property="og:url" content="https://bencan.net/articles" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />

        <meta name="twitter:title" content={`bencan.net: Makaleler`} />
        <meta name="twitter:description" content="Genel olarak yazılım ve teknoloji üzerine yazdığım makaleler." />
        <meta name="twitter:image" content="https://bencan.net/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="canonical" href="https://bencan.net/articles" />
      </Head>

      <div className="flex justify-center w-full h-full">

        <div className="w-full min-h-[100dvh] max-w-[700px] px-6 mb-12">
          <Header />

          <OpacityMotion>
            <div className="flex flex-col mx-6 mt-28">
              <h1 className='flex items-center text-lg gap-x-1'>
                <LuBookMarked /> Makaleler
              </h1>

              <div className='flex flex-col my-8 gap-y-8'>
                {articles.slice(0, limit).map((article, index) => (
                  <ArticleCard className='flex justify-between' key={index} data={article} />
                ))}
              </div>

              <button className={twMerge(
                'bg-light-secondary dark:bg-dark-secondary hover:bg-light-tertiary hover:dark:bg-dark-tertiary duration-300 ease-in-out transition-all text-sm text-light-primaryText dark:text-dark-primaryText rounded w-full py-2 font-medium',
                limit >= articles.length ? 'opacity-0 translate-y-5 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
              )} onClick={() => {
                if (limit >= articles.length) return;
                setLimit(limit + 3);
              }}>
                Load More ({limit}/{articles.length})
              </button>
            </div>
          </OpacityMotion>
        </div>

      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const files = fs.readdirSync(`${process.cwd()}/public/articles`);
    const articles = files.map(filename => {
      const markdownContent = fs.readFileSync(`${process.cwd()}/public/articles/${filename}`).toString();
      const withoutMetadata = markdownContent.split('---').slice(2).join('---');
      const metadata = markdownContent.split('---')[1].split('\n').reduce((acc, curr) => {
        const [key, value] = curr.split(': ');
        if (!key || key == '\r') return acc;

        return { ...acc, [key]: value };
      }, {});

      return {
        filename,
        metadata,
        markdownContent,
        markdownWithoutMetadata: withoutMetadata
      };
    });

    const articlesSortedByDate = articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
      props: {
        articles: articlesSortedByDate || []
      }
    };
  } catch (error) {
    throw new Error(error);
  }
};