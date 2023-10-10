import Header from '@/pages/components/Header';
import Image from 'next/image';
import { LuCalendarDays, LuTimer, LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Head from 'next/head';
import fs from 'fs';
import OpacityMotion from '@/pages/components/OpacityMotion';
import Prism from '@/public/prism';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Zoom from 'react-medium-image-zoom';
import InlineLink from '@/pages/components/InlineLink';
import Link from 'next/link';

const components = {
  h1: ({ node, ...props }) => <h1 className='text-xl font-semibold' {...props} />,
  h2: ({ node, ...props }) => <h2 className='text-lg font-semibold' {...props} />,
  h3: ({ node, ...props }) => <h3 className='text-base font-semibold' {...props} />,
  h4: ({ node, ...props }) => <h4 className='text-sm font-semibold' {...props} />,
  h5: ({ node, ...props }) => <h5 className='text-xs font-semibold' {...props} />,
  h6: ({ node, ...props }) => <h6 className='text-xs font-semibold' {...props} />,
  hr: ({ node, ...props }) => <div className='w-full h-[2px] bg-light-tertiary dark:bg-dark-tertiary' {...props}>&thinsp;</div>,
  img: ({ node, ...props }) => {
    return (
      <div className='flex flex-col my-4 text-xs gap-y-2'>
        <Zoom classDialog='[&>[data-rmiz-modal-overlay]]:bg-black/0 [&_button]:hidden [&_img]:rounded-lg'>
          <Image {...props} width={1000} height={400} className='rounded-lg object-cover max-h-[400px] h-full' quality={100} />
        </Zoom>
        <span className='text-center text-light-tertiaryText dark:text-dark-tertiaryText'>{props.alt}</span>
      </div>
    )
  },
  li: ({ node, ...props }) => <li className='text-sm' {...props} />,
  ul: ({ node, ...props }) => <ul className='list-disc list-inside' {...props} />,
  ol: ({ node, ...props }) => <ol className='flex flex-col px-4 list-decimal list-outside gap-y-2' {...props} />,
  p: ({ node, ...props }) => <p className='items-center text-sm text-light-secondaryText dark:text-dark-secondaryText' {...props} />,
  strong: ({ node, ...props }) => <strong className='font-semibold' {...props} />,
  a: ({ node, ...props }) => <InlineLink {...props} />,
  pre: ({ node, ...props }) => {
    const [copied, setCopied] = useState(false);
    let language = props.children[0].props.className.split('-')[1];

    const copyToClipboard = () => {
      if (copied) return;

      navigator.clipboard.writeText(props.children[0].props.children).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      });
    };

    return (
      <pre className={`relative rounded-lg overflow-x-auto p-4 !text-sm language-${language} line-numbers !whitespace-pre-wrap`} {...props}>
        <div className='inter font-medium !text-neutral-100 absolute top-3 right-3 text-sm flex gap-1.5 items-center select-none'>
          <div className='bg-[#242424] px-3 py-1 rounded'>
            {language}
          </div>

          <div className={twMerge(
            'bg-[#242424] hover:bg-[#323232] px-3 py-1 rounded cursor-pointer',
            copied && 'opacity-60 cursor-default hover:bg-[#242424]'
          )} onClick={copyToClipboard}>
            {copied ? 'Kopyalandı' : 'Kopyala'}
          </div>
        </div>

        <code>
          {props.children[0].props.children}
        </code>
      </pre>
    );
  }
};

