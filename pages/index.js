import Header from '@/pages/components/Header';
import AboutMe from '@/pages/components/AboutMe';
import CreatedWebsites from '@/pages/components/CreatedWebsites';
import Articles from '@/pages/components/Articles';
import Footer from '@/pages/components/Footer';
import TechStack from '@/pages/components/TechStack';
import axios from 'axios';
import { LuGithub } from 'react-icons/lu';
import Link from 'next/link';

export default function Home({ discord_status, articles }) {
  return <div className="w-full h-full flex justify-center">
    <div className="w-full min-h-[100dvh] max-w-[700px] px-6 mb-12">
      <Header />
      <AboutMe discord_status={discord_status} />
      <CreatedWebsites />
      <Articles articles={articles} />
      <TechStack />
      <Footer />

      <Link className='w-full flex items-center justify-center text-center mt-4 rounded py-2 max-w-[94.5%] mx-auto hover:bg-tertiaryBackgroundColor group cursor-pointer transition-all duration-300 ease-in-out' href='https://github.com/chimpdev/bencan.net' target='_blank'>
        <h1 className='flex items-center gap-x-1 text-tertiaryTextColor text-xs group-hover:text-neutral-100 transition-all duration-300 ease-in-out'>
          Bu site <LuGithub /> Github'da açık kaynak kodlu!
        </h1>
      </Link>
    </div>
  </div>
};

export async function getServerSideProps() {
  try {
    const response = await axios.get('https://api.lanyard.rest/v1/users/957840712404193290').then(res => res.data).catch(() => null);
    const articles = await axios.get('/api/articles').then(res => res.data).catch(() => null);

    return {
      props: {
        discord_status: response?.data?.discord_status || 'offline',
        articles: articles || []
      }
    };
  } catch (error) {
    throw new Error(error);
  }
};