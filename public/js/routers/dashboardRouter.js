// Generated by CoffeeScript 1.6.2
define(['views/shared/header'], function(HeaderView) {
  var DashboardRouter;

  return DashboardRouter = Backbone.Router.extend({
    _view: null,
    _header: null,
    routes: {
      '': 'index'
    },
    change: function(view, options) {
      var context;

      if (this._header == null) {
        this._header = new HeaderView();
        this._header.render();
      }
      options = options | {};
      context = this;
      return require([view], function(View) {
        context._view = new View(options);
        return context._view.render();
      });
    },
    index: function() {
      return this.change('views/dashboard/index');
    }
  });
});
