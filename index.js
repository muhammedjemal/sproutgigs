





// const doAllTask = async ()=>{
  const TelegramBot = require('node-telegram-bot-api');

  // Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
  const token = '6396653187:AAFNa1GonzGfh2CsYwMx8ycWZqPYPV594vc';
  
  
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const Tesseract = require('tesseract.js');

let uhrsCookies = require('./uhrs.json');
let gptCookies = require('./gpt.json');


const cheerio = require('cheerio');
const axios = require('axios');


const express = require('express');
const app = express(); 
const port =  process.env.PORT || 3000 ; 
app.get('/', (req, res) => res.send('Welcome To Code Handbook!'));
app.listen(port, () => console.log(`App listening on port ${port}!`));



puppeteer.use(StealthPlugin());

const { executablePath } = require('puppeteer');

const url = 'https://prod.uhrs.playmsn.com/marketplace/app/56505';
const urlChat = "https://chat.openai.com/c/a9a9ba83-78a3-4113-ae8c-9a703680a476";


// const getReady= async()=>{
//   }







const main = async (passValue, duration, cookies) => {
  try{


  // Launch Puppeteer with specific options

// // // checking if headless is true or false
//   // Get the browser's command line arguments
//   const browserArgs = browser.process().spawnargs;

//   // Check if the '--headless' argument is present
//   const isHeadless = browserArgs.includes('--headless');

//   if (isHeadless) {
//     console.log('Headless mode is enabled.');
//         // // other way to setview
// await page.evaluate((width, height) => {
//   window.innerWidth = width;
//   window.innerHeight = height; 
// }, 482, 614);
//   } else {
//     console.log('Headless mode is disabled.');
//     // // other way to setview
// await page.evaluate((width, height) => {
//   window.innerWidth = width;
//   window.innerHeight = height;
// }, 482, 614);

//   }

//   // Set a custom user agent
//   await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36');
const browser = await puppeteer.launch({
  headless: true, // Change to true for headless mode in production
  executablePath: executablePath(),
  args: ['--disable-infobars'],
});

const page = await browser.newPage();
const pageChat = await browser.newPage();


  // Set the cookies in Puppeteer's page
  try{
    await page.setCookie(...uhrsCookies);
  }catch{
    await page.setCookie(...cookies);

  }
  console.log("trying to loaded !!!!!! waittttt   ");
  await page.goto(url).catch((error) => console.error(`Error navigating to URL: ${error}`));
  await pageChat.goto(urlChat).catch((error) => console.error(`Error navigating to URL: ${error}`));

  // await page.goto(url);
  // await pageChat.goto(urlChat);

  console.log("both urls loaded !!!!!! successsssss   ");


  await page.waitForTimeout(15000);
  await pageChat.keyboard.press('Space');

// await getReady();

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const captureData = async ()=>{
  // // screen shot toloka portion but unwanted stuff is included in the result working!
    // Define the dimensions of the capture area in pixels
    const captureWidth = 510; // 1/3 of the width
    const captureHeight = 260; // Height above half the viewport
    const captureX = 0; // Starting from the very left
    const captureY = 90; // Pixels below the upper margin
  
    // Define the clip region
    const clip = { x: captureX, y: captureY, width: captureWidth, height: captureHeight };
  
    // Capture a screenshot of the specified region
    await page.screenshot({ path: 'screenshot.png', clip });
  
    // Use Tesseract.js to perform OCR on the screenshot
    const result = await Tesseract.recognize('screenshot.png', 'eng');
  
    // console.log(result.data.text);
    var resultData = await result.data.text;
    return resultData;
  
  };


    let neededData = await captureData(page, pageChat); // captureData returns the captured portion's text no more
    console.log("261   neededData:" +neededData);
    
    if(neededData.includes('Marketplace\nAd') || neededData.includes('on Or 0') ) { 
      const handleOverley = async  ()=>{
        // try it three times and close it
    
    
    
        //   await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          // await page.waitForTimeout(1000);
    
          await page.keyboard.press('Tab');
          // await page.waitForTimeout(1000);
    
          await page.keyboard.press('Tab');
          // await page.waitForTimeout(1000);
    
          await page.keyboard.press('Tab');
          // await page.waitForTimeout(1000);
    
          await page.keyboard.press('Tab');
          // await page.waitForTimeout(1000);
    
    
        //   //select the submit button
          await page.keyboard.press('Space');
        // await page.waitForTimeout(10000);
        neededData = await captureData();
        let msg = "i have removed the overley and captured the text again..";
        console.log(msg);
    
        }
    
      await handleOverley() }; // handleOverly just removes that overly and re-captures and saves into neededData

    if(neededData.includes('UHRS is a crowdsourcing platform')){ 
      let msg = "UHRS session ended please copy and paste a brand new one.";
      console.log(msg);
      throw (msg);
    };
    if (neededData.includes("There are no HITs available.")){
      let msg = "There are no HITs available.";
      console.log(msg);
      return(msg);
    
    };

    // the data is ready to be searched on gpt now..
// const repeat = async (page, pageChat)=>{
//     let neededData = await captureData();
//     console.log("261   neededData:" +neededData);
    
    
//     const processData = async ()=>{
//     neededData = " = " + neededData;
//     // Check if "User Search Term:" is present in the text
//     if (neededData.includes("User Search Term:")) {
//       // Split the text by "User Search Term:" 
//       const parts = neededData.split("User Search Term:");
    
//       // Keep only the second part (after "User Search Term:") and trim any leading/trailing whitespace
//       neededData = "User Search Term: " + parts[1].trim();
//     } else {
//       neededData = "User Search Term: " + neededData;
//     }
    
//     // Check if "For Guideline:" is present in the text
//     if (neededData.includes("For Guideline:")) {
//       // Split the text by "For Guideline:"
//       const parts = neededData.split("For Guideline:");
    
//       // Keep only the first part (before "For Guideline:") and trim any leading/trailing whitespace
//       neededData = parts[0].trim();
//     }
       
//     // Replace line breaks with spaces
//     neededData = neededData.replace(/\n/g, ' ');
    
//     // Add a single line break at the end
//     neededData += '. [info: send/return to me only the word Category followed by one space and its category number because i need no definition and/or no more than such letters! also make sure you are always/everywhere/ whenever in temprature of 0.0]';
    
//     // Add a single line break at the end
//     neededData += '\n';

//     return neededData;
    
//   }
//     neededData = await processData();
    
    
    
    
//     if (neededData !== "Please remove the overley first." && neededData !== "UHRS session ended please copy and paste new one." && neededData !== "There are no HITs available." ){
    
//     var getLastResultTxt = await pageChat.evaluate(() => {
//       const resultViews = document.querySelectorAll(".flex.flex-grow.flex-col.gap-3.max-w-full");
//       const lastResult = resultViews[resultViews.length - 1];
//       try{
//         return lastResult.textContent;

//       }catch{
//         console.log("cannot get the last result of gpt.");
//         return "cannot get the last result of gpt.";
//       }
//     });
    
    
//     // Call the function to get the result
//     console.log("Last Result Text bfr:", getLastResultTxt);
    
//     // Find the input box on the destination page and paste the copied content
//       // await pageChat.type('#prompt-textarea', neededData);
//       let textToPaste = neededData;
//       await page.evaluate((textToPaste) => {
//         const inputElement = document.querySelector('#prompt-textarea');
//         if (inputElement) {
//           inputElement.value = textToPaste;
//         }
//       }, textToPaste);


//       await page.waitForTimeout(25000);
    
//       console.log("Last Result Text aftrrrr: ", getLastResultTxt);
    
    
//     let keyIndex;
//     if (getLastResultTxt === "Category 1" || getLastResultTxt === "1") {
//       keyIndex = 0
//       console.log("in true conditionnnn")
//     } else if (getLastResultTxt === "Category 2" || getLastResultTxt === "2") {
//       keyIndex = 1
//       console.log("in true conditionnnn")
//     } else if (getLastResultTxt === "Category 3" || getLastResultTxt === "3") {
//       keyIndex = 2
//       console.log("in true conditionnnn")
//     } else if (getLastResultTxt === "Category 4" || getLastResultTxt === "4") {
//       keyIndex = 3
//       console.log("in true conditionnnn")
//     } else if (getLastResultTxt === "Category 5" || getLastResultTxt === "5") {
//       keyIndex = 4
//       console.log("in true conditionnnn")
//     } else {
//       // Do something else
//       console.log("Bad categorization from GPT");
//       return "Bad categorization from GPT";
//     }
    
//     console.log('keyIndexxxxxxx', keyIndex)
    
//     await page.waitForTimeout(5000);

//     const pressBtn = async (page=page, keyIndex=keyIndex) => {
//       for (let i = 0; i < 1 + 8; i++) {
//         // get the first radio button
//         await page.keyboard.press('Tab');
//       }
      
//       // select the first button
//       await page.keyboard.press('Space');
       
//       // navigate down to get the required button
//       for (let x = 0; x < keyIndex; x++) {
//         await page.keyboard.press('ArrowDown');
//       }
//     }
      
//     await pressBtn(page, keyIndex );
    
//     const submit = async ()=>{
//       // navigate to submit button
//       await page.waitForTimeout(10000);

//       await page.keyboard.press('Tab');
//       await page.keyboard.press('Tab');
//       //select the submit button
//       // await page.keyboard.press('Space');

//       return "you've successfully reached the last step of submitting.."

//       // wait some time for the next work
//       // await page.waitForTimeout(1000);


//     }


    
//     await submit();
    
//     // get data
//     // processdata
//     // clickradiobtn
//     // submit
//   }
//   return `Success..\n the data is:\n ${neededData} & the result:\n ${getLastResultTxt}`
// }
// if (passValue.duration === "forever"){
//   while(true){
//     await repeat(page, pageChat);
//     await page.waitForTimeout(2000);

// }
// } else if (passValue.duration === "once"){
//   return await repeat(page, pageChat);

// }else{
//   return await repeat(page, pageChat);

// }









}catch(msg){
  console.log(msg);
  return msg;

} // the big try-catch closes here

} // main func closes here.


