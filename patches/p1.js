// Generated by CoffeeScript 1.6.2
var Goal, User, mysql;

User = require('../models/user');

Goal = require('../models/goal');

mysql = require('../infrastructure/db').mysql;

exports.apply = function(cb) {
  return Goal.sync({
    force: true
  }).success(function() {
    return User.sync({
      force: true
    }).success(function() {
      var query;

      query = 'ALTER TABLE goals ADD CONSTRAINT fk_goals_users FOREIGN KEY (user_id) REFERENCES users (id);';
      return mysql.query(query).success(function() {
        return cb(null);
      }).error(function(err) {
        return cb(err);
      });
    }).error(function(err) {
      return cb(err);
    });
  }).error(function(err) {
    return cb(err);
  });
};
