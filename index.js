const { Client } = require('discord.js');

const client = new Client();
require('./handlers/events').init(client);

process.on('unhandledRejection', (error) => console.log(`Error: ${error}. Trace: ${error.stack}`));

client.login(process.env.TOKEN);
