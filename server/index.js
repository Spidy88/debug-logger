// Use require to avoid hoisting. We need dotenv to be configured before config is loaded for the first time.
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');

import express from 'express';
import { createLightship } from 'lightship';
import http from 'http';
import winston from 'winston';

// Configure lightship for graceful shutdowns.
// If lightship is enabled, it will also provide health check endpoints for Kubernetes environments
let lightShipConfig = {};
if( config.health.isEnabled ) {
    lightShipConfig.port = config.health.port;
}

const lightship = createLightship(lightShipConfig);

const app = express();
const server = http.Server(app);

app.use(express.static('dist/client'));

let health = {
    serverOk: false
};

setupWindowsShutdownWorkaround();
lightship.registerShutdownHandler(handleGracefulShutdown);

server.listen(config.server.port, handleServerReady);

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

function handleGracefulShutdown() {
    winston.info('gracefully shutting down server');

    server.shutdown();
}

function handleServerReady() {
    winston.info(`Server ready. Listening on port ${config.server.port}`);

    health.serverOk = true;
    updateHealthResponse();
}

function updateHealthResponse() {
    let isReady = health.serverOk;

    isReady ?
        lightship.signalReady() :
        lightship.signalNotReady();
}