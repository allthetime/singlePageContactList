// LOADS CONTACTS FROM API
  $.getJSON('/contacts/info',function(data){ 
    $.each(data, function(index,contact){
      addContactRow(contact);
    });
  });


function addContactRow(contact){
  var row = $('<tr class="table-row">').appendTo('#contact_table')
  $('<td class="first_name">').text(contact.first_name).appendTo(row)
  $('<td class="last_name">').text(contact.last_name).appendTo(row)
  $('<td class="email">').text(contact.email).appendTo(row)
  $('<td class="phone_number">').text(contact.phone_number).appendTo(row)
  $('<td class="github">').text(contact.github).appendTo(row)
  $('<td class="delete">').html("x").appendTo(row)
  $('tr').last()[0].id = "row" + contact.id
}

$('#add').on('click',function(e){
  $('.cover').fadeIn(500);
  $('#add-form').fadeIn(500);
});


$('table').on('click',function(e){
  if($(e.target).prop("tagName") == "TD"){
    contactColumn = $(e.target)
    if ( contactColumn[0].classList[0] == "delete" ){
      id = contactColumn.parent()[0].id.split('row')[1]
      contactColumn.parent().remove()
      $.post('/contacts/destroy/'+id)
      return false;
    }
    info = contactColumn.text()
    contactColumn.text("")
    input = $('<input class="edit-field" type="text">').val(info).appendTo(contactColumn)
    input.focus().select();

    contactColumn.on('focusout',function(){
      contactColumn.text(input.val())  
      contactColumn.children().remove();
    });

    contactColumn.on('keydown',function(e){
      if (e.keyCode == 13){
        id = contactColumn.parent()[0].id.split('row')[1]
        column = contactColumn[0].classList[0]
        console.log(column)
        $.post('/contacts/edit/'+id+'?column='+column+'&value='+contactColumn.children()[0].value)
        contactColumn.blur()
      }
    })
  }
});

clicked = false

$('#search').on('click',function(e){
  if (!clicked) {
    $('#search-field').animate({'width':'300px'},200).focus();
    clicked = true 
  } else {
    $('#search-field').animate({'width':'0px'},200)     
    clicked = false;
  }   
});


$('#search-field').on('keyup',function(e){
  if ($(this).val()==""){
    $('tr').slice(1).css({display: 'table-row'})
    return false;
  }
  $.ajax({
    url: '/contacts/find/'+$(this).val(),
    dataType: 'json',
    success: function( data ) {
      $('tr').slice(1).css({display: 'none'})
      $.each(data,function(index,id){
        $('#row'+id).css({display:'table-row'})
      })
    },
    error: function( data ) {
      return false;
    }
  });


});

$('#close-button').on('click',function(e){
  $('.cover').fadeOut(500);
  $('#add-form').fadeOut(500);
});

// INSTANT UPDATE EMAIL VALIDATION

$('#email_address').on('keydown',function(){
  if(!isValidEmailAddress($(this).val())) { 
    $('#email_address').addClass('error')
  }else{
    $('#email_address').removeClass('error')
  }
})

$('#add-form-data').on('submit',function(e){
  if(!isValidEmailAddress($('#email_address').val())) {
   alert('Please enter a valid email')
   return false;
  }
  if($('#first_name').val() == "") {
   alert('Please enter a first name')
   return false;
  }
  if($('#last_name').val() == "") {
   alert('Please enter a last name')
   return false;
  }    
  e.preventDefault;
  $.post('/contacts/?'+$(this).serialize(), function(contact){
    addContactRow(contact);
    $("html, body").animate({ scrollTop: $(document).height() },200);
  })
  $('.cover').fadeOut(500);
  $('#add-form').fadeOut(500);
  return false;
})


function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};


