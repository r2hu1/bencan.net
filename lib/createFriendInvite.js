'use server';

import axios from 'axios';
import { kv } from '@vercel/kv';

export default async function createFriendInvite() {
  const error = await kv.get('error');
  if (error === 'true') return { success: false, error: 'There was an error, try again later.' };

  const invites = await getAllInvites();
  if (!invites.success) {
    await kv.set('error', 'true', { expirationTtl: 3600 });
    console.error(invites.error);
    sendWebhook(invites.error);
    return invites;
  }

  const inviteThatCanBeUsed = invites.data.find(invite => invite.uses < 5);
  if (inviteThatCanBeUsed) return { success: true, data: inviteThatCanBeUsed.code };

  try {
    const response = await axios.post('https://discord.com/api/v10/users/@me/invites', {}, {
      headers: {
        'Authorization': `${process.env.USER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    sendWebhook(`Created new invite: ${response.data.code}`);
    return { success: true, data: response.data.code };
  } catch (error) {
    await kv.set('error', 'true', { expirationTtl: 3600 });
    console.error(error);
    sendWebhook(error);
    return { success: false, error: error instanceof axios.AxiosError ? error.response.data.message : error.message };
  }
}

async function sendWebhook(error) {
  try {
    await axios.post(process.env.ERROR_WEBHOOK_URL, { content: `\`\`\`${error.stack.slice(0, 2000)}\`\`\`` });
  } catch (error) {
    console.error(error);
  }
}

async function getAllInvites() {
  try {
    const response = await axios.get('https://discord.com/api/v10/users/@me/invites', {
      headers: {
        'Authorization': `${process.env.USER_TOKEN}`
      }
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error instanceof axios.AxiosError ? error.response.data.message : error.message };
  }
}