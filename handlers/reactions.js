const { messageID, channelID, emojiID } = require('../config.json');

exports.init = async (client) => {
  const message = await client.channels.cache
    .get(channelID)
    .messages.fetch(messageID);

 const reaction = await message.reactions.cache.find(
    ({ emoji: { name, id } }) => [name, id].includes(emojiID)
  );

  if (!reaction) return message.react(emojiID);

  await reaction.remove();
  message.react(emojiID);
};
