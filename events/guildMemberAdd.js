module.exports = (member) =>
  member.roles.add(require('../config.json').joinRoleID);
