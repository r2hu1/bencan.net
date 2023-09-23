import Header from '@/pages/components/Header';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import fs from 'fs';

export function ArticleCard(props) {
  return (
    <motion.div className='flex justify-between' {...props}>
      <Link className='flex flex-col gap-y-2 w-full bg-secondaryBackgroundColor hover:bg-tertiaryBackgroundColor p-4 rounded-2xl relative hover:scale-105 transition-all duration-100 ease-in-out cursor-pointer' href={`/articles/${props.data.filename.replace('.md', '')}`}>
        <Image className='w-full h-[150px] absolute top-0 left-0 rounded-t-2xl object-cover' src={props.data.metadata.image} alt='Article Image' width={700} height={300} />
        <span className='text-xs text-tertiaryTextColor pt-[150px]'>{new Date(props.data.metadata.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <h2 className='text-lg font-semibold'>{props.data.metadata.title}</h2>
        <p className='text-base text-secondaryTextColor'>
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
        <meta property="og:description" content="Genel olarak yazılım ve teknoloji üzerine yazdığım makaleler." />
        <meta property="og:url" content="https://bencan.net/articles" />
        <meta name="twitter:description" content="Genel olarak yazılım ve teknoloji üzerine yazdığım makaleler." />
      </Head>

      <div className="w-full h-full flex justify-center">

        <div className="w-full min-h-[100dvh] max-w-[700px] px-6 mb-12">
          <Header />
          <div className="mx-6 mt-28 flex flex-col">
            <h1 className='text-lg'>
              Makaleler
            </h1>

            <div className='my-8 flex flex-col gap-y-8'>
              {articles.slice(0, limit).map((article, index) => (
                <ArticleCard className='flex justify-between' key={index} data={article} />
              ))}
            </div>

            <button className={twMerge(
              'bg-secondaryBackgroundColor hover:bg-tertiaryBackgroundColor duration-300 ease-in-out transition-all text-sm text-primaryTextColor rounded w-full py-2 font-medium',
              limit >= articles.length ? 'opacity-0 translate-y-5 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
            )} onClick={() => {
              if (limit >= articles.length) return;
              setLimit(limit + 3);
            }}>
              Load More ({limit}/{articles.length})
            </button>
          </div>
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