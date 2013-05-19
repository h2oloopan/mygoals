// Generated by CoffeeScript 1.6.2
define(['text!templates/shared/header.html', 'models/user'], function(template, User) {
  var HeaderView;

  return HeaderView = Backbone.View.extend({
    el: $('#header'),
    events: {
      'click .btn-logout': 'logout'
    },
    initialize: function() {
      return this.model = {};
    },
    render: function() {
      var view;

      view = this;
      return $.get('/api/account/auth').done(function() {
        return view.model.auth = true;
      }).fail(function() {
        return view.model.auth = false;
      }).always(function() {
        return view.update();
      });
    },
    update: function() {
      return this.$el.html(_.template(template, this.model));
    },
    logout: function(e) {
      var view;

      view = this;
      return $.post('/api/account/logout').always(function() {
        return window.location.reload();
      });
    }
  });
});
