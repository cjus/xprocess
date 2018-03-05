# XProcess

An external process wrapper which uses events to communicate with its invoker.

## Sample usage

```javascript
const XProcess = require('xprocess');
let xProcess = XProcess.createClient();
xProcess.run('node', './child.js');

xProcess.send({
  text: 'Hey child, wake up it\'s time for school!'
});
xProcess.on('message', (msg) => {
  console.log(`Child: ${msg.text}`);
});
xProcess.on('disconnect', () => console.log('Child disconnected'));
xProcess.on('exit', () => console.log('Child exit'));
xProcess.on('close', () => {
xProcess.on('close', () => {
  console.log('Parent: Okay, child is in class - I\'m off to work where I\'ll deal with bigger kids.');
});
```

## Sample test

Run parent.js in test folder:

```shell
$ node parent.js
Parent: Hey child, wake up it's time for school!
Child: Hey mom, five more minutes?
Child: Okay, okay, I'm getting getting up right now!
Child: What's for breakfast?
Child: Mom, where are my jeans?
Child: Can I get 10 bucks for lunch?
Child: I'm late for school can you drive me?
Child: Thanks mom see you at 3pm.
Child disconnected
Child exit
Parent: Okay, child is in class - I'm off to work where I'll deal with bigger kids.
```

