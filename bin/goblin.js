#!/usr/bin/env node
const { exec } = require('child_process');
const goblin = require('commander');

goblin
  .command('server')
  .alias('s')
  .description('Start GoblinQL Monitoring')
  .action(() => exec('node ./node_modules/goblin-ql/server.js & open http://localhost:9000/goblinql'))

goblin.parse(process.argv);