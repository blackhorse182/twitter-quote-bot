const { TwitterApi } = require('twitter-api-v2');
const schedule = require('node-schedule');
const axios = require('axios');
require('dotenv').config();




const client = new TwitterApi({
    appKey: 'MQnQJz6JfQ6FdbhGjmsgtN5aE', // Remplace par ta vraie API Key
    appSecret: 'MO4J0paVS0kvmPvSh715OjDU5R8cjJuWlOPN6Zz5JDPZqgmb5G',         // Remplace par ton vrai API Secret
    accessToken: '1509015998317404161-0PtKc05VWPikCLXyKtXvIIo5IQ8GUF',    // Ton Access Token
    accessSecret: 'ejdT2uFYLQXFvHM1rkoJXe6U2FX0PHTqWjgqVQhm3EmoL',  // Ton Access Secret
  });

  const hashtags = "#CitationDuJour #Motivation #Inspiration";
  const fallbackQuotes = [
    "La vie est un mystère qu'il faut vivre. - Gandhi",
    "Le bonheur est un parfum que l'on ne peut répandre sur autrui sans en recevoir quelques gouttes. - Ralph Waldo Emerson",
    "Chaque jour est une nouvelle chance de changer le monde. - Inconnu",
  ];
  
  async function getRandomQuote() {
    try {
      const response = await axios.get('https://zenquotes.io/api/random');
      const quote = response.data[0];
      return `${quote.q} - ${quote.a}`;
    } catch (error) {
      console.error("Erreur lors de la récupération de la citation :", error.message, error.response ? error.response.data : null);
      const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
      return fallbackQuotes[randomIndex];
    }
  }
  
  async function postQuote() {
    const quote = await getRandomQuote();
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const tweet = `${quote} ${hashtags} [${timestamp}]`;
  
    try {
      if (tweet.length > 280) {
        const shortQuote = `${quote.substring(0, 280 - hashtags.length - timestamp.length - 5)}... ${hashtags} [${timestamp}]`;
        await client.v2.tweet(shortQuote);
        console.log(`Tweet raccourci posté : ${shortQuote}`);
      } else {
        await client.v2.tweet(tweet);
        console.log(`Tweet posté : ${tweet}`);
      }
    } catch (error) {
      console.error("Erreur lors du post :", error);
    }
  }
  
  schedule.scheduleJob('0 */6 * * *', () => {
    postQuote();
  });
  
  postQuote();
  
  app.get('/', (req, res) => {
    res.send('Twitter Quote Bot is running!');
  });
  
  app.listen(PORT, () => {
    console.log(`Bot démarré sur le port ${PORT}! Posts toutes les 6 heures.`);
  });
// Schedule every 6 hours
schedule.scheduleJob('0 */6 * * *', () => {
  postQuote();
});

// Test on startup
postQuote();

// Keep Render alive
app.get('/', (req, res) => {
  res.send('Twitter Quote Bot is running!');
});

app.listen(PORT, () => {
  console.log(`Bot démarré sur le port ${PORT}! Posts toutes les 6 heures.`);
});