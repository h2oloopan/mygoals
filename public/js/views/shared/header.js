// Generated by CoffeeScript 1.6.2
define(['utils', 'text!templates/shared/header.html'], function(utils, template) {
  var HeaderView;

  return HeaderView = Backbone.View.extend({
    el: $('#header'),
    events: {
      'click .btn-logout': 'logout'
    },
    render: function() {
      var element;

      element = this.$el;
      return utils.auth(function(result) {
        var model;

        model = {
          auth: result
        };
        return element.html(_.template(template, model));
      });
    },
    logout: function(e) {
      return utils.logout();
    }
  });
});
