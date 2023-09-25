import Header from '@/pages/components/Header';
import Image from 'next/image';
import { LuCalendarDays, LuTimer } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Head from 'next/head';
import fs from 'fs';
import OpacityMotion from '@/pages/components/OpacityMotion';
import Prism from '@/public/prism';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const components = {
  h1: ({ node, ...props }) => <h1 className='text-xl font-semibold' {...props} />,
  h2: ({ node, ...props }) => <h2 className='text-lg font-semibold' {...props} />,
  h3: ({ node, ...props }) => <h3 className='text-base font-semibold' {...props} />,
  h4: ({ node, ...props }) => <h4 className='text-sm font-semibold' {...props} />,
  h5: ({ node, ...props }) => <h5 className='text-xs font-semibold' {...props} />,
  h6: ({ node, ...props }) => <h6 className='text-xs font-semibold' {...props} />,
  hr: ({ node, ...props }) => <div className='w-full h-[2px] bg-light-tertiary dark:bg-dark-tertiary' {...props}>&thinsp;</div>,
  img: ({ node, ...props }) => <Image {...props} width={1000} height={400} className='rounded-lg object-cover max-h-[400px] h-full' />,
  li: ({ node, ...props }) => <li className='text-sm' {...props} />,
  ul: ({ node, ...props }) => <ul className='list-disc list-inside' {...props} />,
  ol: ({ node, ...props }) => <ol className='list-decimal list-outside px-4 flex gap-y-2 flex-col' {...props} ordered={true} />,
  p: ({ node, ...props }) => <p className='text-light-secondaryText dark:text-dark-secondaryText items-center text-sm' {...props} />,
  strong: ({ node, ...props }) => <strong className='font-semibold' {...props} />,
  a: ({ node, ...props }) => <a className='text-light-primaryText dark:text-dark-primaryText hover:underline' {...props} />,
  pre: ({ node, ...props }) => {
    const [copied, setCopied] = useState(false);
    let language = props.children[0].props.className.split('-')[1];

    return (
      <pre className={`relative rounded-lg overflow-x-auto p-4 !text-sm language-${language} line-numbers whitespace-pre-wrap`} {...props}>
        <div className='w-full h-max absolute justify-end flex right-4 top-2.5'>
          <span className={twMerge(
            'bg-[#242424] px-2 py-2 rounded-lg font-medium cursor-pointer hover:opacity-60 transition-all duration-300 ease-in-out select-none',
            copied && 'opacity-60 cursor-default'
          )} onClick={() => {
            if (copied) return;

            navigator.clipboard.writeText(props.children[0].props.children);
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
          }}>
            {copied ? 'Kopyalandı!' : 'Kopyala'}
          </span>
        </div>
        <code>
          {props.children[0].props.children}
        </code>
      </pre>
    );
  }
};

export default function Articles({ data }) {

  const wordsPerMinute = 200;
  const numberOfWords = data.markdownWithoutMetadata.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{`bencan.net: ${data.metadata.title}`}</title>
        <meta name="description" content={data.metadata.description} />
        <meta property="og:description" content={data.metadata.description} />
        <meta property="og:url" content={`https://bencan.net/articles/${data.filename.replace('.md', '')}`} />
        <meta name="twitter:description" content={data.metadata.description} />
      </Head>

      <div className="w-full h-full flex justify-center">

        <div className="w-full min-h-[100dvh] max-w-[700px] px-6 mb-12">
          <Header />
          <OpacityMotion>
            <div className="mx-6 mt-28 flex flex-col">
              <div className='relative max-w-[1000px] max-h-[400px]'>
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 rounded-lg hidden sm:flex items-end p-6 justify-between gap-2 text-sm font-medium text-neutral-400'>
                  <div className='flex items-center gap-x-1'>
                    <LuCalendarDays />
                    <p>{new Date(data.metadata.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>

                  <div className='flex items-center gap-x-1'>
                    <LuTimer />
                    <p>{readTime} dakika okuma süresi</p>
                  </div>
                </div>
                <Image src={data.metadata.image} alt={data.metadata.title} width={1000} height={300} className='rounded-lg object-cover max-h-[300px] h-full' />
              </div>

              <div className='flex sm:hidden gap-2 flex-wrap mt-4 text-sm font-medium text-neutral-400'>
                <div className='flex items-center gap-x-1'>
                  <LuCalendarDays />
                  <p>{new Date(data.metadata.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className='flex items-center gap-x-1'>
                  <LuTimer />
                  <p>{readTime} dakika okuma süresi</p>
                </div>
              </div>

              <h1 className='text-4xl font-extrabold mt-8 sm:mt-4'>
                {data.metadata.title}
              </h1>

              <div className='flex items-center gap-x-2 mt-8'>
                <ReactMarkdown className='text-lg text-light-secondaryText dark:text-dark-secondaryText w-full h-full flex flex-col gap-y-5' remarkPlugins={[remarkGfm]} components={components}>
                  {data.markdownWithoutMetadata}
                </ReactMarkdown>
              </div>
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

    return {
      props: {
        data
      }
    };
  } catch (error) {
    throw new Error(error);
  }
};