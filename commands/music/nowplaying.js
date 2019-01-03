const LenoxCommand = require('../LenoxCommand.js');

module.exports = class nowplayingCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'nowplaying',
			group: 'music',
			memberName: 'nowplaying',
			description: 'Shows you the current music title',
			format: 'nowplaying',
			aliases: ['np'],
			examples: ['nowplaying'],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: [],
			shortDescription: 'General',
			dashboardsettings: true
		});
	}

	run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);

		const queue = msg.client.queue;
		const serverQueue = queue.get(msg.guild.id);
		if (!serverQueue) return msg.channel.send(lang.nowplaying_nothing);

		const nowplaying = lang.nowplaying_nowplaying.replace('%songtitle', `**${serverQueue.songs[0].title}**`);
		return msg.channel.send(nowplaying);
	}
};