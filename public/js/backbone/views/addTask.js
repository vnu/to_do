var AddTaskView = Backbone.View.extend({
  events: {
    'submit': 'clickAddTask'
  },
  
  initialize: function () {
    console.log('init addTaskView');
  },
  
  clickAddTask: function (event) {
    event.preventDefault();
    var t = new TaskModel({
      name: $('#inputTask').val()
    });
    this.$('#inputTask').val('');
    this.collection.add(t);
  }
});