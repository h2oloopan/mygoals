define ['me',
'ehbs!templates/header', 'ehbs!templates/footer',
'ehbs!templates/index', 'ehbs!templates/login', 'ehbs!templates/signup'
], (me) ->
	app =
		start: ->
			App = Ember.Application.create()
			me.attach App, ['User']
			
			App.Router.map ->
				@route 'login'
				@route 'signup'

			
			App.ApplicationRoute = Ember.Route.extend
				actions:
					logout: ->
						thiz = @
						me.auth.logout().then ->
							#done
							thiz.controllerFor('application').set 'model', {}
						, (errors) ->
							#fail
							return false
						return false
			
			App.ApplicationController = Ember.Controller.extend
				needs: 'index'
				modelBinding: 'controllers.index.model'

			App.IndexRoute = Ember.Route.extend
				model: ->
					return me.auth.check()

			App.IndexController = Ember.Controller.extend {}

			###
			App.IndexController = Ember.ObjectController.extend
				needs: 'application'
				modelBinding: 'controllers.application.model'
			###


			#login
			App.LoginRoute = Ember.Route.extend
				model: ->
					return @store.createRecord 'user', {}
				actions:
					login: ->
						thiz = @
						model = @controllerFor('login').get 'model'
						result = model.validate ['username', 'password']
						if !result then return false
						me.auth.login(model).then (user) ->
							#done
							thiz.transitionTo 'index'
						, (errors) ->
							#fail
							alert errors
						
						return false

			#signup
			App.SignupRoute = Ember.Route.extend
				model: ->
					return @store.createRecord 'user', {}

			App.SignupController = Ember.ObjectController.extend
				actions:
					signup: ->
						thiz = @
						result = @get('model').validate()
						if !result then return false

						#password confirmation should be checked here
						if @get('confirm') != @get('password')
							@set 'model.errors.confirm', 'Passwords do not match'
							return false

						me.auth.signup(@get('model')).then ->
							#done
							thiz.transitionToRoute 'login'
						, (errors) ->
							#fail
							alert errors
						return false
						


	return app					
