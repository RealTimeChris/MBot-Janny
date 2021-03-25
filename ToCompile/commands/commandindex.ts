// commandindex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict'

import DiscordStuff = require('../DiscordStuff');

const commands: Map<string, DiscordStuff.BotCommand> = new Map();
import botinfo from './botinfo';
commands.set(botinfo.name, botinfo);
import deletedbentry from './deletedbentry';
commands.set(deletedbentry.name, deletedbentry);
import displayguildsdata from './displayguildsdata';
commands.set(displayguildsdata.name, displayguildsdata);
export default {commands};

