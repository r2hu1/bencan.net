import Header from '@/pages/components/Header';
import AboutMe from '@/pages/components/AboutMe';
import CreatedWebsites from '@/pages/components/CreatedWebsites';
import Articles from '@/pages/components/Articles';
import Footer from '@/pages/components/Footer';
import TechStack from '@/pages/components/TechStack';
import axios from 'axios';
import { LuGithub } from 'react-icons/lu';
import Link from 'next/link';
import fs from 'fs';
import OpacityMotion from '@/pages/components/OpacityMotion';

export default function Home({ discord_data, articles }) {
  return <div className="w-full h-full flex justify-center">
    <div className="w-full min-h-[100dvh] max-w-[700px] px-6 mb-12">
      <Header />
      <OpacityMotion>
        <AboutMe discord_data={discord_data} />
        <CreatedWebsites />
        <Articles articles={articles} />
        <TechStack />
        <Footer />

        <Link className='w-full flex items-center justify-center text-center mt-4 rounded py-2 max-w-[94.5%] mx-auto hover:bg-light-tertiary dark:bg-dark-tertiary group cursor-pointer transition-all duration-300 ease-in-out' href='https://github.com/chimpdev/bencan.net' target='_blank'>
          <h1 className='flex items-center gap-x-1 text-light-tertiaryText dark:text-dark-tertiaryText text-xs group-hover:text-neutral-800 dark:group-hover:text-neutral-100 transition-all duration-300 ease-in-out'>
            Bu site <LuGithub /> Github'da açık kaynak kodlu!
          </h1>
        </Link>
      </OpacityMotion>
    </div>
  </div>
};

export async function getServerSideProps() {
  try {
    const response = await axios.get('https://api.lanyard.rest/v1/users/957840712404193290').then(res => res.data).catch(() => null);

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
        discord_data: response?.data || 'offline',
        articles: articlesSortedByDate || []
      }
    };
  } catch (error) {
    throw new Error(error);
  }
};