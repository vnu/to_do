/* VIEWS */
var AddTaskView = Backbone.View.extend({
  events: {
    'click #btn-add-task': 'clickAddTask'
  },
  
  initialize: function () {
    console.log('init addTaskView');
  },
  
  clickAddTask: function () {)
    var t = new TaskModel({
      name: $('#input-task').val()_
    })
    this.collection.add(t);
  }
});

var TaskListView = Backbone.View.extend({
  
  initialize: function () {
    console.log('init taskListView');
    this.collection.on('add', this.render, this);
  },
  
  render: function () {
    var template = "";
    this.collection.forEach(function (model) {
      var view = new IndividualTaskView({
        model: model
      });
      template += view.render()
    });
    this.$el.html(template);
  }
});

var IndividualTaskView = Backbone.View.extend({
  events: {
    'click .mark-checked': 'checkedTask',
    'click .delete-task': 'deleteTask'
  },
  
  checkedTask: function () {
    console.log(this.model);
    this.model.set('checked', true);
  },
  
  initialize: function () {
    this.model.on('change:checked', function () {
      console.log(1);
    });
  },
  
  template: function (model) {
    return "<input class='mark-checked' type='checkbox' /> " + model.name + " (<button class='delete-task'>delete</button>)";
  },
  
  render: function () {
    return this.template(this.model.toJSON());
  }
});

/* MODEL */
var TaskModel = Backbone.Model.extend({
  defaults: {
    name: 'new task',
    checked: false
  }
});

var TaskCollection = Backbone.Collection.extend({
  model: TaskModel
});

$(document).ready(function () {
  // APPLICTION STARTUP
  var tc = new TaskCollection();
  
  new AddTaskView({
    el: $('#add-task'),
    collection: tc
  });
  
  new TaskListView({
    collection: tc,
    el: $('#task-list')
  });
  
  tc.add([
    { name: 'task 1' },
    { name: 'task 2' }
  ]);
});