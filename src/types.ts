/*
 * import
 */
/*
 * main
 */
type LogLevelNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type LogLevels = {
  [containerName: string]: LogLevelNumber;
}
type LogData = {
  [field: string]: any
}
/*
 * export
 */
export type {LogLevelNumber, LogLevels, LogData};