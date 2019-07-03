var search_name = $("#user-search-result")

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${user.name}</p>
  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  
  
  </div>`
$("#user-search-result").append(html);
}

function appendErrMsgToHTML(message) {
  var html = `<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${message}</p>

</div>`

$("#user-search-result").append(html);
}




$(function() {
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var users = $("input[name='group[user_ids][]']");
    var user_ids = [];
    $.each(users,function(i, user){
      user_ids.push($(user).attr("value"))
    });

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input, user_ids: user_ids },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('名前検索に失敗しました');
    })
  });
});

$(function() {
  $(document).on("click",".user-search-add",function(){
    var input = $(".chat-group-users").val();
    adduserid = $(this).data('user-id')
    addusername = $(this).data('user-name')
    appendAddUser(adduserid, addusername);
    $(this).parent().remove();
  })
});

function appendAddUser(adduserid, addusername) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
  <input name='group[user_ids][]' type='hidden' value='${adduserid}'>
  <p class='chat-group-user__name'>${addusername}</p>
  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
</div>`
$(".chat-group-users").append(html);

    }

$(document).on("click",".user-search-remove",function(){
  $(this).parent().remove();
});