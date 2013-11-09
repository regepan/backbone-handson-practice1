App.Views.AppView = Backbone.View.extend({
  statsTemplate: templates['stats'],
  events: {
    'keypress #new-todo': function(e) {
      if (e.keyCode !== 13)
        return;
      if (this.$input.val() === '')
        return;

      this.collection.add({title: this.$input.val()});
      this.$input.val('');
    },
    'click #clear-completed': function() {
      _.each(this.collection.doneTodos(), function(todo) {
        todo.destroy()
      });
    },
    'click #toggle-all': function() {
      var allDone = this.allDoneCheckbox.checked;
      this.collection.each(function(todo) {
        todo.set('done', allDone);
      });
    }
  },
  initialize: function() {
    this.allDoneCheckbox = this.$('#toggle-all')[0];
    this.$input = this.$('#new-todo');
    this.$main = this.$('#main');
    this.$footer = this.$('footer');
    this.collection.on('add', this.addOne, this);
    this.collection.on('all', this.render, this);
  },
  addOne: function(todo) {
    var todoView = new App.Views.TodoView({model: todo});
    this.$('#todo-list').append(todoView.el);
  },
  render: function(todo) {
    var done = this.collection.doneTodos().length;
    var remaining = this.collection.remainingTodos().length;

    if (this.collection.length) {
      this.$main.show();
      this.$footer.show();
      this.$footer.html(this.statsTemplate({done: done, remaining: remaining}));
    } else {
      this.$main.hide();
      this.$footer.hide();
    }

    this.allDoneCheckbox.checked = !remaining;
  }
});
