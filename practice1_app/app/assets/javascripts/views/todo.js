App.Views.TodoView = Backbone.View.extend({
  tagName : 'li',
  events : {
    'click .toggle' : function(e) { this.model.set('done', this.$done.checked); },
    'click a.destroy' : function() {
      if (confirm('「' + this.$input.val() + '」' + '\nを本当に削除しますか？'))
        this.model.destroy();
   },
    'dblclick .view' : function() {
      var _this = this;
      var $content = $('<div class="edit-wrap"></div>');
      $content.append(this.$el.children('.edit'));
      
      $.boxer($content, {
        callback : function(){
          _this.$input.focus();
        },
        close : function(){
          _this.close();
          _this.render();
        }
      });
    },
    'keypress .edit' : function(e) { if(e.keyCode === 13) this.close() },
    'blur .edit' : 'close'
  },
  initialize : function(title) {
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
    this.render();
  },
  render : function() {
    var todoHtml = templates['item']({
      title : this.model.get('title'),
      done : this.model.get('done')
    });

    this.$el.html(todoHtml);
    this.$el.toggleClass('done', this.model.get('done'));
    this.$done = this.$('.toggle')[0];
    this.$input = this.$('.edit');
  },
  close : function() {
    var value = this.$input.val();
    this.model.set('title', value);
  }
});

