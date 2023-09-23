export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ message: 'Method not allowed' });

  const { rating } = request.body;
  if (!rating) return response.status(400).json({ message: 'Missing rating' });

  axios.post(process.env.DISCORD_WEBHOOK_URL, {
    embeds: [{
      title: 'Yeni bir geri bildirim var!',
      description: `**${rating}** yıldızlı bir geri bildirim.`,
      color: 0x000000
    }]
  });

  return response.status(200).json({ message: 'Feedback received' });
};