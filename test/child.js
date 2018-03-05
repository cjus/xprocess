'use strict';

const process = require('process'); // not really required... but good form.

/**
 * @name Child
 * @description Child process
 */
class Child {
  /**
   * @name constructor
   * @description constructor
   * @return {undefined}
   */
  constructor() {
    this.questions = [
      'Hey mom, five more minutes?',
      'Okay, okay, I\'m getting getting up right now!',
      'What\'s for breakfast?',
      'Mom, where are my jeans?',
      'Can I get 10 bucks for lunch?',
      'I\'m late for school can you drive me?',
      'Thanks mom see you at 3pm.'
    ];
    this.questionIndex = 0;
    process.on('message', (msg) => {
      console.log('Parent:', msg.text);
    });
  }

  /**
   * @name start
   * @description start child activities
   * @return {undefined}
   */
  start() {
    let timerID = setInterval(() => {
      if (this.questionIndex === this.questions.length) {
        clearInterval(timerID);
        process.exit(0);
      } else {
        process.send({
          text: this.questions[this.questionIndex++]
        });
      }
    }, 1000);
  }
}

let child = new Child();
child.start();

