import Discord = require("discord.js");
import DiscordStuff = require("../DiscordStuff");
export const name: string;
export const description: string;
/**
 * @param {Discord.Client}                              client
 * @param {Discord.Collection<String, Discord.Message>} collection
 * @param {DiscordStuff.DiscordUser}                    discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, collection: Discord.Collection<string, Discord.Message>, discordUser: DiscordStuff.DiscordUser): string;
/**
 * @param {Discord.Client}                              client
 * @param {Discord.Collection<String, Discord.Message>} collection
 * @param {DiscordStuff.DiscordUser}                    discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, collection: Discord.Collection<string, Discord.Message>, discordUser: DiscordStuff.DiscordUser): string;
