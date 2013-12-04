class App.Views.TodoView extends Backbone.View
  tagName: 'li'
  
  events:
    'click .toggle': (e) -> @model.set('done', @$done.checked)
    'click a.destroy': ->
      @model.destroy() if confirm('「' + @$input.val() + '」' + '\nを本当に削除しますか？')
    'dblclick .view': 'showOverlay'
  
  initialize: (title) ->
    @mapView = new App.Views.MapView
    
    @model.on('change', @render, @)
    @model.on('destroy', @remove, @)
    @render()
  
  render: ->
    todoHtml = templates['item'](
      title: @model.get('title')
      done: @model.get('done')
      latLng: @model.get('latLng')
    )
    
    @$el.html(todoHtml)
    @$el.toggleClass('done', @model.get('done'))
    @$done = @$('.toggle')[0]
    @$input = @$('.edit')
  
  close: ->
    @model.set('title', @$input.val(), silent: true)
    @model.set('latLng', @$input.attr('data-lat-lng'), silent: true)
    
    @model.change()
  
  showOverlay: ->
    $input = @$el.children('.edit')
    $content = $('<div class="edit-wrap"></div>')
    $mapWrap = $('<div id="map-wrap"></div>')
    
    $content.append($input, $mapWrap)
    
    # overlay
    $.boxer($content,
      callback: =>
        @$input
          .keypress((e) ->
            # enter key
            $.fn.boxer('destroy') if e.keyCode is 13
          )
          .focus()
        @mapView.addMap($input, $mapWrap)
      close: =>
        @close()
        @render()
    )
