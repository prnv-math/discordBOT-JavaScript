const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const ggdeploy = 0;

// Place your client and guild ids here
const clientId = '935781313028435998';
const guildId = '936702937139392633';

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// const rest = new REST({ version: '9' }).setToken(token.BOT_TOKEN);
//---------------------------------------------------------------------

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		if (ggdeploy = 0) 
		{
		await rest.put
		(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		}
		else {
		await rest.put
		(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		}

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error("[ ERROR ] " + error);
	}
})();