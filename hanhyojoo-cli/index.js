#!/usr/bin/env node
const { program } = require("commander");
const helpOptions = require("./lib/core/help.js");
const createTemp = require("./lib/core/create.js");

// version
program.version(require("./package.json").version);

helpOptions();
createTemp();

program.parse(process.argv);
