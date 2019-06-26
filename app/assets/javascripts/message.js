$(function(){
  function buildHTML(message){
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
        <img class="lower-message__image" src="${message.image}" alt="Img lights">
      </div>

    </div> `
    console.log(html)
    return html;
  }

  $('.form__submit').click(function() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
  });

  $('#new_form').on('submit', function(e){
    console.log('test');
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    console.log(url);
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
      console.log('done');
      console.log(message);
      var html = buildHTML(message);
      $('.messages').append(html)
      $('#new_form')[0].reset();
    })
    .fail(function(){
      alert('error');
    })


    

  })
})