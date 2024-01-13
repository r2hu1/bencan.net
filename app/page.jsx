import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SelectedWorks from '@/components/SelectedWorks';
import Contact from '@/components/Contact';
import TechStack from '@/components/TechStack';

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <SelectedWorks />
      <TechStack />
      <Contact />
    </>
  );
}