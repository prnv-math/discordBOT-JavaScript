const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = require('./config.json');

const clientId = '935781313028435998';
const guildId = '936702937139392633';

console.log(clientId,guildId)

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	// new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	// new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('commit').setDescription('staff only command.'),
    new SlashCommandBuilder().setName('help').setDescription('Replies with helpful information for you!'),
    new SlashCommandBuilder().setName('start').setDescription('create an account in Disco-Life!'),
    new SlashCommandBuilder().setName('profile').setDescription('View your Disco-Life profile.'),
	new SlashCommandBuilder().setName('rules').setDescription('Disco-Life rules.'),
	new SlashCommandBuilder().setName('gameplayinfo').setDescription('seek general gameplay guidelines.'),
	new SlashCommandBuilder().setName('noticeboard').setDescription('noticeboard for latest game information!'),
	new SlashCommandBuilder().setName('attributes').setDescription("View various attributes of your character."),
	new SlashCommandBuilder().setName('boosts').setDescription("See which boosts are active at the moment for your character."),
	new SlashCommandBuilder().setName('hashtagset').setDescription("let people know how you're feeling!").addStringOption(option => 
		option.setName('hashtag')
		.setDescription('type in a text! no need to use #. (most username rules apply to hashtags)')
		.setRequired(true)
		),
	new SlashCommandBuilder().setName('like').setDescription("Give a Like to a player, select \'mention\' or \'gameid\', and select a user or type in their game id")
	    .addUserOption(option => 
			option.setName('mention')
			.setDescription('This is the field where you can mention a user that you want to give a like to.')
			.setRequired(false))
		.addIntegerOption(option =>
			option.setName('gameid')
			.setDescription("You can type the Disco-Life gameid of a player here.")
			.setRequired(false)
			)
	,
	new SlashCommandBuilder().setName('inventory').setDescription('See what is in your inventory'),
	new SlashCommandBuilder().setName('bank').setDescription('manage your bank account.'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token.BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);