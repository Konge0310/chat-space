$(function(){
  function buildHTML(message){
    if(message.image){
      image = `<img class="lower-message__image" src="${message.image}" alt="Img lights">`
    }
    else image = ""
    var html = `
    <div class="message" data-message-id= "${message.id}">
      <div class="upper-message">
        <div class="upper-message__user-name">
        ${message.user_name}
        </div>
        <div class="upper-message__date">
        ${message.datetime}
        </div>
      </div>

      <div class="lower-message">
        <p class="lower-message__content">${message.content}</p>
        ${image}
      </div>

    </div> `
    return html;
  }

  $('#new_form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      $(".form__submit").prop('disabled', false);
      var html = buildHTML(message);
      $('.messages').append(html)
      $('#new_form')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
      
    })
    .fail(function(){
      $(".form__submit").prop('disabled', false);
      alert('error');
    })
  })
  

  
  var reloadMessages = function() {
    var last_message_id = $(".message:last").data("message-id");
    console.log(last_message_id);
    var group_id = $(".group-name").data("group-id");
    var auto_url = "/groups/" + group_id + "/api/messages"
    $.ajax({
      url: auto_url,
      type: 'get',
      dataType: 'json',
      data: {last_message_id: last_message_id}
    })
    .done(function (messages) { 
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message); 
        $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  }
  
  setInterval(reloadMessages, 5000);
})