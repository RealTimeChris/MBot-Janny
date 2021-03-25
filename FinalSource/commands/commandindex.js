// commandindex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var commands = new Map();
var botinfo_1 = require("./botinfo");
commands.set(botinfo_1.default.name, botinfo_1.default);
exports.default = { commands: commands };
