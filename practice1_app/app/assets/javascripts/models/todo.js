App.Models.Todo = Backbone.Model.extend({
  defaults: {
    title: 'empty todo',
    done: false,
    latLng: ''
  }
});