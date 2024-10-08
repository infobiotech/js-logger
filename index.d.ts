declare type LogLevelNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
declare type LogData = {
    [field: string]: any;
};
export default class IbtJsLogger {
    #private;
    static FATAL: LogLevelNumber;
    static ERROR: LogLevelNumber;
    static WARN: LogLevelNumber;
    static INFO: LogLevelNumber;
    static DEBUG: LogLevelNumber;
    static TRACE: LogLevelNumber;
    static VERBOSE: LogLevelNumber;
    static LogLevel: string;
    static PrependString: string;
    static PrefixString: string;
    static ShowTimestamp: string;
    static SeparatorString: string;
    static AppendString: string;
    /**
     *
     */
    static init: ({ logLevel, prependString, prefixString, showTimestamp, separatorString, appendString, }: {
        logLevel?: LogLevelNumber | undefined;
        prependString?: string | undefined;
        prefixString?: string | undefined;
        showTimestamp?: boolean | undefined;
        separatorString?: string | undefined;
        appendString?: string | undefined;
    }) => void;
    /**
     *
     */
    static setLogLevel: (logLevel?: LogLevelNumber, logContainerName?: string | null) => void;
    /**
     *
     */
    static trace: (containerName: string, tag?: string | undefined, message?: string | LogData | undefined, data?: LogData | undefined) => boolean;
    /**
     *
     */
    static debug: (containerName: string, tag?: string | undefined, message?: string | LogData | undefined, data?: LogData | undefined) => boolean;
    /**
     *
     */
    static info: (containerName: string, tag?: string | undefined, message?: string | LogData | undefined, data?: LogData | undefined) => boolean;
    /**
     *
     */
    static warn: (containerName: string, tag?: string | undefined, message?: string | LogData | undefined, data?: LogData | undefined) => boolean;
    /**
     *
     */
    static error: (containerName: string, tag?: string | undefined, message?: string | LogData | undefined, data?: LogData | undefined) => boolean;
    /**
     *
     */
    static fatal: (containerName: string, tag?: string | undefined, message?: string | LogData | undefined, data?: LogData | undefined) => boolean;
}
export {};
