/* eslint-disable import/no-extraneous-dependencies */

/*
 * PM2 is capable of running babel-node as an alternative interpreter, but killing the process
 * via PM2 would sometimes not work and leave the babel-node process hanging. By using Babel's
 * require hook, PM2 runs the regular node executable, which seems more reliable.
 * http://pm2.keymetrics.io/docs/tutorials/using-transpilers-with-pm2
 */

require('babel-register')
require('./index.js')
