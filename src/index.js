/* eslint-disable no-mixed-operators */
/*
 *
 */
import { isBoolean, isInteger, isString } from 'lodash';
/*
 *
 */
export default class IbtLog {
  static FATAL = 1;
  static ERROR = 2;
  static WARN = 3;
  static INFO = 4;
  static DEBUG = 5;
  static TRACE = 6;
  static VERBOSE = 7;
  static #className = 'IbtLog';
  static #logLevels = {
    0: 'OFF  ', // 0, false
    1: 'FATAL', // 1
    2: 'ERROR', // 2
    3: 'WARN ', // 3
    4: 'INFO ', // 4, true (default value)
    5: 'DEBUG', // 5
    6: 'TRACE', // 6
    7: 'ALL  ', // 7
  };
  static #defaultLogLevel = 4;
  static #defaultPrependString = '\n';
  static #defaultShowTimestamp = true;
  static #defaultSeparatorString = '|';
  static #defaultAppendString = '\n';
  /*
   *
   */
  static #logLevel = null;
  static #prependString = null;
  static #showTimestamp = null;
  static #separatorString = null;
  static #appendString = null;
  static #customLogLevels = {};
  /**
   *
   * @param {*} logLevel
   * @returns
   */
  static #getNormalizedLogLevel = logLevel => {
    if (isBoolean(logLevel) || isInteger(logLevel) && logLevel >= 0 && logLevel <= 7) {
      return logLevel === false ? 0 : logLevel === true ? IbtLog.#defaultLogLevel : logLevel;
    }
    console.warn(`${IbtLog.#className} - Wrong provided logLevel! Setting default.`, {
      providedLogLevel: logLevel,
      defaultLogLevel: `${IbtLog.#defaultLogLevel} - ${IbtLog.#logLevels[IbtLog.#defaultLogLevel].trim()}`,
    });
    return IbtLog.#logLevel || IbtLog.#defaultLogLevel;
  };
  /**
   *
   * @param {*} param0
   */
  static #init = ({
    logLevel = IbtLog.#defaultLogLevel,
    prependString = IbtLog.#defaultPrependString,
    showTimestamp = IbtLog.#defaultShowTimestamp,
    separatorString = IbtLog.#defaultSeparatorString,
    appendString = IbtLog.#defaultAppendString,
  }) => {
    if (IbtLog.#logLevel === null) {
      IbtLog.#logLevel = IbtLog.#getNormalizedLogLevel(logLevel);
      if (!isString(prependString)) {
        console.warn(`${IbtLog.#className}.init - Provided prependString is not a string! Setting default.`, {
          providedPrependString: prependString,
          defaultPrependString: `${IbtLog.#defaultPrependString}`,
        });
        IbtLog.#prependString = IbtLog.#defaultPrependString;
      } else {
        IbtLog.#prependString = prependString;
      }
      if (!isString(separatorString)) {
        console.warn(`${IbtLog.#className}.init - Provided separatorString is not a string! Setting default.`, {
          providedSeparatorString: separatorString,
          defaultSeparatorString: `${IbtLog.#defaultSeparatorString}`,
        });
        IbtLog.#separatorString = IbtLog.#defaultSeparatorString;
      } else {
        IbtLog.#separatorString = separatorString;
      }
      if (!isBoolean(showTimestamp)) {
        console.warn(`${IbtLog.#className}.init - Provided showTimestamp is not boolean! Setting default.`, {
          providedShowTimestamp: showTimestamp,
          defaultShowTimestamp: `${IbtLog.#defaultShowTimestamp}`,
        });
        IbtLog.#showTimestamp = IbtLog.#defaultSeparatorString;
      } else {
        IbtLog.#showTimestamp = showTimestamp === true;
      }
      if (!isString(appendString)) {
        console.warn(`${IbtLog.#className}.init - Provided appendString is not a string! Setting default.`, {
          providedAppendString: appendString,
          defaultAppendString: `${IbtLog.#defaultAppendString}`,
        });
        IbtLog.#appendString = IbtLog.#defaultAppendString;
      } else {
        IbtLog.#appendString = appendString;
      }
    }
  };
  /**
   *
   * @param {*} param0
   */
  static init = ({
    logLevel = IbtLog.#defaultLogLevel,
    prependString = IbtLog.#defaultPrependString,
    showTimestamp = IbtLog.#defaultShowTimestamp,
    separatorString = IbtLog.#defaultSeparatorString,
    appendString = IbtLog.#defaultAppendString,
  }) => {
    if (IbtLog.#logLevel !== null) {
      console.warn(`${IbtLog.#className}.init - Log already initialized! Skipping...`);
    } else {
      IbtLog.#init({
        logLevel,
        prependString,
        showTimestamp,
        separatorString,
        appendString,
      });
    }
    //
  };
  /**
   *
   * @param {*} logLevel
   * @param {*} logContainerName
   */
  static setLogLevel = (logLevel = IbtLog.#defaultLogLevel, logContainerName = null) => {
    if (isString(logContainerName)) {
      IbtLog.#customLogLevels[logContainerName.trim()] = IbtLog.#getNormalizedLogLevel(logLevel);
    } else {
      IbtLog.#logLevel = IbtLog.#getNormalizedLogLevel(logLevel);
    }
  };
  /**
   *
   * @param {*} containerName
   * @param {*} logPath
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static trace = async (containerName, logPath, message, data) => IbtLog.#log(6, containerName, logPath, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} logPath
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static debug = async (containerName, logPath, message, data) => IbtLog.#log(5, containerName, logPath, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} logPath
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static info = async (containerName, logPath, message, data) => IbtLog.#log(4, containerName, logPath, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} logPath
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static warn = async (containerName, logPath, message, data) => IbtLog.#log(3, containerName, logPath, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} logPath
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static error = async (containerName, logPath, message, data) => IbtLog.#log(2, containerName, logPath, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} logPath
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static fatal = async (containerName, logPath, message, data) => IbtLog.#log(1, containerName, logPath, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} logPath
   * @param {*} messageOrData
   * @param {*} data
   * @returns
   */
  static #log = async (
    level = IbtLog.#defaultLogLevel,
    containerName = '',
    logPath = null,
    messageOrData = null,
    data = {}
  ) =>
    new Promise(resolve => {
      IbtLog.#init({});
      const trimmedPrimaryName = isString(containerName) ? containerName.trim() : '';
      if (
        IbtLog.#logLevel &&
        (trimmedPrimaryName.length &&
          trimmedPrimaryName in IbtLog.#customLogLevels &&
          IbtLog.#customLogLevels[trimmedPrimaryName] >= level ||
          IbtLog.#logLevel >= level)
      ) {
        const logFunction = level < 3 ? console.error : level === 3 ? console.warn : console.log;
        let logString = `${IbtLog.#prependString}`;
        if (IbtLog.#showTimestamp) {
          logString += ` ${Date.now()}`;
        }
        logString += ' ';
        logString += `${IbtLog.#logLevels[level]}`;
        logString += ' ';
        logString += `${IbtLog.#separatorString} ${trimmedPrimaryName}`.trim();
        if (logPath) {
          logString += ' ';
          logString += `${IbtLog.#separatorString} ${logPath}`.trim();
        }
        if (messageOrData) {
          if (isString(messageOrData)) {
            logString += ` ${IbtLog.#separatorString} ${messageOrData}`;
            if (data.constructor !== Object || Object.entries(data).length === 0) {
              logFunction(logString, IbtLog.#appendString);
            } else {
              logString += ` ${IbtLog.#separatorString}`;
              logFunction(logString, data, IbtLog.#appendString);
            }
          } else if (
            messageOrData !== null &&
            typeof messageOrData === 'object' &&
            messageOrData.constructor === Object &&
            Object.entries(messageOrData).length > 0
          ) {
            logString += ` ${IbtLog.#separatorString}`;
            logFunction(logString, messageOrData, IbtLog.#appendString);
          } else {
            logFunction(logString, IbtLog.#appendString);
          }
        } else {
          logFunction(logString, IbtLog.#appendString);
        }
      }
      resolve(true);
    })
.catch(error =>
      console.error(`${IbtLog.#className}.#log`, {
        error,
        code: error?.code,
        name: error?.name,
        message: error?.message,
        type: error?.type,
      })
    );
}
