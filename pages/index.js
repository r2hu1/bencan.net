import Header from '@/pages/components/Header';
import AboutMe from '@/pages/components/AboutMe';
import CreatedWebsites from '@/pages/components/CreatedWebsites';
import Articles from '@/pages/components/Articles';
import Footer from '@/pages/components/Footer';
import TechStack from '@/pages/components/TechStack';
import axios from 'axios';
import fs from 'fs';
import OpacityMotion from '@/pages/components/OpacityMotion';
import Head from 'next/head';
import Repos from './components/Repos';

export default function Home({ discord_data, articles, repositories }) {
  return (
    <>
      <Head>
        <title>{`bencan.net: Anasayfa`}</title>
        <meta name="description" content="Benim kişisel web sitem." />
        <meta name="keywords" content="bencan, bencan.net, bencan.net, bencan.net, bencan.net" />
        <meta name="author" content="Discord @ben.can" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`bencan.net: Anasayfa`} />
        <meta property="og:description" content="Benim kişisel web sitem." />
        <meta property="og:image" content="https://bencan.net/images/og-image.png" />
        <meta property="og:url" content={`https://bencan.net`} />
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
      <div className="flex justify-center w-full h-full">
        <div className="w-full min-h-[100dvh] max-w-[700px] px-6 mb-12">
          <Header />
          <OpacityMotion>
            <AboutMe discord_data={discord_data} />
            <CreatedWebsites />
            <Articles articles={articles} />
            <TechStack />
            <Repos repositories={repositories} />
            <Footer />
          </OpacityMotion>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const repositories = await axios.get('https://api.github.com/users/chimpdev/repos').then(res => res.data).catch(() => null);
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
        articles: articlesSortedByDate || [],
        repositories: repositories || [
          {
            owner: {
              login: 'chimpdev',
              avatar_url: 'https://avatars.githubusercontent.com/u/55600314?v=4',
              html_url: 'https://github.com/chimpdev'
            },
          }
        ]
      }
    };
  } catch (error) {
    throw new Error(error);
  }
};