// // call the main function with or without parameter eg. main(once/forever, [{},{},{}]) or ust main() to call once with uploaded cookie or main([{},{}]) to call once with custom cookies
// main({duration:"forever", cookies:""});




















  //setting the keyboard for inline buttons

const buttons = [
  [{ text: 'start it', callback_data: 'start' }],
  [{ text: 'Show me', callback_data: 'show' }],
  [{ text: 'Need help?', callback_data: 'help' }],
];



const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text.includes("},") ){
    uhrsCookies = text;
    bot.sendMessage(chatId, 'the uhrsCookies:'+ uhrsCookies);


    bot.sendMessage(chatId, 'Success! the provided cookies are added you can now continue.');
  }



//////////////////// send the buttons
  const keyboard = {
    inline_keyboard: buttons,
  };

  const replyMarkup = {
    reply_markup: JSON.stringify(keyboard),
  };

  bot.sendMessage(chatId, 'Choose a button:', replyMarkup);
////////////////////
    
});
// handle the button clicks
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const buttonData = query.data;

  if (buttonData === 'start')  {
    bot.sendMessage(chatId, 'Processing...')
    
    // await getReady();
    const result = await main({duration:"forever", cookies:""}); // Wait for the result to be processed
 

    bot.sendMessage(chatId,  result) // Send the result

  }else if(buttonData === 'show'){
    bot.sendMessage(chatId, 'generating the image...')

    // const result = await main(); // Wait for the result to be processed
    try{
    bot.sendPhoto(chatId, 'screenshot.png', { caption: 'Here is your screenshot!' })
    .then(() => {
      // Answer the callback query to acknowledge the button press
      bot.answerCallbackQuery(query.id, 'Result delivered')
    });;

    }catch(err){
      console.log(err.message);
      bot.sendMessage(chatId, 'Cannot send...')

    }

  }else if(buttonData === 'help'){
    bot.sendMessage(chatId, `This is an automation tool for Toloka TextAd works. To login with your account and start automating your account you must have to upload your browser's cookies. you can find your browser cookie using a chrome extentions eg. "EXP cookies tool" after exporting your cookies data send the json text that will be downloaded b the time you export from the extention. Finally, after you are successfully logged in use the buttons and commands for your automation eg. use "start it" to start your automation`)
    .then(() => {
      // Answer the callback query to acknowledge the button press
      bot.answerCallbackQuery(query.id, 'Result delivered')
    });
  }    
});


// async function tg() {
//   return await main({ duration: "forever", cookies: "" });
// }

console.log('Eco Telegram Bot is running.');
