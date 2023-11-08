# Fleet PS JSON
Transforms the output of fleet-ps into json.

# Installation
```
npm install -S fleet-ps-json
```


```
fleet-ps
drone#foo002
├─┬ pid#fa8666
│ ├── status:   running
│ ├── commit:   cabbage/gitHashHere
│ └── command:  node cabbage.js

drone#foo001
├─┬ pid#b0a13c
│ ├── status:   running
│ ├── commit:   bacon/gitHashHere
│ └── command:  node bacon.js
├─┬ pid#eb2c86
│ ├── status:   running
│ ├── commit:   carrot/gitHashHere
│ └── command:  node carrot.js
├─┬ pid#4401fc
│ ├── status:   running
│ ├── commit:   lettuce/gitHashHere
│ └── command:  node lettuce.js
├─┬ pid#fb1b7b
│ ├── status:   running
│ ├── commit:   apples/gitHashHere
│ └── command:  node apples.js
└─┬ pid#d1829a
  ├── status:   running
  ├── commit:   grapes/gitHashHere
  └── command:  node grapes.js

drone#foo003
```


## Output

```javascript
[
  {
    command: 'node cabbage.js',
    commit: 'cabbage/gitHashHere',
    pid: 'fa8666',
    drone: 'foo002'
  },
  {
    command: 'node bacon.js',
    commit: 'bacon/gitHashHere',
    pid: 'b0a13c',
    drone: 'foo001'
  },
  {
    command: 'node carrot.js',
    commit: 'carrot/gitHashHere',
    pid: 'eb2c86',
    drone: 'foo001'
  },
  {
    command: 'node lettuce.js',
    commit: 'lettuce/gitHashHere',
    pid: '4401fc',
    drone: 'foo001'
  },
  {
    command: 'node apples.js',
    commit: 'apples/gitHashHere',
    pid: 'fb1b7b',
    drone: 'foo001'
  },
  {
    command: 'node grapes.js',
    commit: 'grapes/gitHashHere',
    pid: 'd1829a',
    drone: 'foo001'
  }
]
```


To group by drone
```javascript
var psJSON = require('fleet-ps-json')
var text = 'foo' // fleet ps text here
var json = psJSON(text)
var byDrone = json.reduce(function (prev, element) {
  var drone = element.drone
  delete element.drone
  prev[drone] = element
  return prev
}, {})
```

Returns output that looks like

```javascript
{
  foo001: {
    pid: 'd1829a',
    command: 'node grapes.js',
    commit: 'grapes/gitHashHere'
  },
  foo002: {
    pid: 'fa8666',
    command: 'node cabbage.js',
    commit: 'cabbage/gitHashHere'
  }
}
```
