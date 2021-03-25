// commandindex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict'

import DiscordStuff = require('../DiscordStuff');

const commands: Map<string, DiscordStuff.BotCommand> = new Map();
import botinfo from './botinfo';
commands.set(botinfo.name, botinfo);

export default {commands};

