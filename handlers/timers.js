const fs = require('fs');

module.exports = {
  startTimer({ end, id }, guild) {
    setTimeout(async () => {
      let member;
      try {
        member = await guild.members.fetch({ user: id });
      } catch (e) {
        return;
      }
      member.send('Your seven day trial has expired!').catch(() => {});
      member.roles.remove(require('../config.json').trialRoleID);
      fs.writeFileSync(
        './data/timers.json',
        JSON.stringify(
          JSON.parse(fs.readFileSync('./data/timers.json')).filter(
            (entry) => entry.id !== id
          ),
          '',
          2
        )
      );
    }, end - Date.now());
  },
  init(guild) {
    JSON.parse(fs.readFileSync('./data/timers.json')).forEach((entry) =>
      this.startTimer(entry, guild)
    );
  },
};
