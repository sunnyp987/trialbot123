const fs = require('fs');
const { messageID, emojiID, trialRoleID } = require('../config.json');

module.exports = (reaction, user) => {
  if (
    reaction.message.id !== messageID ||
    ![reaction.emoji.name, reaction.emoji.id].includes(emojiID) ||
    user.bot
  )
    return;
  reaction.users.remove(user);
  const cache = JSON.parse(fs.readFileSync('./data/cache.json'));
  if (cache.includes(user.id))
    return user
      .send("You've already used your seven day trial!")
      .catch(() => {});
  reaction.message.guild.member(user).roles.set([trialRoleID]);
  user.send('Your seven day trial has started!');
  const data = {
    id: user.id,
    end: Date.now() + 6.048e8,
  };
  fs.writeFileSync(
    './data/cache.json',
    JSON.stringify([...cache, user.id], '', 2)
  );
  fs.writeFileSync(
    './data/timers.json',
    JSON.stringify(
      [...JSON.parse(fs.readFileSync('./data/timers.json')), data],
      '',
      2
    )
  );

  require('../handlers/timers.js').startTimer(data, reaction.message.guild);
};
