function addItem(item){
  $(".item-list ul").append("<li data-index="+itemCount+">"+item+"<input type='checkbox'/></li>");
  itemCount += 1;
  if ( $('.item-list ul li').length == 1 ){
    $('.item-list').addClass('item-margin');
  }
}

function clearTodo(){
  $("#clear-button").click(function(event){
    $.ajax({
      type: "DELETE",
      url: "/items"
    })
    .done(function( data ) {
      $(".item-list ul").empty();
        itemCount = 0;
    });
    $('.item-list').removeClass('item-margin');
  }); 
}

function checkItem(){
  $(".item-list").on('change',"li input[type='checkbox']",function() {
    var item = $(this).closest('li');
    var checked = $(this).is(":checked");
    if(checked) {
      item.addClass('strike-through');
    }else{
      checked = null;
      item.removeClass('strike-through');
    }

    $.ajax({
      type: "PUT",
      url: "/item/"+item.data('index'),
      data: { id: item.data('index'),checked: checked}
    })
    .done(function( data ) {
      console.log('item updated');
    });
  });
}

function populateList(){
  if ( $('.item-list ul li').length > 0 ){
      $('.item-list').addClass('item-margin');
    }
    $.get("/items", function(data){
      $.each(data, function( index, value ) {
        var checked = null;
        var strikeClass = null;
        if(value[1]){
          checked = 'checked=true';
          strikeClass = 'class=strike-through';
        }
        $(".item-list ul").append("<li data-index="+index+" "+strikeClass+">"+value[0]+"<input type='checkbox' "+checked+"/></li>");
      });
    });
}


$( document ).ready(function() {
    var itemCount = 0;
    populateList();
    console.log( "Your To Do List is Ready!" );
    
    clearTodo();
    checkItem();

    var $input = $('input[name=item]');

  $( "#add-form" ).submit(function( event ) {
    event.preventDefault();

    var item = $input.val();
    if(item){
      $.post( "/item", {'item': item, 'checked': false}, function(data) {
        addItem(item);
        $input.val('');
        console.log(data);
      })
      .fail(function() {
        alert( "error" );
      });
    }
    
  });
  
});
