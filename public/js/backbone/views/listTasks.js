var ListTasksView = Backbone.View.extend({
  
  initialize: function () {
    console.log('init taskListView');
    this.collection.on('add', this.renderOneItem, this);
    this.collection.on('remove', this.changeBorder, this);
    this.render();
  },

  changeBorder: function(){
    if(this.collection.length >= 1){
      this.$el.addClass('item-margin');
    }else{
      this.$el.removeClass('item-margin');
    }
  },

  render: function () {
    var self = this;
    this.collection.forEach(function (model) {
      self.renderOneItem(model);
    });
  },
  
  renderOneItem: function (model) {
    this.changeBorder();
    var view = new EditTaskView({
      collection: this.collection,
      model: model
    });
    view.render();
    this.$el.append(view.el);
  }
});