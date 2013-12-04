class App.Views.AppView extends Backbone.View
  statsTemplate: templates['stats']
  
  events:
    'keypress #new-todo': (e) ->
      return if (e.keyCode isnt 13)
      return if (@$input.val() is '')
      
      @collection.add(title: @$input.val())
      @$input.val('')
    
    'click #clear-completed': ->
      if confirm(@collection.doneTodos().length + '件のアイテムを削除しますか？')
        _.each(@collection.doneTodos(), (todo) ->
          todo.destroy()
        )
    
    'click #toggle-all': ->
      allDone = @allDoneCheckbox.checked
      @collection.each((todo) ->
        todo.set('done', allDone)
      )
  
  initialize: ->
    @allDoneCheckbox = @$('#toggle-all')[0]
    @$input = @$('#new-todo')
    @$main = @$('#main')
    @$footer = @$('footer')
    @collection.on('add', @addOne, @)
    @collection.on('all', @render, @)
  
  addOne: (todo) ->
    todoView = new App.Views.TodoView(model: todo)
    @$('#todo-list').append(todoView.el)
  
  render: (todo) ->
    done = @collection.doneTodos().length
    remaining = @collection.remainingTodos().length

    if (@collection.length)
      @$main.show()
      @$footer.show()
      @$footer.html(@statsTemplate({done: done, remaining: remaining}))
    else
      @$main.hide()
      @$footer.hide()

    @allDoneCheckbox.checked = !remaining


