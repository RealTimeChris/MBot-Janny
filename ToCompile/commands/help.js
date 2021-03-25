// help.js - Module for my help command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'Help Usage: !help, or !help = COMMANDNAME, in order to get help with a specific COMMAND.',
	/**
     * Returns a menu of helping information for the various commands I have.
     * @param   {Discord.Message}             message
     * @param   {String[]}                    args
     * @param   {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
	async execute(message, args) {
		try {
			const commandFiles = fs.readdirSync('commands').filter(file => file.endsWith('.js'));

			if (args[0] === undefined) {
				const commandNames = [String('')];

				commandFiles.map(file => {
					const command = require(`./${file}`);
					commandNames[file] = command.name;
					return commandNames;
				});

				let msgString = String('');
				msgString += '!help = COMMANDNAMEHERE\n\n__**List of command names:**__ ';

				let currentIndex = Number(0);
				commandFiles.map(file => {
					msgString += commandNames[file];
					currentIndex += 1;
					if (currentIndex < commandFiles.length) {
						msgString += ', ';
					}
					return commandNames;
				});

				const messageEmbed = new Discord.MessageEmbed();
				messageEmbed.setImage(message.client.user.avatarURL().toString()).setTimestamp(Date())
					.setAuthor(message.author.username, message.author.avatarURL()).setTitle(`__**${message.client.user.username} Help:**__`)
					.setDescription(msgString)
					.setColor([254, 254, 254]);

				if (message.author.dmChannel == null) {
					const dmChannel = await message.author.createDM();
					await dmChannel.send(messageEmbed);
				} else {
					await message.author.dmChannel.send(messageEmbed);
				}

				if (message.channel.type !== 'dm' && message.deletable) {
					await message.delete();
				}
				return this.name;
			}

			let isFound = false;
			let commandDescription;
			let commandName = String('');

			commandFiles.map(file => {
				const command = require(`./${file}`);
				if (args[0] === command.name) {
					isFound = true;
					commandDescription = command.description;
					commandName = command.name;
				}
				return commandName;
			});

			if (isFound === false) {
				if (message.channel.type !== 'dm' && message.deletable) {
					await message.delete();
				}
				await message.reply('Sorry, but that command was not found!');
				return this.name;
			}

			if (commandDescription instanceof Discord.MessageEmbed) {
				commandDescription.setAuthor(message.author.username,
					message.author.avatarURL()).setColor([254, 254, 254])
					.setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`).setTimestamp(Date());
				await message.channel.send(commandDescription);
			} else {
				const messageEmbed = new Discord.MessageEmbed();
				messageEmbed.setDescription(commandDescription)
					.setTimestamp(Date()).setAuthor(message.author.username, message.author.avatarURL())
					.setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`)
					.setColor([254, 254, 254]);

				await message.channel.send(messageEmbed);
			}
			if (message.channel.type !== 'dm' && message.deletable) {
				await message.delete();
			}
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
