// Use require to avoid hoisting. We need dotenv to be configured before config is loaded for the first time.
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');

import _ from 'lodash';
import express from 'express';
import redis from 'redis';
import { createLightship } from 'lightship';
import http from 'http';
import socketIO from 'socket.io';
import winston from 'winston';

if( config.logger.logToConsole ) {
    winston.add(new winston.transports.Console());
}

const redisConfig = _.omit(config.redis, ['channel']);
const redisClient = redis.createClient(redisConfig);

// Configure lightship for graceful shutdowns.
// If lightship is enabled, it will also provide health check endpoints for Kubernetes environments
let lightShipConfig = {};
if( config.health.isEnabled ) {
    lightShipConfig.port = config.health.port;
}

const lightship = createLightship(lightShipConfig);

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.static('dist/client'));

let health = {
    serverOk: false,
    get redisOk() {
        return redisClient.connected;
    }
};

setupWindowsShutdownWorkaround();
lightship.registerShutdownHandler(handleGracefulShutdown);

io.on('connect', handleSocketConnect);

// Anytime our redis client potentially changes its connection status, update our health response
redisClient.on('ready', updateHealthResponse);
redisClient.on('connect', updateHealthResponse);
redisClient.on('reconnecting', updateHealthResponse);
redisClient.on('error', updateHealthResponse);

// Setup redis message proxy to client sockets
redisClient.on('message', handleRedisMessage);

// Setup redis status messages for client sockets (i.e. notify clients when redis events are not being streamed)
redisClient.on('connect', handleRedisConnect);
redisClient.on('reconnecting', handleRedisReconnect);
redisClient.on('end', handleRedisEnd);

redisClient.subscribe(config.redis.channel);
server.listen(config.server.port, handleServerReady);

function handleRedisMessage(channel, msg) {
    msg = JSON.parse(msg);
    io.sockets.emit('log', msg);

    winston.debug('redis log received', msg);
}

function setupWindowsShutdownWorkaround() {
    // Windows specific workaround for gracefully shutting down
    // https://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
    if( process.platform === 'win32' ) {
        let rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('SIGINT', function polyfillSigInt() {
            process.emit('SIGINT');
        });
    }
}

function handleSocketConnect(socket) {
    socket.emit('status', { connected: health.redisOk });
}

function handleRedisConnect() {
    winston.info('connected to redis');
    io.sockets.emit('status', { connected: true });
}

function handleRedisReconnect(event) {
    winston.warn('reconnecting to redis', event);
}

function handleRedisEnd() {
    winston.info('disconnected from redis');
    io.sockets.emit('status', { connected: false });
}

function handleGracefulShutdown() {
    winston.info('gracefully shutting down server');

    redisClient.quit();
    server.shutdown();
}

function handleServerReady() {
    winston.info(`Server ready. Listening on port ${config.server.port}`);

    health.serverOk = true;
    updateHealthResponse();
}

function updateHealthResponse() {
    let isReady = health.serverOk && health.redisOk;

    isReady ?
        lightship.signalReady() :
        lightship.signalNotReady();
}