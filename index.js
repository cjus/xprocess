'use strict';

const EventEmitter = require('events');
const {spawn} = require('child_process');

/**
* @name XProcess
* @description External Process wrapper
*/
class XProcess extends EventEmitter {
  /**
   * @name constructor
   * @description constructor function
   * @return {undefined}
   */
  constructor() {
    super();
    this.child = null;
  }

  /**
  * @name run
  * @description Executes the command and emits output statements and and 'end' event when the process has completed
  * @note https://nodejs.org/api/child_process.html
  * @param {string} command - command to execute
  * @param {array|string} args  - an array or string of arguments sent to the process
  * @param {object} opts - Node spawn options
  * @return {undefined}
  */
  run(command, args, opts) {
    let newArgs = (args instanceof Array) ? args : args.split(' ');
    let newOptions = Object.assign({
      detach: true,
      stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    }, opts);
    this.child = spawn(command, newArgs, newOptions);
    if (newOptions.stdio && newOptions.length) {
      this.child.stdout.on('data', (buffer) => super.emit('data', buffer.toString()));
      this.child.stderr.on('error', (buffer) => super.emit('error', buffer.toString()));
      this.child.stdout.on('end', () => super.emit('end'));
    }
    this.child.on('message', (msg) => super.emit('message', msg));
    this.child.on('disconnect', () => super.emit('disconnect'));
    this.child.on('error', (err) => super.emit('error', err));
    this.child.on('exit', (code, signal) => super.emit('exit', code, signal));
    this.child.on('close', (code, signal) => super.emit('close', code, signal));

    // Node docs: [unref] cause the parent's event loop to not include the child in its
    // reference count, allowing the parent to exit independently of the child,
    // unless there is an established IPC channel between the child and parent
    this.child.unref();
  }

  /**
   * @name send
   * @description send a message to the external process
   * @param {object} msg - object containing message
   * @return {undefined}
   */
  send(msg) {
    this.child.send(msg);
  }

  /**
  * @name close
  * @description Closes a process.
  * @return {undefined}
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
