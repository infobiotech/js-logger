/* eslint-disable no-mixed-operators */
/*
 *
 */
import { isBoolean, isInteger, isString } from 'lodash';
/*
 *
 */
export default class IbtJsLogger {
  /*
   *
   */
  static #className = 'IbtJsLogger';
  /*
   *
   */
  static FATAL = 1;
  static ERROR = 2;
  static WARN = 3;
  static INFO = 4;
  static DEBUG = 5;
  static TRACE = 6;
  static VERBOSE = 7;
  /*
   *
   */
  static LogLevel = 'logLevel';
  static PrependString = 'prependString';
  static ShowTimestamp = 'showTimestamp';
  static SeparatorString = 'separatorString';
  static AppendString = 'appendString';
  /*
   *
   */
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
  /*
   *
   */
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
  /*
   *
   */
  static #customLogLevels = {};
  /**
   *
   * @param {*} logLevel
   * @returns
   */
  static #getNormalizedLogLevel = logLevel => {
    if (isBoolean(logLevel) || isInteger(logLevel) && logLevel >= 0 && logLevel <= 7) {
      return logLevel === false ? 0 : logLevel === true ? IbtJsLogger.#defaultLogLevel : logLevel;
    }
    console.warn(`${IbtJsLogger.#className} - Wrong provided logLevel! Setting default.`, {
      providedLogLevel: logLevel,
      defaultLogLevel: `${IbtJsLogger.#defaultLogLevel} - ${IbtJsLogger.#logLevels[IbtJsLogger.#defaultLogLevel].trim()}`,
    });
    return IbtJsLogger.#logLevel || IbtJsLogger.#defaultLogLevel;
  };
  /**
   *
   * @param {*} param0
   */
  static #init = ({
    logLevel = IbtJsLogger.#defaultLogLevel,
    prependString = IbtJsLogger.#defaultPrependString,
    showTimestamp = IbtJsLogger.#defaultShowTimestamp,
    separatorString = IbtJsLogger.#defaultSeparatorString,
    appendString = IbtJsLogger.#defaultAppendString,
  }) => {
    if (IbtJsLogger.#logLevel === null) {
      IbtJsLogger.#logLevel = IbtJsLogger.#getNormalizedLogLevel(logLevel);
      if (!isString(prependString)) {
        console.warn(`${IbtJsLogger.#className}.init - Provided prependString is not a string! Setting default.`, {
          providedPrependString: prependString,
          defaultPrependString: `${IbtJsLogger.#defaultPrependString}`,
        });
        IbtJsLogger.#prependString = IbtJsLogger.#defaultPrependString;
      } else {
        IbtJsLogger.#prependString = prependString;
      }
      if (!isString(separatorString)) {
        console.warn(`${IbtJsLogger.#className}.init - Provided separatorString is not a string! Setting default.`, {
          providedSeparatorString: separatorString,
          defaultSeparatorString: `${IbtJsLogger.#defaultSeparatorString}`,
        });
        IbtJsLogger.#separatorString = IbtJsLogger.#defaultSeparatorString;
      } else {
        IbtJsLogger.#separatorString = separatorString;
      }
      if (!isBoolean(showTimestamp)) {
        console.warn(`${IbtJsLogger.#className}.init - Provided showTimestamp is not boolean! Setting default.`, {
          providedShowTimestamp: showTimestamp,
          defaultShowTimestamp: `${IbtJsLogger.#defaultShowTimestamp}`,
        });
        IbtJsLogger.#showTimestamp = IbtJsLogger.#defaultSeparatorString;
      } else {
        IbtJsLogger.#showTimestamp = showTimestamp === true;
      }
      if (!isString(appendString)) {
        console.warn(`${IbtJsLogger.#className}.init - Provided appendString is not a string! Setting default.`, {
          providedAppendString: appendString,
          defaultAppendString: `${IbtJsLogger.#defaultAppendString}`,
        });
        IbtJsLogger.#appendString = IbtJsLogger.#defaultAppendString;
      } else {
        IbtJsLogger.#appendString = appendString;
      }
    }
  };
  /**
   *
   * @param {*} param0
   */
  static init = ({
    logLevel = IbtJsLogger.#defaultLogLevel,
    prependString = IbtJsLogger.#defaultPrependString,
    showTimestamp = IbtJsLogger.#defaultShowTimestamp,
    separatorString = IbtJsLogger.#defaultSeparatorString,
    appendString = IbtJsLogger.#defaultAppendString,
  }) => {
    if (IbtJsLogger.#logLevel !== null) {
      console.warn(`${IbtJsLogger.#className}.init - Logger already initialized! Skipping...`);
    } else {
      IbtJsLogger.#init({
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
  static setLogLevel = (logLevel = IbtJsLogger.#defaultLogLevel, logContainerName = null) => {
    if (isString(logContainerName)) {
      IbtJsLogger.#customLogLevels[logContainerName.trim()] = IbtJsLogger.#getNormalizedLogLevel(logLevel);
    } else {
      IbtJsLogger.#logLevel = IbtJsLogger.#getNormalizedLogLevel(logLevel);
    }
  };
  /**
   *
   * @param {*} containerName
   * @param {*} tag
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static trace = async (containerName, tag, message, data) => IbtJsLogger.#log(6, containerName, tag, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} tag
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static debug = async (containerName, tag, message, data) => IbtJsLogger.#log(5, containerName, tag, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} tag
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static info = async (containerName, tag, message, data) => IbtJsLogger.#log(4, containerName, tag, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} tag
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static warn = async (containerName, tag, message, data) => IbtJsLogger.#log(3, containerName, tag, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} tag
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static error = async (containerName, tag, message, data) => IbtJsLogger.#log(2, containerName, tag, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} tag
   * @param {*} message
   * @param {*} data
   * @returns
   */
  static fatal = async (containerName, tag, message, data) => IbtJsLogger.#log(1, containerName, tag, message, data);
  /**
   *
   * @param {*} containerName
   * @param {*} tag
   * @param {*} messageOrData
   * @param {*} data
   * @returns
   */
  static #log = async (
    level = IbtJsLogger.#defaultLogLevel,
    containerName = '',
    tag = null,
    messageOrData = null,
    data = {}
  ) =>
    {
      IbtJsLogger.#init({});
      const trimmedPrimaryName = isString(containerName) ? containerName.trim() : '';
      if (
        IbtJsLogger.#logLevel &&
        (trimmedPrimaryName.length &&
          trimmedPrimaryName in IbtJsLogger.#customLogLevels &&
          IbtJsLogger.#customLogLevels[trimmedPrimaryName] >= level ||
          IbtJsLogger.#logLevel >= level)
      ) {
        const logFunction = level < 3 ? console.error : level === 3 ? console.warn : console.log;
        let logString = `${IbtJsLogger.#prependString}`;
        if (IbtJsLogger.#showTimestamp) {
          logString += ` ${Date.now()}`;
        }
        logString += ' ';
        logString += `${IbtJsLogger.#logLevels[level]}`;
        logString += ' ';
        logString += `${IbtJsLogger.#separatorString} ${trimmedPrimaryName}`.trim();
        if (tag) {
          logString += ' ';
          logString += `${IbtJsLogger.#separatorString} ${tag}`.trim();
        }
        if (messageOrData) {
          if (isString(messageOrData)) {
            logString += ` ${IbtJsLogger.#separatorString} ${messageOrData}`;
            if (data.constructor !== Object || Object.entries(data).length === 0) {
              logFunction(logString, IbtJsLogger.#appendString);
            } else {
              logString += ` ${IbtJsLogger.#separatorString}`;
              logFunction(logString, data, IbtJsLogger.#appendString);
            }
          } else if (
            messageOrData !== null &&
            typeof messageOrData === 'object' &&
            messageOrData.constructor === Object &&
            Object.entries(messageOrData).length > 0
          ) {
            logString += ` ${IbtJsLogger.#separatorString}`;
            logFunction(logString, messageOrData, IbtJsLogger.#appendString);
          } else {
            logFunction(logString, IbtJsLogger.#appendString);
          }
        } else {
          logFunction(logString, IbtJsLogger.#appendString);
        }
      }
      return true;
    };
}
