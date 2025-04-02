const { TwitterApi } = require('twitter-api-v2');
const schedule = require('node-schedule');
const axios = require('axios');

// Configuration du client Twitter avec variables d'environnement

const client = new TwitterApi({
    appKey: 'MQnQJz6JfQ6FdbhGjmsgtN5aE', // Remplace par ta vraie API Key
    appSecret: 'MO4J0paVS0kvmPvSh715OjDU5R8cjJuWlOPN6Zz5JDPZqgmb5G',         // Remplace par ton vrai API Secret
    accessToken: '1509015998317404161-0PtKc05VWPikCLXyKtXvIIo5IQ8GUF',    // Ton Access Token
    accessSecret: 'ejdT2uFYLQXFvHM1rkoJXe6U2FX0PHTqWjgqVQhm3EmoL',  // Ton Access Secret
  });

// Hashtags pertinents
const hashtags = "#CitationDuJour #Motivation #Inspiration";

// Récupérer une citation aléatoire depuis Quotable
async function getRandomQuote() {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data.content;
    const author = response.data.author;
    return `${quote} - ${author}`;
  } catch (error) {
    console.error("Erreur lors de la récupération de la citation :", error);
    return "La vie est un mystère qu'il faut vivre. - Gandhi"; // Citation de secours
  }
}

// Poster la citation
async function postQuote() {
  const quote = await getRandomQuote();
  const tweet = `${quote} ${hashtags}`;

  try {
    if (tweet.length > 280) {
      const shortQuote = `${quote.substring(0, 280 - hashtags.length - 3)}... ${hashtags}`;
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

// Planifier un post toutes les 6 heures
schedule.scheduleJob('0 */6 * * *', () => {
  postQuote();
});

// Tester au démarrage
postQuote();
console.log("Bot démarré ! Posts toutes les 6 heures.");