export default function Articles({ data, backArticle, nextArticle }) {

  const wordsPerMinute = 200;
  const numberOfWords = data.markdownWithoutMetadata.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  useEffect(() => {
    if (typeof window !== 'undefined') Prism.highlightAll();
  }, []);

  return (
    <>
      <Head>
        <title>{`bencan.net: ${data.metadata.title}`}</title>
        <meta name="description" content={data.metadata.description} />
        <meta name="keywords" content="bencan, bencan.net, bencan.net, bencan.net, bencan.net" />
        <meta name="author" content="Discord @ben.can" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`bencan.net: ${data.metadata.title}`} />
        <meta property="og:description" content={data.metadata.description} />
        <meta property="og:image" content={`https://bencan.net/_next/image?url=${data.metadata.image}&w=2048&q=75`} />
        <meta property="og:url" content={`https://bencan.net/articles/${data.filename.replace('.md', '')}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />

        <meta name="twitter:title" content={`bencan.net: ${data.metadata.title}`} />
        <meta name="twitter:description" content={data.metadata.description} />
        <meta name="twitter:image" content={`https://bencan.net/_next/image?url=${data.metadata.image}&w=2048&q=75`} />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="canonical" href={`https://bencan.net/articles/${data.filename.replace('.md', '')}`} />
      </Head>

      <div className="flex justify-center w-full h-full">

        <div className="w-full min-h-[100dvh] max-w-[700px] px-6 mb-12">
          <Header />
          <OpacityMotion>
            <div className="flex flex-col mx-6 mt-28">
              <motion.div className='relative max-w-[1000px] max-h-[400px] group' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className='absolute top-0 left-0 items-end justify-between hidden w-full h-full gap-2 p-6 text-sm font-medium rounded-lg bg-gradient-to-b from-transparent to-black/80 sm:flex text-neutral-400'>
                  <div className='flex items-center gap-x-1'>
                    <LuCalendarDays />
                    <div>{new Date(data.metadata.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>

                  <div className='flex items-center gap-x-1'>
                    <LuTimer />
                    <div>{readTime} dakika okuma süresi</div>
                  </div>
                </div>
                <Image src={data.metadata.image} alt={data.metadata.title} width={1000} height={300} className='rounded-lg object-cover max-h-[300px]' quality={100} />
              </motion.div>

              <motion.div className='flex flex-wrap gap-2 mt-4 text-sm font-medium sm:hidden text-neutral-400' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className='flex items-center gap-x-1'>
                  <LuCalendarDays />
                  <div>{new Date(data.metadata.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>

                <div className='flex items-center gap-x-1'>
                  <LuTimer />
                  <div>{readTime} dakika okuma süresi</div>
                </div>
              </motion.div>

              <motion.h1 className='mt-8 text-2xl font-extrabold text-justify sm:mt-4' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {data.metadata.title}
              </motion.h1>

              <motion.h2 className='mt-2 text-sm text-justify text-light-secondaryText dark:text-dark-secondaryText' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {data.metadata.description}
              </motion.h2>

              <motion.div className='flex items-center mt-8 gap-x-2' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <ReactMarkdown className='flex flex-col w-full h-full text-lg text-light-primaryText dark:text-dark-primaryText gap-y-5' remarkPlugins={[remarkGfm]} components={components}>
                  {data.markdownWithoutMetadata}
                </ReactMarkdown>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h3 className='mt-4 text-sm font-semibold'>
                  Diğer Makaleler
                </h3>
                <div className='flex w-full mt-3 text-sm gap-[0.5px] text-light-secondaryText dark:text-dark-secondaryText select-none'>
                  {nextArticle ? (
                    <Link className='flex items-center w-full p-2 text-center transition-all duration-300 border rounded-l-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary hover:bg-light-tertiary hover:dark:bg-dark-tertiary gap-x-2 border-light-tertiary dark:border-dark-tertiary' href={nextArticle.filename.replace('.md', '')}>
                      <LuArrowLeft />
                      <span className='max-w-[260px] truncate'>{nextArticle.metadata.title}</span>
                    </Link>
                  ) : (
                    <div className='flex items-center w-full p-2 text-center border rounded-l-lg bg-light-secondary dark:bg-dark-secondary opacity-60 gap-x-2 border-light-tertiary dark:border-dark-tertiary'>
                      <LuArrowLeft />
                      Yok
                    </div>
                  )}

                  {backArticle ? (
                    <Link className='flex items-center justify-end w-full p-2 text-center transition-all duration-300 border rounded-r-lg cursor-pointer bg-light-secondary dark:bg-dark-secondary hover:bg-light-tertiary hover:dark:bg-dark-tertiary gap-x-2 border-light-tertiary dark:border-dark-tertiary' href={backArticle.filename.replace('.md', '')}>
                      <span className='max-w-[260px] truncate'>{backArticle.metadata.title}</span>
                      <LuArrowRight />
                    </Link>
                  ) : (
                    <div className='flex items-center justify-end w-full p-2 text-center border rounded-r-lg bg-light-secondary dark:bg-dark-secondary opacity-60 gap-x-2 border-light-tertiary dark:border-dark-tertiary'>
                      Yok
                      <LuArrowRight />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </OpacityMotion>
        </div>

      </div>
    </>
  );
};

export async function getServerSideProps({ params: { slug } }) {
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
    const data = articlesSortedByDate.find(article => article.filename.replace('.md', '') == slug);
    if (!data) return { notFound: true };

    const index = articlesSortedByDate.findIndex(article => article.filename.replace('.md', '') == slug);
    const backArticle = articlesSortedByDate[index + 1] || null;
    const nextArticle = articlesSortedByDate[index - 1] || null;

    return {
      props: {
        data,
        backArticle,
        nextArticle
      }
    };
  } catch (error) {
    throw new Error(error);
  }
};