$(function(){
  function buildHTML(message){
    if(message.image){
      image = `<img class="lower-message__image" src="${message.image}" alt="Img lights">`
    }
    else image = ""
    var html = `
    <div class="message">

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
})