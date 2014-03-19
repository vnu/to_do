var tc;
$( document ).ready(function() {
  tc = new TasksCollection();

  tc.add([
    { name: 'task 1' },
    { name: 'task 2' }
  ]);
  
  
  new AddTaskView({
    el: $('#add-form'),
    collection: tc
  });
  
  new ListTasksView({
    collection: tc,
    el: $('.item-list ul')
  });

});