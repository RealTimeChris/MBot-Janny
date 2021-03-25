// commandindex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var commands = new Map();
var botinfo_1 = require("./botinfo");
commands.set(botinfo_1.default.name, botinfo_1.default);
var deletedbentry_1 = require("./deletedbentry");
commands.set(deletedbentry_1.default.name, deletedbentry_1.default);
var displayguildsdata_1 = require("./displayguildsdata");
commands.set(displayguildsdata_1.default.name, displayguildsdata_1.default);
var ghost_1 = require("./ghost");
commands.set(ghost_1.default.name, ghost_1.default);
var help_1 = require("./help");
commands.set(help_1.default.name, help_1.default);
var jannyoptions_1 = require("./jannyoptions");
commands.set(jannyoptions_1.default.name, jannyoptions_1.default);
var listdbguilds_1 = require("./listdbguilds");
commands.set(listdbguilds_1.default.name, listdbguilds_1.default);
exports.default = { commands: commands };
