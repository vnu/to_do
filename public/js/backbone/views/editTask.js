var EditTaskView = Backbone.View.extend({
  tagName: 'li',

  events: {
    'click .mark-checked': 'checkedTask',
    'click .delete-task': 'deleteTask'
  },
  
  checkedTask: function (e) {
    this.model.set('checked', $(e.currentTarget).is(":checked"));
  },

  deleteTask: function (e) {
    this.collection.remove(this.model);
  },
  
  initialize: function () {
    this.model.on('change:checked', this.changeUIWhenMarked, this);
    this.model.on('remove', this.removeUI, this);
  },

  removeUI: function () {
    this.remove();
  },
  
  changeUIWhenMarked: function () {
    if ( this.model.get('checked') ) {
      this.$el.addClass('strike-through');
    } else {
      this.$el.removeClass('strike-through');
    }
  },

  template: function (model) {
    checked = model.checked ? 'checked=true' : '';
    return "<input class='mark-checked' type='checkbox'"+ checked +" /> " + model.name + " <button class='delete-task'>delete</button>";
  },
  
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
  }
});