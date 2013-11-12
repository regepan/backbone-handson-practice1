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
      var $input = this.$el.children('.edit');
      var $content = $('<div class="edit-wrap"></div>');
      var $mapWrap = $('<div id="map-wrap"></div>');

      $content.append($input, $mapWrap);

      // overlay
      $.boxer($content, {
        callback : function(){
          _this.$input.focus();
          _this.mapView.addMap($input, $mapWrap);
        },
        close : function(){
          _this.close();
          _this.render();
        }
      });
    }
  },
  initialize : function(title) {
    this.mapView = new App.Views.MapView();
    
    this.model.on('destroy', this.remove, this);
    this.render();
  },
  render : function() {
    var todoHtml = templates['item']({
      title : this.model.get('title'),
      done : this.model.get('done'),
      latLng : this.model.get('latLng')
    });

    this.$el.html(todoHtml);
    this.$el.toggleClass('done', this.model.get('done'));
    this.$done = this.$('.toggle')[0];
    this.$input = this.$('.edit');
  },
  close : function() {
    var value = this.$input.val();
    this.model.set('title', value);
    
    this.model.set('latLng', this.$input.attr('data-lat-lng'));
  }
});
