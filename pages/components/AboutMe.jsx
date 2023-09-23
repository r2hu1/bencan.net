import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Tippy from '@tippyjs/react';
import { motion } from 'framer-motion';
import SpotifyActivity from './SpotifyActivity';

export default function AboutMe({ discord_status, activityData }) {
  return (
    <div className="mx-6 mt-28 flex flex-col">
      <div className="w-20 h-20 bg-secondaryBackgroundColor rounded-full relative">
        <Image src='/homeAvatar.png' alt="Home Avatar" width={626} height={626} priority={true} />
        <div className='absolute bottom-1.5 right-1.5'>
          <Tippy content={`Discord'da ${discord_status?.replace('online', 'çevrimiçiyim').replace('offline', 'çevrimdışıyım').replace('dnd', 'rahatszı etmeyin modundayım').replace('idle', 'çevrimiçiyim')}.`} inertia={true}>
            <motion.span className={twMerge(
              'w-3 h-3 rounded-full block',
              `bg-discordStatus-${discord_status}` // bg-discordStatus-online bg-discordStatus-offline bg-discordStatus-dnd bg-discordStatus-idle
            )} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: .2 }} />
          </Tippy>
        </div>
      </div>

      <div className="mt-4">
        <h2 className='text-2xl font-medium text-primaryTextColor'>
          Full-stack developer
        </h2>

        <p className='mt-4 text-lg text-secondaryTextColor font-normal'>
          Gökhan, 17 yaşında, İstanbul. Kodlama, Discord.js ve React. Freelance. Sosyal değil. Açık lise öğrencisi, iyi bir yazılımcı olmak istiyor.
        </p>

        <SpotifyActivity activityData={activityData} />
      </div>
    </div>
  );
};