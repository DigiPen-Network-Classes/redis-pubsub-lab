"use strict";
import dotenv from 'dotenv';
dotenv.config();

// reading and writing to the console
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const terminal = readline.createInterface(input, output);

// redis client
import redis from 'redis';
const redisPublishClient = redis.createClient({ url: `redis://:${process.env.REDIS_PASS}@127.0.0.1:6379`});
await redisPublishClient.connect();

const redisSubscribeClient = redis.createClient({ url: `redis://:${process.env.REDIS_PASS}@127.0.0.1:6379`});
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