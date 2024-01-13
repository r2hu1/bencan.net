import { GoProjectRoadmap } from 'react-icons/go';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import config from '@/config';
import WorkCard from '@/components/SelectedWorks/WorkCard';

export default function SelectedWorks() {
  return (
    <section className="mt-[100px] flex flex-col">
      <h1 className="text-xl font-medium">
        Selected Works
        <GoProjectRoadmap stroke={2} className='inline-block ml-2' />
      </h1>

      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
          duration: 10
        }}
        className='mt-8'
      >
        <CarouselContent>
          {config.selectedWorks.map(work => (
            <CarouselItem key={work.title} className='flex sm:basis-1/2 xl:basis-1/4'>
              <WorkCard 
                image={work.image} 
                title={work.title} 
                description={work.description} 
                tech={work.tech}
                link={work.link}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </section>
  );
}