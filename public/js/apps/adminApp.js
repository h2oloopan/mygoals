// Generated by CoffeeScript 1.6.2
define(['routers/adminRouter'], function(AdminRouter) {
  var initialize;

  initialize = function() {
    var router;

    router = new AdminRouter;
    return Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
