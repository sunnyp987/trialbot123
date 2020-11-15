module.exports = (client) => {
  console.log('Online');
  require('../handlers/timers.js').init(client.guilds.cache.first());
  require('../handlers/reactions.js').init(client);
};
