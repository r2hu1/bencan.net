import createdWebsites from '@/data/createdWebsites.json';
import InlineLink from '@/pages/components/InlineLink';
import { motion } from 'framer-motion';
import { WebsiteCard } from '../websites';

export default function CreatedWebsites() {

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: .2,
        staggerChildren: .1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <div className="flex flex-col mx-6 mt-16">
        <h1 className='text-lg'>
          Websites I Made
        </h1>

        <motion.div className='flex flex-col my-8 gap-y-8' variants={container} initial='hidden' whileInView='show'>
          {createdWebsites.slice(0, 3).map((website, index) => (
            <WebsiteCard className='flex justify-between' key={index} variants={item} data={website} />
          ))}
        </motion.div>

        <h3>
          <InlineLink to='/websites' underlineDisabled={true} arrowRotate={false}>
            See more
          </InlineLink>
        </h3>
      </div>
    </>
  );
};