import InlineLink from '@/pages/components/InlineLink';
import { motion } from 'framer-motion';
import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import axios from 'axios';
import { LuLoader2 } from 'react-icons/lu';
import { useToggle } from 'react-use';
import { MdOutlineAddReaction } from 'react-icons/md';
import Seperator from './Seperator';
import social from '@/data/social.json';

export default function Footer() {
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

  const stars = new Array(5).fill(0);
  const [hoveredStarIndex, setHoveredStarIndex] = useState(-1);
  const [feedbackSent, setFeedbackSent] = useToggle(false);
  const [feedbackSending, setFeedbackSending] = useState(false);

  async function feedback(index) {
    if (feedbackSending || feedbackSent) return;
    setFeedbackSending(true);
    setHoveredStarIndex(-1);
    
    try {
      const response = await axios.post('/api/feedback', {
        rating: index + 1
      });

      if (response.status === 200) {
        return setFeedbackSent(true);
      };
    } catch (error) {
      console.log(error);
    } finally {
      setFeedbackSending(false);
    };
  };

  return (
    <>
      <Seperator />
      <div className="mx-6 flex flex-col">
        <div className='text-lg text-light-tertiaryText dark:text-dark-tertiaryText flex justify-between'>
          <h1>
            Bana Ulaş
          </h1>

          <h1 className='hidden mobile:flex items-center gap-x-1'>
            {feedbackSending ? (
              <>
                <LuLoader2 className='animate-spin inline' size={18} />
                Geri bildirim gönderiliyor..
              </>
            ) : feedbackSent ? (
              <>
                <AiFillHeart className='inline' size={18} />
                Geri bildirim için teşekkürler!
              </>
            ) : (
              <>
                <MdOutlineAddReaction className='inline' size={18} />
                Geri bildirim gönder.
              </>
            )}
          </h1>
        </div>

        <div className='flex mt-2 justify-between gap-4 flex-wrap'>
          <motion.div className='flex gap-4 items-center w-max h-max flex-wrap' variants={container} initial='hidden' whileInView='show'>
            {social.map((social, index) => (
              <motion.div className='flex items-center gap-x-2' key={index} variants={item}>
                <InlineLink to={social.url}>
                  {social.name}
                </InlineLink>
              </motion.div>
            ))}
          </motion.div>

          <div className='flex flex-col gap-y-2'>
            <h1 className='mobile:hidden flex items-center gap-x-1 text-lg text-light-tertiaryText dark:text-dark-tertiaryText'>
              {feedbackSending ? (
                <>
                  <LuLoader2 className='animate-spin inline' size={18} />
                  Geri bildirim gönderiliyor..
                </>
              ) : feedbackSent ? (
                <>
                  <AiFillHeart className='inline' size={18} />
                  Geri bildirim için teşekkürler!
                </>
              ) : (
                <>
                  <MdOutlineAddReaction className='inline' size={18} />
                  Geri bildirim gönder.
                </>
              )}
            </h1>
              
            <div className='flex gap-x-2 items-center'>
              {stars.map((_, index) => (
                <div key={index} onMouseEnter={() => {
                  if (feedbackSending || feedbackSent) return;
                  setHoveredStarIndex(index);
                }} onMouseLeave={() => setHoveredStarIndex(-1)} className='cursor-pointer' onClick={() => feedback(index)}>
                  <AiFillStar className={twMerge(
                    index <= hoveredStarIndex ? 'text-yellow-600' : 'text-light-tertiaryText dark:text-dark-tertiaryText', 
                    (feedbackSending || feedbackSent) && 'opacity-20 cursor-not-allowed'
                  )} key={index} size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};