# @infobiotech/js-logger

An helper static class to handle logging on JavaScript projects such as Node.js, React and React Native.

## Installation

```bash
yarn add @infobiotech/js-logger
```

Or

```bash
npm install @infobiotech/js-logger
```

## Basic usage

```javascript
import logger from '@infobiotech/js-logger';

// other imports...

// Initialize the logger with application-wide log level
logger.init({
  logLevel: logger.INFO,
});

// for each container, set the name and the log level
const logContainerName = 'App';
logger.setLogLevel(log.INFO, logContainerName);

logger.info(logContainerName, 'methodName', 'message', {
  // data keys to be logged
});
```
