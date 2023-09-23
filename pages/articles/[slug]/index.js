import Header from '@/pages/components/Header';
import Image from 'next/image';
import { LuCalendarDays, LuTimer } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

const components = {
  h1: ({ node, ...props }) => <h1 className='text-xl font-semibold' {...props} />,
  h2: ({ node, ...props }) => <h2 className='text-lg font-semibold' {...props} />,
  h3: ({ node, ...props }) => <h3 className='text-base font-semibold' {...props} />,
  h4: ({ node, ...props }) => <h4 className='text-sm font-semibold' {...props} />,
  h5: ({ node, ...props }) => <h5 className='text-xs font-semibold' {...props} />,
  h6: ({ node, ...props }) => <h6 className='text-xs font-semibold' {...props} />,
  hr: ({ node, ...props }) => <div className='w-full h-[2px] bg-tertiaryBackgroundColor' {...props}>&thinsp;</div>,
  img: ({ node, ...props }) => <Image {...props} width={1000} height={400} className='rounded-lg object-cover max-h-[400px] h-full' />,
  li: ({ node, ...props }) => <li className='list-disc list-inside' {...props} />,
  ul: ({ node, ...props }) => <ul className='list-disc list-inside' {...props} />,
  ol: ({ node, ...props }) => <ol className='list-decimal list-inside' {...props} />,
  p: ({ node, ...props }) => <p className='text-secondaryTextColor' {...props} />,
  strong: ({ node, ...props }) => <strong className='font-semibold' {...props} />,
  pre: ({ node, ...props }) => <pre className='bg-secondaryBackgroundColor rounded-lg p-2' {...props} />,
  a: ({ node, ...props }) => <a className='text-primaryTextColor hover:underline' {...props} />
};

export default function Articles({ data }) {

  const wordsPerMinute = 200;
  const numberOfWords = data.markdownWithoutMetadata.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);

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
              <ReactMarkdown className='text-lg text-secondaryTextColor w-full h-full flex flex-col gap-y-5' remarkPlugins={[remarkGfm]} components={components}>
                {data.markdownWithoutMetadata}
              </ReactMarkdown>
            </div>
          </div>
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