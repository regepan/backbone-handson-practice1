App.Collections.TodoList = Backbone.Collection.extend({
  model: App.Models.Todo,
  doneTodos: function() {
    return this.where({done: true})
  },
  remainingTodos: function() {
    return this.where({done: false});
  }
});
