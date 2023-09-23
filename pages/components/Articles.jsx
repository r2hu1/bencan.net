import InlineLink from '@/pages/components/InlineLink';
import { motion } from 'framer-motion';
import { ArticleCard } from '../articles';
import Seperator from './Seperator';

export default function Articles({ articles }) {

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
      <Seperator />
      <div className="mx-6 flex flex-col">
        <h1 className='text-lg'>
          Makaleler
        </h1>

        <motion.div className='my-8 flex flex-col gap-y-8' variants={container} initial='hidden' whileInView='show'>
          {articles?.slice(0, 3)?.map((website, index) => (
            <ArticleCard className='flex justify-between' key={index} variants={item} data={website} />
          ))}
        </motion.div>

        <h3>
          <InlineLink to='/articles' underlineDisabled={true} arrowRotate={false}>
            Daha fazla görüntüle
          </InlineLink>
        </h3>
      </div>
    </>
  );
};