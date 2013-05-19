// Generated by CoffeeScript 1.6.2
var auth, should;

auth = require('../../helpers/auth');

should = require('should');

describe('auth', function() {
  return describe('encrypt', function() {
    return it('should return the sha256 hashed string in lower case hex format', function() {
      var input, output;

      input = 'x358c*S&VWS(@';
      output = auth.encrypt(input);
      return output.should.equal('737f07d4c1517439f380b159b39224cd84f669ca799809fc499de0f76a976568');
    });
  });
});
