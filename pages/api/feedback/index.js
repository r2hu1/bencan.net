export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ message: 'Method not allowed' });

  const { rating } = request.body;
  if (!rating) return response.status(400).json({ message: 'Missing rating' });

  const TelegramBot = require('node-telegram-bot-api');
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

  await bot.sendMessage(process.env.TELEGRAM_ID, `New feedback received: ${rating}`).catch(() => null);
  bot.closeWebHook();

  return response.status(200).json({ message: 'Feedback received' });
};