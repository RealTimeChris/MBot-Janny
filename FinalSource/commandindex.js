// commandindex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var commands = new Map();
var botinfo_1 = require("./commands/botinfo");
commands.set(botinfo_1.default.name, botinfo_1.default);
var deletedbentry_1 = require("./commands/deletedbentry");
commands.set(deletedbentry_1.default.name, deletedbentry_1.default);
var displayguildsdata_1 = require("./commands/displayguildsdata");
commands.set(displayguildsdata_1.default.name, displayguildsdata_1.default);
var ghost_1 = require("./commands/ghost");
commands.set(ghost_1.default.name, ghost_1.default);
var help_1 = require("./commands/help");
commands.set(help_1.default.name, help_1.default);
var jannyoptions_1 = require("./commands/jannyoptions");
commands.set(jannyoptions_1.default.name, jannyoptions_1.default);
var listdbguilds_1 = require("./commands/listdbguilds");
commands.set(listdbguilds_1.default.name, listdbguilds_1.default);
var managelogs_1 = require("./commands/managelogs");
commands.set(managelogs_1.default.name, managelogs_1.default);
var message_1 = require("./commands/message");
commands.set(message_1.default.name, message_1.default);
var ondisplaynamechange_1 = require("./commands/ondisplaynamechange");
commands.set(ondisplaynamechange_1.default.name, ondisplaynamechange_1.default);
var onguildbanadd_1 = require("./commands/onguildbanadd");
commands.set(onguildbanadd_1.default.name, onguildbanadd_1.default);
var onguildbanremove_1 = require("./commands/onguildbanremove");
commands.set(onguildbanremove_1.default.name, onguildbanremove_1.default);
var onguilddelete_1 = require("./commands/onguilddelete");
commands.set(onguilddelete_1.default.name, onguilddelete_1.default);
var onguildmemberadd_1 = require("./commands/onguildmemberadd");
commands.set(onguildmemberadd_1.default.name, onguildmemberadd_1.default);
var onguildmemberremove_1 = require("./commands/onguildmemberremove");
commands.set(onguildmemberremove_1.default.name, onguildmemberremove_1.default);
var oninvitecreate_1 = require("./commands/oninvitecreate");
commands.set(oninvitecreate_1.default.name, oninvitecreate_1.default);
var purge_1 = require("./commands/purge");
commands.set(purge_1.default.name, purge_1.default);
exports.default = { commands: commands };
