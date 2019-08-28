#!/usr/bin/env node
const { exec } = require('child_process');
const goblin = require('commander');
const path = require('path')

goblin
  .command('monitor')
  .alias('m')
  .description('Start GoblinQL Monitoring')
  .action(() => exec(`node ${__dirname}/server/wsServer.js & sleep 0.25; open http://localhost:9000` ))

goblin.parse(process.argv);


// .action(() => exec(`node ${__dirname}/server.js & open http://localhost:9000/goblinql` ))
