define ['jquery'], ($) ->
    utils =
        onNavigateHandlers: []
        serialize: (element, trim) ->
            if !trim?
                trim = false

            o = {}
            if $(element).is 'form'
                form = element
            else
                form = $('<form></form>').append $(element).clone()

            a = form.serializeArray()
            $.each a, ->
                if o[@name] != undefined
                    if !o[@name].push
                        o[@name] = [o[@name]]
                    value = @value || ''
                    if trim
                        value = $.trim value
                    o[@name].push value
                else
                    value = @value || ''
                    if trim
                        value = $.trim value
                    o[@name] = value

            return o
        title: (title) ->
            document.title title
        onNavigate: (handler) ->
            if $.inArray(handler, @onNavigateHandlers) >= 0
                return false

            @onNavigateHandlers.push handler
        navigate: (route) ->
            handler() for handler in @onNavigateHandlers
            Backbone.history.navigate route, {trigger: true}
        auth: ->
            #this is just a simple check, and cannot be trusted
            #full server coverage for api exposure must be enforced
            u = $.cookie 'U'
            if u?
                return true
            return false
        logout: (cb) ->
            $.post('/api/account/logout')
                .done ->
                    cb null
                .fail (res) ->
                    cb res.responseText

        login: (user, cb) ->
            $.post('/api/account/login', user)
                .done ->
                    cb null
                .fail (res) ->
                    cb res.responseText
