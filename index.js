use strict';

const EventEmitter = require('events');
const spawn = require('child_process').spawn;

/**
* @name XProcess
* @description External Process wrapper
*/
class XProcess extends EventEmitter {
  constructor() {
    super();
    this.child = null;
  }

  /**
  * @name run
  * @description Executes the command and emits output statements and and 'end' event when the process has completed
  * @param {string} command - command to execute
  * @param {array} args  - and array of arguments sent to the command
  */
  run(command, args) {
    this.child = spawn(command, args);
    this.child.stdout.on('data', (buffer) => super.emit('data', buffer.toString()));
    this.child.stderr.on('error', (buffer) => super.emit('error', buffer.toString()));
    this.child.stdout.on('end', () => super.emit('end'));
    this.child.on('close', (code, signal) => super.emit('close', code, signal));
  }

  /**
  * @name close
  * @description Closes a process.
  */
  close() {
    if (this.child) {
      this.child.kill();
      this.child = null;
    }
  }
}

module.exports.createClient = function() {
  return new XProcess();
};
