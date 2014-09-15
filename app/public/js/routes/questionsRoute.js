// Generated by CoffeeScript 1.6.3
define(['jquery', 'me', 'ehbs!templates/questions/questions.index', 'ehbs!templates/questions/questions.new'], function($, me) {
  var QuestionsRoute;
  QuestionsRoute = {
    setup: function(App) {
      App.Router.map(function() {
        return this.resource('questions', function() {
          return this.route('new');
        });
      });
      return App.QuestionsRoute = Ember.Route.extend({
        beforeModel: function() {
          var thiz;
          thiz = this;
          return me.auth.check().then(function(user) {
            if (user == null) {
              return thiz.transitionTo('login');
            }
          }, function(errors) {
            return thiz.transitionTo('login');
          });
        }
      });
      /*
      			App.QuestionsNewView = Ember.View.extend
      				didInsertElement: ->
      					@_super()
      					tinyMCE.init
       					theme: 'advanced'
       					mode: 'textareas'
       					plugins: 'latex'
       					theme_advanced_buttons1: 'latex'
       					theme_advanced_buttons2: ''
       					theme_advanced_buttons3: ''
      */

    }
  };
  return QuestionsRoute;
});
