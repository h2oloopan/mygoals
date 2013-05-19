// Generated by CoffeeScript 1.6.2
require.config({
  baseUrl: '/js/libs',
  paths: {
    templates: '/templates',
    models: '/js/models',
    views: '/js/views',
    routers: '/js/routers',
    app: '/js/apps/accountApp'
  },
  shim: {
    'backbone': ['underscore', 'jquery'],
    'bootstrap': ['jquery'],
    'helpers': ['jquery'],
    'app': ['backbone', 'bootstrap', 'helpers']
  }
});

require(['app'], function(app) {
  return app.initialize();
});
