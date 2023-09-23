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
      <div className="mx-6 mt-16 flex flex-col">
        <h1 className='text-lg'>
          Yaptığım Websiteler
        </h1>

        <motion.div className='my-8 flex flex-col gap-y-8' variants={container} initial='hidden' whileInView='show'>
          {createdWebsites.slice(0, 3).map((website, index) => (
            <WebsiteCard className='flex justify-between' key={index} variants={item} data={website} />
          ))}
        </motion.div>

        <h3>
          <InlineLink to='/websites' underlineDisabled={true} arrowRotate={false}>
            Daha fazla görüntüle
          </InlineLink>
        </h3>
      </div>
    </>
  );
};