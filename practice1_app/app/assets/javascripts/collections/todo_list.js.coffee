class App.Collections.TodoList extends Backbone.Collection
  model: App.Models.Todo
  doneTodos: ->
    @where(done: true)
  remainingTodos: ->
    @where(done: false)