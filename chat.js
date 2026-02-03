"use strict";
import { green, red } from './simple-color.js';

export class ChatClient {

    constructor(redisPublishClient, redisSubscribeClient, terminal, channelName) {
        this.redisPublishClient = redisPublishClient;
        this.redisSubscribeClient = redisSubscribeClient; 
        this.terminal = terminal;
        this.channelName = channelName;
        this.isRunning = true;
        this.username = undefined;
    }

    async run() {
        await this.subscribeToChannel();

        // main loop ...
        while(this.isRunning) {
            const txt = await this.terminal.question("> ");
            if (txt.startsWith('/')) {
                let success = await this.handleSlashCommands(txt);
                if (!success) {
                    this.writeError(`Bad Command: ${txt}`);
                } else {
                    this.write(`ok.`);
                }
            } else {
                await this.send(txt);
            }
        }
    }

    async subscribeToChannel() {
        try {
            // TODO!
            // await this.redisSubscribeClient.subscribe(??????);
        } catch(err) {
            this.writeError(`Failed subscribe to channel: ${err}`);
        }
    }

    async send(msg) {
        if (this.username === undefined) {
            this.writeError("Tell me your /name first!");
            return;
        }
        try {
            // TODO!
            // await.this.redisPublishClient.publish(????????);
        } catch(err) {
            this.writeError(`Failed sending message: ${err}`);
        }
    }

    async handleSlashCommands(text) {
        if (text === undefined) {
            return;
        }
        const command = this.parseCommand(text);
        if (command === undefined || command.length === 0) {
            // bad command
            return false;
        }
        switch(command[0].toLowerCase()) {
            // TODO: /commands?
            default:
                return false;
        }
        return true;
    }

    write(txt) {
        console.log(`${green(txt)}`);
    }

    writeError(txt) {
        console.log(`${red(txt)}\n`);
    }

    parseCommand(text) {
        if (typeof text !== 'string' || !text.startsWith('/')) {
            return undefined;
        }
        return text.slice(1) // remove "/"
            .split(' ')
            .filter(token => token !== '');
    }
}