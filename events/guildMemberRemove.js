const config = require("../config.json");
const BordPiHelper = require("../modules/BordPiHelper");

module.exports = {
  name: "guildMemberRemove",
  description: "Guild Member Remove",
  execute(member, client) {
    const g = client.guilds.cache.get(config.serverId);
    BordPiHelper.LogsMemberInOutServer(
      client,
      `quitté`,
      config.colors.DangerColor
    );
    console.log(`📥  — ${client.username} (${client.id}) a rejoint ${g.name}`);
  },
};
