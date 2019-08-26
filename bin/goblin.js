#!/usr/bin/env node
const { exec } = require('child_process');
const goblin = require('commander');
const path = require('path')

goblin
  .command('server')
  .alias('s')
  .description('Start GoblinQL Monitoring')
  .action(() => exec(`node ${__dirname}/server.js & open http://localhost:9000/goblinql` ))

goblin.parse(process.argv);


// .action(() => exec(`node ${__dirname}/server.js & open http://localhost:9000/goblinql` ))
