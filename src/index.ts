import { isBoolean, isInteger, isString } from 'lodash';
type LogLevelNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type LogLevels = {
  [containerName: string]: LogLevelNumber;
}
type LogData = {
  [field: string]: any
}
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
  static FATAL: LogLevelNumber = 1;
  static ERROR: LogLevelNumber = 2;
  static WARN: LogLevelNumber = 3;
  static INFO: LogLevelNumber = 4;
  static DEBUG: LogLevelNumber = 5;
  static TRACE: LogLevelNumber = 6;
  static VERBOSE: LogLevelNumber = 7;
  /*
   *
   */
  static LogLevel = 'logLevel';
  static PrependString = 'prependString';
  static PrefixString = 'prefixString';
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
  static #defaultLogLevel: LogLevelNumber = 4;
  static #defaultPrependString = '\n';
  static #defaultPrefixString = '';
  static #defaultShowTimestamp = true;
  static #defaultSeparatorString = '|';
  static #defaultAppendString = '\n';
  /*
   *
   */
  static #logLevel: LogLevelNumber | null = null;
  static #prependString: string | null = null;
  static #prefixString: string | null = null;
  static #showTimestamp: boolean | null = null;
  static #separatorString: string | null = null;
  static #appendString: string | null = null;
  /*
   *
   */
  static #customLogLevels: LogLevels = {};
  /**
   *
   * @param {*} logLevel
   * @returns
   */
  static #getNormalizedLogLevel = (logLevel: boolean | LogLevelNumber) => {
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
   */
  static #init = ({
    logLevel = IbtJsLogger.#defaultLogLevel,
    prependString = IbtJsLogger.#defaultPrependString,
    prefixString = IbtJsLogger.#defaultPrefixString,
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
      if (!isString(prefixString)) {
        console.warn(`${IbtJsLogger.#className}.init - Provided prefixString is not a string! Setting default.`, {
          providedPrefixString: prefixString,
          defaultPrefixString: `${IbtJsLogger.#defaultPrefixString}`,
        });
        IbtJsLogger.#prefixString = IbtJsLogger.#defaultPrefixString;
      } else {
        IbtJsLogger.#prefixString = prefixString;
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
      // if (!isBoolean(showTimestamp)) { // When should it not be boolean?
      //   console.warn(`${IbtJsLogger.#className}.init - Provided showTimestamp is not boolean! Setting default.`, {
      //     providedShowTimestamp: showTimestamp,
      //     defaultShowTimestamp: `${IbtJsLogger.#defaultShowTimestamp}`,
      //   });
      //   IbtJsLogger.#showTimestamp = IbtJsLogger.#defaultSeparatorString;
      // } else {
        IbtJsLogger.#showTimestamp = showTimestamp === true;
      // }
      // if (!isString(appendString)) { // When should it not be string?
      //   console.warn(`${IbtJsLogger.#className}.init - Provided appendString is not a string! Setting default.`, {
      //     providedAppendString: appendString,
      //     defaultAppendString: `${IbtJsLogger.#defaultAppendString}`,
      //   });
      //   IbtJsLogger.#appendString = IbtJsLogger.#defaultAppendString;
      // } else {
        IbtJsLogger.#appendString = appendString;
      // }
    }
  };
  /**
   *
   */
  static init = ({
    logLevel = IbtJsLogger.#defaultLogLevel,
    prependString = IbtJsLogger.#defaultPrependString,
    prefixString = IbtJsLogger.#defaultPrefixString,
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
        prefixString,
        showTimestamp,
        separatorString,
        appendString,
      });
    }
    //
  };
  /**
   *
   */
  static setLogLevel = (logLevel = IbtJsLogger.#defaultLogLevel, logContainerName: string | null = null) => {
    if (isString(logContainerName)) {
      IbtJsLogger.#customLogLevels[logContainerName.trim()] = IbtJsLogger.#getNormalizedLogLevel(logLevel);
    } else {
      IbtJsLogger.#logLevel = IbtJsLogger.#getNormalizedLogLevel(logLevel);
    }
  };
  /**
   *
   */
  static trace = async (containerName: string, tag?: string, message?: string | LogData, data?: LogData) => IbtJsLogger.#log(6, containerName, tag, message, data);
  /**
   *
   */
  static debug = async (containerName: string, tag?: string, message?: string | LogData, data?: LogData) => IbtJsLogger.#log(5, containerName, tag, message, data);
  /**
   *=
   * @returns
   */
  static info = async (containerName: string, tag?: string, message?: string | LogData, data?: LogData) => IbtJsLogger.#log(4, containerName, tag, message, data);
  /**
   *
   */
  static warn = async (containerName: string, tag?: string, message?: string | LogData, data?: LogData) => IbtJsLogger.#log(3, containerName, tag, message, data);
  /**
   *
   */
  static error = async (containerName: string, tag?: string, message?: string | LogData, data?: LogData) => IbtJsLogger.#log(2, containerName, tag, message, data);
  /**
   *
   */
  static fatal = async (containerName: string, tag?: string, message?: string | LogData, data?: LogData) => IbtJsLogger.#log(1, containerName, tag, message, data);
  /**
   *
   */
  static #log = async (
    level: LogLevelNumber = IbtJsLogger.#defaultLogLevel,
    containerName: string = '',
    tag: string | null = null,
    messageOrData: string | LogData | null = null,
    data: LogData = {}
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
        if (IbtJsLogger.#prefixString) {
          logString += `${IbtJsLogger.#prefixString}`;
        }
        if (IbtJsLogger.#showTimestamp) {
          logString += ' ';
          logString += `${Date.now()}`;
        }
        logString += ' ';
        logString += `${IbtJsLogger.#logLevels[level]}`.trim();
        logString += ' ';
        // logString += `${IbtJsLogger.#separatorString} `;
        logString += `${trimmedPrimaryName}`.trim();
        if (tag) {
          logString += ' ';
          logString += `${IbtJsLogger.#separatorString}`;
          logString += ' ';
          logString += `${tag}`.trim();
        }
        if (messageOrData !== null) {
          if (isString(messageOrData)) {
            logString += ' ';
            logString += `${IbtJsLogger.#separatorString}`;
            logString += ' ';
            logString += `${messageOrData}`.trim();
            if (data.constructor !== Object || Object.entries(data).length === 0) {
              logFunction(logString, IbtJsLogger.#appendString);
            } else {
              logString += ' ';
              logString += `${IbtJsLogger.#separatorString}`;
              logFunction(logString, data, IbtJsLogger.#appendString);
            }
          } else if (
            typeof messageOrData === 'object' &&
            Object.entries(messageOrData).length > 0
          ) {
            logString += ' ';
            logString += `${IbtJsLogger.#separatorString}`;
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
