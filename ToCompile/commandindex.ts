// commandindex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import FoundationClasses = require('./FoundationClasses');

const commands = new Map<string, DiscordUser.BotCommand>();
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
import onguildmemberadd from './commands/onguildmemberadd';
commands.set(onguildmemberadd.name, onguildmemberadd);
import onguildmemberremove from './commands/onguildmemberremove';
commands.set(onguildmemberremove.name, onguildmemberremove);
import oninvitecreate from './commands/oninvitecreate';
commands.set(oninvitecreate.name, oninvitecreate);
import onmessagedelete from './commands/onmessagedelete';
commands.set(onmessagedelete.name, onmessagedelete);
import onmessagedeletebulk from './commands/onmessagedeletebulk';
commands.set(onmessagedeletebulk.name, onmessagedeletebulk);
import onmessagereactionadd from './commands/onmessagereactionadd';
commands.set(onmessagereactionadd.name, onmessagereactionadd);
import onmessageupdate from './commands/onmessageupdate';
commands.set(onmessageupdate.name, onmessageupdate);
import onnicknamechange from './commands/onnicknamechange';
commands.set(onnicknamechange.name, onnicknamechange);
import onroleaddorremove from './commands/onroleaddorremove';
commands.set(onroleaddorremove.name, onroleaddorremove);
import onrolecreate from './commands/onrolecreate';
commands.set(onrolecreate.name, onrolecreate);
import onroledelete from './commands/onroledelete';
commands.set(onroledelete.name, onroledelete);
import onusernamechange from './commands/onusernamechange';
commands.set(onusernamechange.name, onusernamechange);
import ping from './commands/ping';
commands.set(ping.name, ping);
import purge from './commands/purge';
commands.set(purge.name, purge);
import serverinfo from './commands/serverinfo';
commands.set(serverinfo.name, serverinfo);
import setbordercolor from './commands/setbordercolor';
commands.set(setbordercolor.name, setbordercolor);
import etdefaultrole from './commands/setdefaultrole';
commands.set(etdefaultrole.name, etdefaultrole);
import setdeletionstatus from './commands/setdeletionstatus';
commands.set(setdeletionstatus.name, setdeletionstatus);
import setreplacementinvite from './commands/setreplacementinvite';
commands.set(setreplacementinvite.name, setreplacementinvite);
import setverificationsystem from './commands/setverificationsystem';
commands.set(setverificationsystem.name, setverificationsystem);
import slashcommands from './commands/slashcommands';
commands.set(slashcommands.name, slashcommands);
import test from './commands/test';
commands.set(test.name, test);
import timedmessages from './commands/timedmessages';
commands.set(timedmessages.name, timedmessages);
import trackuser from './commands/trackuser';
commands.set(trackuser.name, trackuser);
import userinfo from './commands/userinfo';
commands.set(userinfo.name, userinfo);

export default {commands};
