#!/usr/bin/env node
const { exec } = require('child_process');
const goblin = require('commander');
const path = require('path');

goblin
  .command('monitor') // argument passed to bin script
  .alias('m') // shorthand for monitor argument e.g. goblin monitor === goblin m
  .description('Start GoblinQL Monitoring Service') // part of --help flag for goblin script
  .action(() => exec(`node ${__dirname}/server/wsServer.js & sleep 0.25; open http://localhost:9000` ))

goblin.parse(process.argv); // commander parses and processes arguments to execute script in shell


// .action(() => exec(`node ${__dirname}/server.js & open http://localhost:9000/goblinql` ))
