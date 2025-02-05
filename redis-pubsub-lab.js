"use strict";
// reading and writing to the console
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const terminal = readline.createInterface(input, output);

// redis client
import redis from 'redis';
const redisPublishClient = redis.createClient();
await redisPublishClient.connect();
const redisSubscribeClient = redis.createClient();
await redisSubscribeClient.connect();

import { ChatClient } from './chat.js';

const client = new ChatClient(redisPublishClient, redisSubscribeClient, terminal, 'global-chat');
console.log("Ready to Chat!");
await client.run();

 // cleanup
 terminal.close();
 await redisPublishClient.disconnect();
 await redisSubscribeClient.disconnect();
 console.log("Bye.");