// CommandIndex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import FoundationClasses from './FoundationClasses';

const botCommands = new Map<string, FoundationClasses.BotCommand>();
import botinfo from './commands/botinfo';
botCommands.set(botinfo.name, botinfo);
import deletedbentry from './commands/deletedbentry';
botCommands.set(deletedbentry.name, deletedbentry);
import displayguildsdata from './commands/displayguildsdata';
botCommands.set(displayguildsdata.name, displayguildsdata);
import ghost from './commands/ghost';
botCommands.set(ghost.name, ghost);
import help from './commands/help';
botCommands.set(help.name, help);
import jannyoptions from './commands/jannyoptions';
botCommands.set(jannyoptions.name, jannyoptions);
import listdbguilds from './commands/listdbguilds';
botCommands.set(listdbguilds.name, listdbguilds);
import managelogs from './commands/managelogs';
botCommands.set(managelogs.name, managelogs);
import message from './commands/message';
botCommands.set(message.name, message);
import ondisplaynamechange from './commands/ondisplaynamechange';
botCommands.set(ondisplaynamechange.name, ondisplaynamechange);
import onguildbanadd from './commands/onguildbanadd';
botCommands.set(onguildbanadd.name, onguildbanadd);
import onguildbanremove from './commands/onguildbanremove';
botCommands.set(onguildbanremove.name, onguildbanremove);
import onguilddelete from './commands/onguilddelete';
botCommands.set(onguilddelete.name, onguilddelete);
import onguildmemberadd from './commands/onguildmemberadd';
botCommands.set(onguildmemberadd.name, onguildmemberadd);
import onguildmemberremove from './commands/onguildmemberremove';
botCommands.set(onguildmemberremove.name, onguildmemberremove);
import oninvitecreate from './commands/oninvitecreate';
botCommands.set(oninvitecreate.name, oninvitecreate);
import onmessagedelete from './commands/onmessagedelete';
botCommands.set(onmessagedelete.name, onmessagedelete);
import onmessagedeletebulk from './commands/onmessagedeletebulk';
botCommands.set(onmessagedeletebulk.name, onmessagedeletebulk);
import onmessagereactionadd from './commands/onmessagereactionadd';
botCommands.set(onmessagereactionadd.name, onmessagereactionadd);
import onmessageupdate from './commands/onmessageupdate';
botCommands.set(onmessageupdate.name, onmessageupdate);
import onnicknamechange from './commands/onnicknamechange';
botCommands.set(onnicknamechange.name, onnicknamechange);
import onroleaddorremove from './commands/onroleaddorremove';
botCommands.set(onroleaddorremove.name, onroleaddorremove);
import onrolecreate from './commands/onrolecreate';
botCommands.set(onrolecreate.name, onrolecreate);
import onroledelete from './commands/onroledelete';
botCommands.set(onroledelete.name, onroledelete);
import onusernamechange from './commands/onusernamechange';
botCommands.set(onusernamechange.name, onusernamechange);
import ping from './commands/ping';
botCommands.set(ping.name, ping);
import purge from './commands/purge';
botCommands.set(purge.name, purge);
import serverinfo from './commands/serverinfo';
botCommands.set(serverinfo.name, serverinfo);
import setbordercolor from './commands/setbordercolor';
botCommands.set(setbordercolor.name, setbordercolor);
import etdefaultrole from './commands/setdefaultrole';
botCommands.set(etdefaultrole.name, etdefaultrole);
import setdeletionstatus from './commands/setdeletionstatus';
botCommands.set(setdeletionstatus.name, setdeletionstatus);
import setreplacementinvite from './commands/setreplacementinvite';
botCommands.set(setreplacementinvite.name, setreplacementinvite);
import setverificationsystem from './commands/setverificationsystem';
botCommands.set(setverificationsystem.name, setverificationsystem);
import slashcommands from './commands/slashcommands';
botCommands.set(slashcommands.name, slashcommands);
import test from './commands/test';
botCommands.set(test.name, test);
import timedmessages from './commands/timedmessages';
botCommands.set(timedmessages.name, timedmessages);
import trackuser from './commands/trackuser';
botCommands.set(trackuser.name, trackuser);
import userinfo from './commands/userinfo';
botCommands.set(userinfo.name, userinfo);

export default botCommands as Map<string, FoundationClasses.BotCommand>;
