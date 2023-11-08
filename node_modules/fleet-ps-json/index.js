/**
 * Get PIDs of all running fleet processes
 */
var _ = require('underscore')
module.exports = function (text) {
  var pattern = /^(drone#[\s\S]*?)^(?:drone|$)/mg;
  var drones = text.match(pattern)
  var drone = drones[0]
  var result = drones.map(function (droneText) {
    var droneName = droneText.match(/^drone#(.*?)\n/)[1]
    var pidElements = splitByPID(droneText).map(function (element) {
      element.drone = droneName
      return element
    })
    return pidElements
  })
  var output = _.flatten(result);
  return output
}

function splitByPID(text) {
  var pattern = /pid#/;
  var dronePattern = /^drone/
    var lines = text.split(pattern).filter(function (line) {
      return !dronePattern.test(line)
    })
  var results = lines.map(function (line) {
    var pid = line.match(/^(.*?)\n/)[1]
    var commitMatch = line.match(/commit:\s+(.*?)\n/);
    var commit = commitMatch[1]
    var command = line.match(/command:\s+(.*?)\n/)[1];
    var output = {
      pid: pid,
      commit: commit,
      command: command
    }
    return output
  })
  return results
}
