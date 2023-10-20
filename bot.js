const TelegramBot = require('node-telegram-bot-api');
const token = '6396653187:AAFNa1GonzGfh2CsYwMx8ycWZqPYPV594vc'; // Replace with your bot's token
const bot = new TelegramBot(token, { polling: true });

const buttons = [
  [{ text: 'Button 1', callback_data: 'button1' }],
  [{ text: 'Button 2', callback_data: 'button2' }],
  [{ text: 'Button 3', callback_data: 'button3' }],
];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const keyboard = {
    inline_keyboard: buttons,
  };

  const replyMarkup = {
    reply_markup: JSON.stringify(keyboard),
  };

  bot.sendMessage(chatId, 'Choose a button:', replyMarkup);
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const buttonData = query.data;

  bot.sendMessage(chatId, `You clicked: ${buttonData}`);
});

console.log('Bot is running.');
