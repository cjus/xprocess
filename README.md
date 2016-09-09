# XProcess

An external process wrapper which uses events to communicate with its invoker.

## Sample usage

```javascript
'use strict';

var XProcess = require('xprocess');
var xProcess = XProcess.createClient();
xProcess.on('data', function(buffer) { console.log('XXXX: ', buffer) });
xProcess.on('end', function() { console.log('done') });
xProcess.run('node', ['test.js']);
```

## Sample external process

```javascript
'use strict';

var loops = 1;
var timer = setInterval(() => {
  console.log(`${loops++}`);
  if (loops > 30) {
    clearInterval(timer);
    console.log('ended');
  }
}, 1000);
```

## Closing a process before it completes

```javascript
'use strict';

var XProcess = require('xprocess');
var xProcess = XProcess.createClient();
xProcess.on('data', function(buffer) { console.log('XXXX: ', buffer) });
xProcess.on('end', function() { console.log('done') });
xProcess.run('node', ['test.js']);
setTimeout(() => {
  xProcess.close();
}, 5000);
```
