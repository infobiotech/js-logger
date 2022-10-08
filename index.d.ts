declare type LogLevelNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
declare type LogLevels = {
    [containerName: string]: LogLevelNumber;
};
declare type LogData = {
    [field: string]: any;
};
export type { LogLevelNumber, LogLevels, LogData };
export default class IbtJsLogger {
    #private;
    static FATAL: number;
    static ERROR: number;
    static WARN: number;
    static INFO: number;
    static DEBUG: number;
    static TRACE: number;
    static VERBOSE: number;
    static LogLevel: string;
    static PrependString: string;
    static ShowTimestamp: string;
    static SeparatorString: string;
    static AppendString: string;
    /**
     *
     */
    static init: ({ logLevel, prependString, showTimestamp, separatorString, appendString, }: {
        logLevel?: LogLevelNumber | undefined;
        prependString?: string | undefined;
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
    static trace: (containerName: string, tag: string, message: string | LogData, data: LogData) => Promise<boolean>;
    /**
     *
     */
    static debug: (containerName: string, tag: string, message: string | LogData, data: LogData) => Promise<boolean>;
    /**
     *=
     * @returns
     */
    static info: (containerName: string, tag: string, message: string | LogData, data: LogData) => Promise<boolean>;
    /**
     *
     */
    static warn: (containerName: string, tag: string, message: string | LogData, data: LogData) => Promise<boolean>;
    /**
     *
     */
    static error: (containerName: string, tag: string, message: string | LogData, data: LogData) => Promise<boolean>;
    /**
     *
     */
    static fatal: (containerName: string, tag: string, message: string | LogData, data: LogData) => Promise<boolean>;
}
