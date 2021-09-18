/*
 *
 */
const IbtJsLogger = require('../build/index');
/*
 *
 */
describe('Basic tests', () => {
 // let person;
 beforeEach(() => {
   // person = new Person('John', 30);
 });
 it('Initialization', () => {
   console.log('Initialization');
  IbtJsLogger.init({
    [IbtJsLogger.LogLevel]: IbtJsLogger.INFO,
  });
   // expect(person).toBeDefined();
   // expect(person.isAdult()).toBe(true);
 });
});
/*
 *
 */
