import { motion } from 'framer-motion';
import Seperator from './Seperator';
import Image from 'next/image';
import data from '@/data/techStack.json';

export default function TechStack() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Seperator />
      <div className="flex flex-col mx-6">
        <h1 className='text-lg'>
          Technologies I Use
        </h1>

        <motion.div className='flex flex-wrap items-center gap-5 mt-5 select-none' variants={container} initial='hidden' whileInView='show'>
          {data.sort((a, b) => b.percentage - a.percentage).map((language, index) => (
            <div className='flex items-center gap-2' key={index}>
              <motion.div className='flex flex-col' variants={item}>
                <div className='flex items-center text-sm text-light-tertiaryText dark:text-dark-tertiaryText gap-x-1'>
                  {language.logoPath && <Image src={language.logoPath} width={20} height={20} className='rounded bg-light-tertiary dark:bg-dark-tertiary p-0.5 h-[20px] w-[20px]' alt={`${language.name} Logo`} />}
                  <h2>{language.name}</h2>
                  <span className='text-xs'>({language.percentage}%)</span>
                </div>

                <div className='relative w-full mt-2'>
                  <div className='w-full rounded-lg h-[4px]' style={{ backgroundColor: `${language.barColor}20` }} />
                  <div className='absolute top-0 left-0 w-full'>
                    <motion.div className='relative flex items-center w-full transition-all duration-300 ease-in-out' initial={{ maxWidth: 0 }} animate={{ maxWidth: `${language.percentage}%` }} transition={{ duration: 1, ease: 'easeInOut' }}>
                      <motion.div className='h-[4px] rounded-lg w-full bg-light-tertiary dark:bg-dark-tertiaryText' style={{ backgroundColor: language.barColor }} initial={{ width: 0 }} whileInView={{ width: '100%', delay: index * 0.3 }} transition={{ duration: 1, ease: 'easeInOut', delay: index * 0.3 }} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};