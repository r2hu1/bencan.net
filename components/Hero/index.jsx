'use client';

import { FaDiscord } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { Button } from '../ui/button';
import createFriendInvite from '@/lib/createFriendInvite';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Hero() {
  const [loading, setLoading] = useState(false);

  return (
    <section className="mt-[100px] flex gap-y-8 flex-col">
      <h1 className="text-3xl font-bold max-w-[600px]">
        Can is a full-stack developer that you{'\''}ll want to work with.
      </h1>

      <p className="max-w-[600px]">
        Can currently works as a freelancer. He loves to learn new things and he{'\''}s always open to new ideas. He is a high school student and he is 18 years old. Currently exploring the world of Next.js.
      </p>

      <Button className='w-max' onClick={async () => {
        setLoading(true);

        const invite = await createFriendInvite();
        if (!invite.success) {
          toast.error(invite.message);
          return setLoading(false);
        } else {
          toast.success(`Invite ${invite.data} created! In 3 seconds, you will be redirected to Discord.`);
          setTimeout(() => {
            window.location.href = `https://discord.com/invite/${invite.data}`;
          }, 3000);
        }
      }} disabled={loading}>
        {loading ? <CgSpinner className='inline-block mr-2 animate-spin' size={20} /> : <FaDiscord className='inline-block mr-2' size={20} />}
        Add me on Discord
      </Button>
    </section>
  );
}