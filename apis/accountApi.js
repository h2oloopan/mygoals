// Generated by CoffeeScript 1.6.2
var membership, privileges;

membership = require('../infrastructure/membership');

privileges = require('../config').system.privileges;

exports.bind = function(app) {
  app.get('/api/account/auth', function(req, res) {
    if (req.user != null) {
      return res.send(200);
    } else {
      return res.send(401, 'No user logged in');
    }
  });
  app.get('/api/account/auth/:level', function(req, res) {
    var level;

    level = req.params.level;
    if (privileges[level] != null) {
      if (req.privilege >= privileges[level]) {
        return res.send(200);
      } else {
        return res.send(401, 'You do not have the permission to access this');
      }
    } else {
      return res.send(401, 'You do not have the permission to access this');
    }
  });
  app.post('/api/account/login', function(req, res) {
    return membership.authenticate(req.body.email, req.body.password, function(err, user) {
      if (err != null) {
        return res.send(500, err.message);
      } else if (user != null) {
        membership.login(user, res);
        return res.send(200);
      } else {
        return res.send(401, 'No match could be found');
      }
    });
  });
  app.post('/api/account/signup', function(req, res) {
    return membership.signup(req.body, function(err, user) {
      if (err != null) {
        return res.send(500, err.message);
      } else {
        return res.send(201, {
          id: user.id
        });
      }
    });
  });
  return app.post('/api/account/logout', function(req, res) {
    if (req.user != null) {
      membership.logout(res);
      return res.send(200);
    } else {
      return res.send(401, 'No user logged in');
    }
  });
};
