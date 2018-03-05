'use strict';

const XProcess = require('../index');

/**
 * @name Parent
 * @description Parent process
 */
class Parent {
  /**
   * @name constructor
   * @description constructor
   * @return {undefined}
   */
  constructor() {
    this.child = XProcess.createClient();
  }

  /**
   * @name start
   * @description spawn child
   * @return {undefined}
   */
  start() {
    this.child.run('node', './child.js');
    this.child.send({
      text: 'Hey child, wake up it\'s time for school!'
    });
    this.child.on('message', (msg) => {
      console.log(`Child: ${msg.text}`);
    });
    this.child.on('disconnect', () => console.log('Child disconnected'));
    this.child.on('exit', () => console.log('Child exit'));
    this.child.on('close', () => {
      console.log('Parent: Okay, child is in class - I\'m off to work where I\'ll deal with bigger kids.');
    });

    setTimeout(() => {
    }, 10000);
  }
}

let parent = new Parent();
parent.start();
