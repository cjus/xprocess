'use strict';

var loops = 1;
var timer = setInterval(() => {
  console.log(`${loops++}`);
  if (loops > 5) {
    clearInterval(timer);
    console.log('ended');
  }
}, 1000);
