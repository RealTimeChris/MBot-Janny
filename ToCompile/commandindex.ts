// commandindex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict'

import DiscordStuff = require('./DiscordStuff');

const commands = new Map<string, DiscordStuff.BotCommand>();
import botinfo from './commands/botinfo';
commands.set(botinfo.name, botinfo);
import deletedbentry from './commands/deletedbentry';
commands.set(deletedbentry.name, deletedbentry);
import displayguildsdata from './commands/displayguildsdata';
commands.set(displayguildsdata.name, displayguildsdata);
import ghost from './commands/ghost';
commands.set(ghost.name, ghost);
import help from './commands/help';
commands.set(help.name, help);
import jannyoptions from './commands/jannyoptions';
commands.set(jannyoptions.name, jannyoptions);
import listdbguilds from './commands/listdbguilds';
commands.set(listdbguilds.name, listdbguilds);
import managelogs from './commands/managelogs';
commands.set(managelogs.name, managelogs);
import message from './commands/message';
commands.set(message.name, message);
import ondisplaynamechange from './commands/ondisplaynamechange';
commands.set(ondisplaynamechange.name, ondisplaynamechange);
import onguildbanadd from './commands/onguildbanadd';
commands.set(onguildbanadd.name, onguildbanadd);
import onguildbanremove from './commands/onguildbanremove';
commands.set(onguildbanremove.name, onguildbanremove);
import onguilddelete from './commands/onguilddelete';
commands.set(onguilddelete.name, onguilddelete);
import onguildmemberadd from './commands/onguildmemberadd'
commands.set(onguildmemberadd.name, onguildmemberadd);
import onguildmemberremove from './commands/onguildmemberremove'
commands.set(onguildmemberremove.name, onguildmemberremove);
import oninvitecreate from './commands/oninvitecreate'
commands.set(oninvitecreate.name, oninvitecreate);

import purge from './commands/purge'
import { copyFile } from 'fs';
commands.set(purge.name, purge);

export default {commands};
