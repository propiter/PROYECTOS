var _ = require('underscore')
var inspect = require('eyespect').inspector();
var should = require('should');
var split = require('../index')
var fs = require('fs')
var path = require('path')
describe('Split the fleet-ps output into json', function () {
  var text = fs.readFileSync(path.join(__dirname, 'sample-fleet-ps.txt'), 'utf8')
  it('should split into json', function () {
    var result = split(text)
    result.length.should.eql(6, 'wrong number of pid elements found')
    result.filter(function (element) {
      should.exist(element.drone, 'drone field missing from element')
      should.exist(element.pid, 'pid field missing from element')
      should.exist(element.commit, 'commit field missing from element')
      should.exist(element.command, 'command field missing from element')
    })
  })

  it('should get results by drone', function () {
    var result = split(text)
    var output = byDrone(result)
  })
})


function byDrone(json) {
  var result = json.reduce(function (prev, element) {
    var drone = element.drone
    delete element.drone
    prev[drone] = element
    return prev
  }, {})
  return result
}
