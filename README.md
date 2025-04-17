# Twitter Quote Bot

A simple bot that posts motivational and inspirational quotes to Twitter every 6 hours. The bot fetches quotes from an external API and falls back to predefined quotes if the API is unavailable.

## Features

- Fetches random quotes from [ZenQuotes API](https://zenquotes.io/).
- Posts quotes to Twitter with hashtags.
- Automatically shortens tweets if they exceed the 280-character limit.
- Runs every 6 hours using a scheduler.
- Includes a simple web server for monitoring.

## Prerequisites

- Node.js installed on your machine.
- A Twitter Developer account with API keys and tokens.
- A `.env` file with the following variables:

```plaintext
TWITTER_APP_KEY=your-twitter-app-key
TWITTER_APP_SECRET=your-twitter-app-secret
TWITTER_ACCESS_TOKEN=your-twitter-access-token
TWITTER_ACCESS_SECRET=your-twitter-access-secret
PORT=3000
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/twitter-quote-bot.git
   cd twitter-quote-bot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Twitter API credentials.

4. Start the bot:

   ```bash
   node index.js
   ```

## Usage

- The bot will automatically post quotes to Twitter every 6 hours.
- You can access the web server at `http://localhost:3000/run` to confirm the bot is running.

## Dependencies

- [twitter-api-v2](https://www.npmjs.com/package/twitter-api-v2)
- [node-schedule](https://www.npmjs.com/package/node-schedule)
- [axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.