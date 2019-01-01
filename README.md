# Debug Logger

<div align="center">
  <a href="https://circleci.com/gh/Spidy88/debug-logger.svg?style=svg&circle-token=5fecffd656fc57c6fba58a95c6ba6fd46b82244e">
    <img src="https://circleci.com/gh/Spidy88/debug-logger.svg?style=svg&circle-token=5fecffd656fc57c6fba58a95c6ba6fd46b82244e" alt="Build Status">
  </a>
  <br />
  <br />
</div>

[Live Demo](https://debug-logger-demo.herokuapp.com/)

A web application for interacting with debug logs. Any application that sends log data to a redis channel can be hooked
up to this web application for easy visualization of log events in real time. To quickly get started, you can spin up
the provided docker-compose.yml and see a dmo in action. If you have your own logs to view, you can 
`docker-compose down stream` to turn off the fake event stream. Your logs should be sent to the `events` channel on the 
redis server (or feel free to change this to whatever you like in the `docker-compose.yml`).

#### Interested in contributing?

Check our [CONTRIBUTING](CONTRIBUTING.md) documentation. 