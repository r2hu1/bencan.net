'use client';

import { FaDiscord } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { Button } from '@/components/ui/button';
import createFriendInvite from '@/lib/createFriendInvite';
import { toast } from 'sonner';
import { useState } from 'react';
import { useCookie } from 'react-use';

export default function CreateInviteButton() {
  const [loading, setLoading] = useState(false);
  const [inviteCodeCookie, setInviteCodeCookie] = useCookie('invite_code');

  return (
    <Button className='w-max' onClick={async () => {
      setLoading(true);

      if (inviteCodeCookie) {
        setLoading(false);
        return toast('You already have an invite code.', {
          action: {
            label: 'Visit',
            onClick: () => window.location.href = `https://discord.com/invite/${inviteCodeCookie}`
          }
        });
      }

      toast.promise(new Promise((resolve, reject) => {
        createFriendInvite().then(invite => {
          if (!invite.success) {
            reject(invite.error);
          } else {
            resolve(invite);
          }
        }).catch(reject);
      }), {
        loading: 'Please wait while we create an invite code for you..',
        success: invite => {
          setInviteCodeCookie(invite.data, { expires: new Date(Date.now() + 3600000) });
          setTimeout(() => {
            window.location.href = `https://discord.com/invite/${invite.data}`;
          }, 3000);

          return `Invite ${invite.data} created! In 3 seconds, you will be redirected to Discord.`;
        },
        error: (err) => {
          toast.error(err);
        }
      });
    }} disabled={true}>
      {loading ? <CgSpinner className='inline-block mr-2 animate-spin' size={20} /> : <FaDiscord className='inline-block mr-2' size={20} />}
        Add me on Discord (disabled for now)
    </Button>
  );
}