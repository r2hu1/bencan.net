import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SelectedWorks from '@/components/SelectedWorks';
import Contact from '@/components/Contact';
import TechStack from '@/components/TechStack';
import RecentMediumPublications from '@/components/RecentMediumPublications';

export const metadata = {
  title: 'bencan.net',
  description: 'My personal website.',
  keywords: [
    'bencan',
    'bencan.net'
  ],
  authors: [
    { name: 'Discord @ben.can' }
  ],
  creator: 'Discord @ben.can',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <SelectedWorks />
      <TechStack />
      <RecentMediumPublications />
      <Contact />
    </>
  );
}