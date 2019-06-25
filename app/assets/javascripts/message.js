$(function(){
  function buildHTML(message){
    // var html = `<div class='message'>
    //             </div>`
    // var html = `<div class='upper-message'>
    //             </div>`
    // var html = `<div class='upper-message__user-name'>
    //             </div>`
    // var html = `<div class='upper-message__date'>
    //             </div>`
    // var html = `<div class='lower-message'>
    //             </div>`
    // var html = `<p class='lower-message__content'>
    //           </p>`

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
<p class="lower-message__content">
${message.content}
</p>

</div>
<p class="lower-message__content">
              </p></div>
    `
    return html;
  }
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